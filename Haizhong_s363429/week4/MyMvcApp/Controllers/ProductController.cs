using Microsoft.AspNetCore.Mvc;
using MyMvcApp.Models;
using System.Linq;

namespace MyMvcApp.Controllers
{
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        // 将 ApplicationDbContext 注入到控制器中
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // 从数据库中获取产品列表
            var products = _context.Products.ToList();
            return View(products);
        }

        // 删除产品 - 显示确认页面
        public IActionResult Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var product = _context.Products
                .FirstOrDefault(m => m.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return View(product);
        }

        // 删除产品 - 确认后执行删除操作
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            var product = _context.Products.Find(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges(); // 保存更改到数据库
            }

            return RedirectToAction(nameof(Index)); // 重定向回到产品列表
        }
        // 显示编辑表单 (GET)
        public IActionResult Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            return View(product); // 返回编辑视图并传递产品模型
        }

        // 处理编辑表单提交 (POST)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Product product)
        {
            if (id != product.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                _context.Update(product); // 更新产品
                _context.SaveChanges(); // 保存更改到数据库
                return RedirectToAction(nameof(Index)); // 重定向回产品列表
            }
            return View(product); // 如果模型验证失败，返回编辑视图并显示错误
        }

        // 显示创建产品的页面
        public IActionResult Create()
        {
            return View();
        }

        // 处理创建产品的表单提交
        [HttpPost]
        public IActionResult Create(Product product)
        {
            if (ModelState.IsValid)
            {
                _context.Products.Add(product);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            return View(product);
        }
    } // 这个花括号关闭了 ProductController 类
} // 这个花括号关闭了命名空间
