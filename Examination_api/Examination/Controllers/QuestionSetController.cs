using Examination.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Examination.Controllers
{
    /* Responsible for Models:
     * - QuestionSet
     * - Question
     */
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionSetController : ControllerBase
    {
        private readonly ExaminationContext _context;

        public QuestionSetController(ExaminationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<QuestionSet> GetAll()
        {
            return _context.QuestionSets
                .Include(qs => qs.Questions)
                .AsNoTracking()
                .ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<QuestionSet> GetById(int id)
        {
            var questionSet = _context.QuestionSets
                .Include(qs=>qs.Questions)
                .AsNoTracking()
                .SingleOrDefault(p => p.QuestionSetId == id);

            if (questionSet == null)
                return NotFound();

            return questionSet;
        }

        [HttpPost]
        public IActionResult Create(QuestionSet questionSet)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var entityEntry = _context.QuestionSets.Add(questionSet);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = entityEntry.Entity.QuestionSetId }, entityEntry.Entity);
        }


    }
}
