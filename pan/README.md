# Proyecto Pan - Backend API

Plantilla base para desarrollo de APIs REST con .NET 8.0

## Estructura del Proyecto

```
pan/
├── Controllers/        # Controladores de API REST
├── Services/          # Servicios de lógica de negocio
├── Models/            # Modelos de dominio
│   └── DTOs/         # Data Transfer Objects
├── Data/              # DbContext y configuración de datos
├── Properties/        # Configuración de lanzamiento
├── Program.cs         # Punto de entrada y configuración
├── appsettings.json   # Configuraciones
└── pan.csproj         # Archivo de proyecto
```

## Tecnologías Incluidas

- **.NET 8.0** - Framework principal
- **ASP.NET Core Web API** - Framework web
- **Entity Framework Core 8.0** - ORM
- **JWT Authentication** - Autenticación con tokens
- **Swagger/OpenAPI** - Documentación de API
- **SQL Server** - Base de datos (preparado)
- **In-Memory Database** - Para desarrollo/testing

## Instalación

### Requisitos previos
- .NET 8.0 SDK instalado
- SQL Server (opcional, usa In-Memory por defecto)

### Pasos

1. **Restaurar paquetes NuGet:**
   ```bash
   cd pan
   dotnet restore
   ```

2. **Compilar el proyecto:**
   ```bash
   dotnet build
   ```

3. **Ejecutar el proyecto:**
   ```bash
   dotnet run
   ```

4. **Acceder a Swagger:**
   - HTTP: http://localhost:5000/swagger
   - HTTPS: https://localhost:7000/swagger

## Configuración

### Base de Datos

Por defecto usa **In-Memory Database** para desarrollo rápido.

Para usar **SQL Server**, edita `Program.cs`:

```csharp
// Comentar esta línea:
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseInMemoryDatabase("PanDB"));

// Descomentar esta línea:
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

### JWT Configuration

Edita `appsettings.json` para cambiar la clave JWT:

```json
{
  "Jwt": {
    "Key": "TU_CLAVE_SECRETA_AQUI",
    "Issuer": "PanApi",
    "Audience": "PanUsuarios",
    "ExpirationMinutes": 120
  }
}
```

## Cómo Usar

### 1. Crear un Modelo

Crea un archivo en `Models/`:

```csharp
using System.ComponentModel.DataAnnotations;

namespace pan.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}
```

### 2. Crear un DTO

Crea un archivo en `Models/DTOs/`:

```csharp
namespace pan.Models.DTOs
{
    public class UsuarioDto
    {
        public string Nombre { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
```

### 3. Agregar al DbContext

Edita `Data/AppDbContext.cs`:

```csharp
public DbSet<Usuario> Usuarios => Set<Usuario>();
```

### 4. Crear un Servicio

Crea un archivo en `Services/`:

```csharp
using pan.Data;
using pan.Models;
using Microsoft.EntityFrameworkCore;

namespace pan.Services
{
    public class UsuarioService
    {
        private readonly AppDbContext _context;

        public UsuarioService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Usuario>> ObtenerTodos()
        {
            return await _context.Usuarios.ToListAsync();
        }
    }
}
```

### 5. Registrar el Servicio

Edita `Program.cs`:

```csharp
builder.Services.AddScoped<UsuarioService>();
```

### 6. Crear un Controlador

Crea un archivo en `Controllers/`:

```csharp
using Microsoft.AspNetCore.Mvc;
using pan.Services;

namespace pan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _service;

        public UsuarioController(UsuarioService service)
        {
            _service = service;
        }

        [HttpGet("obtener")]
        public async Task<IActionResult> Obtener()
        {
            var usuarios = await _service.ObtenerTodos();
            return Ok(usuarios);
        }
    }
}
```

## Comandos Útiles

### Migraciones (cuando uses SQL Server)

```bash
# Crear migración
dotnet ef migrations add NombreMigracion

# Aplicar migraciones
dotnet ef database update

# Revertir migración
dotnet ef migrations remove
```

### Build y Run

```bash
# Compilar
dotnet build

# Ejecutar
dotnet run

# Watch mode (recarga automática)
dotnet watch run

# Limpiar
dotnet clean
```

## Autenticación JWT

La plantilla ya incluye configuración JWT. Para proteger endpoints:

```csharp
[Authorize] // Requiere autenticación
[Authorize(Policy = "EsAdmin")] // Requiere rol específico
```

## Próximos Pasos

1. ✅ Definir tus modelos de dominio
2. ✅ Crear servicios de lógica de negocio
3. ✅ Implementar controladores de API
4. ✅ Configurar seed data si es necesario
5. ✅ Agregar políticas de autorización personalizadas
6. ✅ Implementar validaciones
7. ✅ Configurar CORS si tienes frontend

## Licencia

Proyecto de práctica - Uso libre
