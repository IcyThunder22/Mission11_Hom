using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Hom.Data;

namespace Mission11_Hom.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookDbContext _context;

        public BooksController(BookDbContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBooks")]
        public IActionResult GetBooks(int pageNum, int pageSize, bool sort = false)
        {
            var query = _context.Books.AsQueryable();

            if (sort) 
            { 
                query = query.OrderBy(b => b.Title);
            }
            
            var BooksList = query
                .Skip((pageNum - 1) * pageSize )
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _context.Books.Count();

            var both = new
            {
                Books = BooksList,
                Total = totalNumBooks
            };

            return Ok(both);
        }

    }
}
