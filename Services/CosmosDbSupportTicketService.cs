using Microsoft.Azure.Cosmos;
using SupportTicketApp.Models;

namespace SupportTicketApp.Services;

public interface ISupportTicketService
{
    Task<SupportTicket> CreateTicketAsync(SupportTicket ticket);
    Task<IEnumerable<SupportTicket>> GetAllTicketsAsync();
    Task<SupportTicket?> GetTicketByIdAsync(string id);
    Task<SupportTicket> UpdateTicketAsync(SupportTicket ticket);
    Task DeleteTicketAsync(string id);
}

public class CosmosDbSupportTicketService : ISupportTicketService
{
    private readonly CosmosClient _cosmosClient;
    private readonly Container _container;

    public CosmosDbSupportTicketService(IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("CosmosDB");
        var databaseId = configuration["CosmosDb:DatabaseId"] ?? "IBasSupportDB";
        var containerId = configuration["CosmosDb:ContainerId"] ?? "ibassupport";
        
        _cosmosClient = new CosmosClient(connectionString);
        _container = _cosmosClient.GetContainer(databaseId, containerId);
    }

    public async Task<SupportTicket> CreateTicketAsync(SupportTicket ticket)
    {
        ticket.Id = Guid.NewGuid().ToString();
        ticket.CreatedDate = DateTime.UtcNow;
        
        var response = await _container.CreateItemAsync(ticket, new PartitionKey(ticket.Category));
        return response.Resource;
    }

    public async Task<IEnumerable<SupportTicket>> GetAllTicketsAsync()
    {
        var query = _container.GetItemQueryIterator<SupportTicket>();
        var tickets = new List<SupportTicket>();

        while (query.HasMoreResults)
        {
            var response = await query.ReadNextAsync();
            tickets.AddRange(response.ToList());
        }

        return tickets.OrderByDescending(t => t.CreatedDate);
    }

    public async Task<SupportTicket?> GetTicketByIdAsync(string id)
    {
        try
        {
            // For reading by ID, we need to query since partition key is category
            var query = _container.GetItemQueryIterator<SupportTicket>(
                queryDefinition: new QueryDefinition("SELECT * FROM c WHERE c.id = @id")
                    .WithParameter("@id", id));
            
            if (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                return response.FirstOrDefault();
            }
            return null;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return null;
        }
    }

    public async Task<SupportTicket> UpdateTicketAsync(SupportTicket ticket)
    {
        ticket.UpdatedDate = DateTime.UtcNow;
        var response = await _container.UpsertItemAsync(ticket, new PartitionKey(ticket.Category));
        return response.Resource;
    }

    public async Task DeleteTicketAsync(string id)
    {
        // For deletion by ID, we need to query first to get the category
        var ticket = await GetTicketByIdAsync(id);
        if (ticket != null)
        {
            await _container.DeleteItemAsync<SupportTicket>(id, new PartitionKey(ticket.Category));
        }
    }
}
