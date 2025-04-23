using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Final_Hom.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Final_Hom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainersController : ControllerBase
    {
        private readonly EntertainerDbContext _context;

        public EntertainersController(EntertainerDbContext context)
        {
            _context = context;
        }

        // GET: api/entertainers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetEntertainers()
        {
            var data = await _context.Entertainers
                .Select(e => new
                {
                    e.EntertainerID,
                    e.EntStageName,
                    BookingCount = _context.Engagements.Count(eng => eng.EntertainerID == e.EntertainerID),
                    LastBooking = _context.Engagements
                        .Where(eng => eng.EntertainerID == e.EntertainerID)
                        .OrderByDescending(eng => eng.StartDate)
                        .Select(eng => eng.StartDate)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(data);
        }

        // GET: api/entertainers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Entertainer>> GetEntertainer(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);

            if (entertainer == null)
            {
                return NotFound();
            }

            return entertainer;
        }

        // POST: api/entertainers
        [HttpPost]
        public async Task<ActionResult<Entertainer>> PostEntertainer(Entertainer entertainer)
        {
            _context.Entertainers.Add(entertainer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEntertainer), new { id = entertainer.EntertainerID }, entertainer);
        }

        // PUT: api/entertainers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntertainer(int id, Entertainer entertainer)
        {
            if (id != entertainer.EntertainerID)
            {
                return BadRequest();
            }

            _context.Entry(entertainer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Entertainers.Any(e => e.EntertainerID == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/entertainers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntertainer(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);
            if (entertainer == null)
            {
                return NotFound();
            }

            _context.Entertainers.Remove(entertainer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
