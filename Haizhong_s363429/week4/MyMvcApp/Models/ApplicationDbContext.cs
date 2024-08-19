using Microsoft.EntityFrameworkCore;

namespace MyMvcApp.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSet 用于查询和保存 Product 类的实例。
        public DbSet<Product> Products { get; set; }
    }
}
