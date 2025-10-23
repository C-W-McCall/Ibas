using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace SupportTicketApp.Models;

public class SupportTicket
{
    [JsonProperty("id")]
    [Required(ErrorMessage = "ID er påkrævet")]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [JsonProperty("customerName")]
    [Required(ErrorMessage = "Kunde navn er påkrævet")]
    [StringLength(100, ErrorMessage = "Kunde navn må ikke være længere end 100 karakterer")]
    public string CustomerName { get; set; } = string.Empty;

    [JsonProperty("email")]
    [Required(ErrorMessage = "Email er påkrævet")]
    [EmailAddress(ErrorMessage = "Ugyldig email adresse")]
    [StringLength(255, ErrorMessage = "Email må ikke være længere end 255 karakterer")]
    public string Email { get; set; } = string.Empty;

    [JsonProperty("subject")]
    [Required(ErrorMessage = "Emne er påkrævet")]
    [StringLength(200, ErrorMessage = "Emne må ikke være længere end 200 karakterer")]
    public string Subject { get; set; } = string.Empty;

    [JsonProperty("description")]
    [Required(ErrorMessage = "Beskrivelse er påkrævet")]
    [StringLength(2000, ErrorMessage = "Beskrivelse må ikke være længere end 2000 karakterer")]
    public string Description { get; set; } = string.Empty;

    [JsonProperty("category")]
    [Required(ErrorMessage = "Kategori er påkrævet")]
    public string Category { get; set; } = "support";

    [JsonProperty("priority")]
    public string Priority { get; set; } = "medium";

    [JsonProperty("status")]
    public string Status { get; set; } = "open";

    [JsonProperty("createdDate")]
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    [JsonProperty("updatedDate")]
    public DateTime? UpdatedDate { get; set; }

    [JsonProperty("assignedTo")]
    public string? AssignedTo { get; set; }

    [JsonProperty("resolution")]
    public string? Resolution { get; set; }

    // Cosmos DB system properties
    [JsonProperty("_rid")]
    public string? _rid { get; set; }

    [JsonProperty("_self")]
    public string? _self { get; set; }

    [JsonProperty("_etag")]
    public string? _etag { get; set; }

    [JsonProperty("_attachments")]
    public string? _attachments { get; set; }

    [JsonProperty("_ts")]
    public long? _ts { get; set; }
}

public enum Priority
{
    Low,
    Medium,
    High,
    Critical
}

public enum Category
{
    General,
    Technical,
    Billing,
    Account,
    Feature
}

public enum TicketStatus
{
    Open,
    InProgress,
    Resolved,
    Closed
}
