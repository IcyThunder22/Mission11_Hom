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
        public IActionResult GetBooks(int pageNum = 1, int pageSize = 5, bool sort = false, [FromQuery] List<string>? bookTypes = null)
        {
            var query = _context.Books.AsQueryable();

            if (sort) 
            { 
                query = query.OrderBy(b => b.Title);
            }
            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }
            
            var BooksList = query
                .Skip((pageNum - 1) * pageSize )
                .Take(pageSize)
                .ToList();

            var totalNumBooks = query.Count();

            var both = new
            {
                Books = BooksList,
                Total = totalNumBooks
            };

            return Ok(both);
        }

    }
}
