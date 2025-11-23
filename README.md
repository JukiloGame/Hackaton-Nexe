# Hackaton Nexe Fundacio

## Herramientas que llevar
### .Net (Con comandos)
SDK .NET SDK 8.0.416

```bash
dotnet add package Microsoft.EntityFrameworkCore --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.0
dotnet tool install --global dotnet-ef --version 8.0.0
```

## .Net Comandos
### Version de sdks
``` dotnet --list-sdks ```
### Correr backend
``` bash
cd /backend/pluriconnect-api
dotnet run
```
### Generar models + DbContext (dentro de /backend/pluriconnect_api
```dotnet ef dbcontext scaffold "Data Source=Data/pluriconnect.db" Microsoft.EntityFrameworkCore.Sqlite --output-dir Database --context-dir Database --context AppDbContext --force```
## Opcionales
### Crear una migración
```dotnet ef migrations add InitialCreate --output-dir Database/Migrations```
### Aplicar migraciones
```dotnet ef database update```
### Regenerar models desde .db (si cambias algo a mano)
```dotnet ef dbcontext scaffold "Data Source=Data/app.db" Microsoft.EntityFrameworkCore.Sqlite --output-dir Database --context-dir Database --context AppDbContext --force```


## React

```bash
cd Client
npm i
npm run dev
```

