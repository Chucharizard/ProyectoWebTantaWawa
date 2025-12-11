using Microsoft.EntityFrameworkCore;
// using pan.Models;

namespace pan.Data
{
    public class AppDbContext : DbContext
    {
        // Agregar DbSets aquí
        // Ejemplo: public DbSet<Usuario> Usuarios => Set<Usuario>();

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuraciones de entidades aquí
            // Ejemplo: modelBuilder.Entity<Usuario>().HasIndex(u => u.Email).IsUnique();
        }
    }
}
