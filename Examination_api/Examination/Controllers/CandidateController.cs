using Examination.Dtos;
using Examination.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Matching;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Collections.Generic;
using System.Linq;

namespace Examination.Controllers
{
    /* Responsible for Models:
    * - Candidate
    */
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly ExaminationContext _context;

        public CandidateController(ExaminationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Candidate> GetAll()
        {
            return _context.Candidates
                .AsNoTracking()
                .ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Candidate> GetById(int id)
        {
            var candidateInDb = _context.Candidates
                .AsNoTracking()
                .Include(c => c.CandidatesExams)
                .SingleOrDefault(c => c.CandidateId == id);

            if (candidateInDb == null)
                return NotFound();

            return candidateInDb;
        }

        [HttpPost("Login")]
        public IActionResult Login(CandidateLoginDto dto)
        {
            var candidateInDb = _context.Candidates
                .AsNoTracking()
                .Include(c => c.CandidatesExams)
                .SingleOrDefault(c => (c.Email == dto.Email) && (c.Password == dto.Password));

            if (candidateInDb == null)
                return NotFound();

            return CreatedAtAction(nameof(GetById), new { id = candidateInDb.CandidateId }, candidateInDb);
        }


        [HttpPost]
        public IActionResult Create(Candidate candidate)
        {
            //if (!ModelState.IsValid)
            //    return BadRequest();

            var entityEntry = _context.Candidates.Add(candidate);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = entityEntry.Entity.CandidateId }, entityEntry.Entity);
        }

    }
}
