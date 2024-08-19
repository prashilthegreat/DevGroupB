using Microsoft.AspNetCore.Mvc;
using MyMvcApp.Models;
using System.Collections.Generic;

namespace MyMvcApp.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            var products = new List<Product>
            {
                new Product { Id = 1, Name = "Laptop", Price = 999.99m },
                new Product { Id = 2, Name = "Smartphone", Price = 699.99m },
                new Product { Id = 3, Name = "Tablet", Price = 499.99m }
            };

            return View(products);
        }
    }
}
