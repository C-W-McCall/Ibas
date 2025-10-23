# Support Ticket System

Et moderne support ticket system bygget med .NET 9 Blazor WebApp og Azure Cosmos DB, designet med Jira-stil interface.

## 🚀 Features

- **Jira-stil Design** - Professionelt interface inspireret af Jira
- **Kanban Board** - Organiser tickets i kolonner (Åbne, I Gang, Løst, Lukket)
- **Azure Cosmos DB** - Cloud-baseret database integration
- **Responsive Design** - Fungerer på alle enheder
- **Moderne UI/UX** - Clean og intuitivt interface
- **Real-time Updates** - Live statistikker og dashboard

## 🛠️ Teknologi Stack

- **.NET 9** - Blazor WebApp
- **Azure Cosmos DB** - NoSQL database
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Ikoner
- **JavaScript** - Interaktive features

## 📋 Krav

- .NET 9 SDK
- Azure Cosmos DB konto
- Moderne webbrowser

## 🚀 Installation

1. **Klon repository**
   ```bash
   git clone <repository-url>
   cd SupportTicketApp
   ```

2. **Konfigurer Azure Cosmos DB**
   - Opret en Azure Cosmos DB konto
   - Opret en database med navn: `IBasSupportDB`
   - Opret en container med navn: `ibassupport`
   - Sæt partition key til: `/category`

3. **Konfigurer connection string**
   - Kopier `appsettings.Example.json` til `appsettings.json`
   - Opdater `ConnectionStrings:CosmosDB` med din connection string
   - **VIGTIGT**: `appsettings.json` er ekskluderet fra Git for sikkerhed

4. **Kør applikationen**
   ```bash
   dotnet restore
   dotnet run
   ```

5. **Åbn i browser**
   - Gå til `http://localhost:5000`

## 📁 Projekt Struktur

```
SupportTicketApp/
├── Components/
│   ├── Layout/
│   │   └── NavMenu.razor          # Navigation
│   └── Pages/
│       ├── Home.razor             # Dashboard
│       ├── CreateSupport.razor    # Opret ticket
│       └── SupportList.razor      # Kanban board
├── Models/
│   └── SupportTicket.cs           # Data model
├── Services/
│   └── CosmosDbSupportTicketService.cs  # Database service
├── wwwroot/
│   ├── css/
│   │   └── app.css               # Jira-stil CSS
│   └── js/
│       └── modern.js             # JavaScript features
└── Program.cs                    # App konfiguration
```

## 🎨 Design Features

### Jira-stil Interface
- **Farvepalette**: Autentiske Jira farver (#0052cc, #f4f5f7)
- **Typography**: System fonts og korrekte font weights
- **Spacing**: Konsistent spacing og padding
- **Border Radius**: 3px standard radius

### Kanban Board
- **Kolonner**: Åbne, I Gang, Løst, Lukket
- **Cards**: Hover effekter og interaktioner
- **Status Tracking**: Visuel status tracking
- **Priority Badges**: Farvekodede prioritets badges

### Dashboard
- **Stats Cards**: Live statistikker
- **Recent Tickets**: Seneste henvendelser
- **Quick Actions**: Hurtige handlinger

## 🔧 Konfiguration

### Azure Cosmos DB Setup
1. Opret en Cosmos DB konto i Azure Portal
2. Opret en database med navn: `IBasSupportDB`
3. Opret en container med navn: `ibassupport`
4. Sæt partition key til: `/category`
5. Kopier connection string til `appsettings.json`

### Environment Variables
Du kan også bruge environment variables:
```bash
export CosmosDB__ConnectionString="your-connection-string"
```

### Sikkerhed
- **Connection strings** er ekskluderet fra Git via `.gitignore`
- Brug `appsettings.Example.json` som template
- Kopier til `appsettings.json` og tilføj dine credentials
- **Aldrig** commit `appsettings.json` med rigtige credentials

## 📱 Responsive Design

Applikationen er fuldt responsiv og fungerer på:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (under 768px)

## 🚀 Deployment

### Azure App Service
1. Opret en Azure App Service
2. Konfigurer connection string i App Settings
3. Deploy via Visual Studio eller Azure CLI

### Docker
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0
COPY . /app
WORKDIR /app
EXPOSE 80
ENTRYPOINT ["dotnet", "SupportTicketApp.dll"]
```

## 🤝 Bidrag

1. Fork projektet
2. Opret en feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit dine ændringer (`git commit -m 'Add some AmazingFeature'`)
4. Push til branch (`git push origin feature/AmazingFeature`)
5. Åbn en Pull Request

## 📄 Licens

Dette projekt er under MIT licens. Se `LICENSE` filen for detaljer.

## 👨‍💻 Forfatter

Elias - [GitHub](https://github.com/yourusername)

## 🙏 Tak

- Microsoft for .NET og Blazor
- Azure for Cosmos DB
- Bootstrap for CSS framework
- Alle bidragydere

---

**Status**: ✅ Produktionsklar
**Version**: 1.0.0
**Sidst opdateret**: 2024