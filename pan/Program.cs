using pan.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

////////////////////////////////////////////////////////////
// Base de datos en memoria temporal para probar las api
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("PanDB"));

// Para SQL Server (descomentar cuando sea necesario):
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registrar servicios personalizados aquí
// Ejemplo: builder.Services.AddScoped<UsuarioService>();

// Agregar HttpContextAccessor para acceder al contexto HTTP en los servicios
builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers()
    .AddJsonOptions(x =>
        x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);

////////////////////////////////////////////////////////////
// CONFIGURACION DE AUTENTICACION JWT CON SOPORTE PARA COOKIES

var key = builder.Configuration["Jwt:Key"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            NameClaimType = ClaimTypes.Name,
            RoleClaimType = ClaimTypes.Role
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

                if (string.IsNullOrEmpty(token))
                {
                    token = context.Request.Cookies["AuthToken"];
                }

                context.Token = token;
                return Task.CompletedTask;
            }
        };
    });

// CREACION DE POLITICAS DE AUTORIZACION
builder.Services.AddAuthorization(options =>
{
    // Agregar políticas personalizadas aquí
    // Ejemplo: options.AddPolicy("EsAdmin", policy => policy.RequireRole("Administrador"));
});

////////////////////////////////////////////////////////////

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Ingresa el token JWT aquí. Ejemplo: Bearer eyJhbGciOiJIUzI1NiIsInR5..."
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

// Seed data (descomentar cuando sea necesario)
// using (var scope = app.Services.CreateScope())
// {
//     var services = scope.ServiceProvider;
//     await SeedData.Inicializar(services);
// }

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
