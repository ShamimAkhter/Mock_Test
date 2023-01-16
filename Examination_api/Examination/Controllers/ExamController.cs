using Examination.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Examination.Controllers
{
    /* Responsible for Models:
    * - Exam
    * - QuestionSetExam
    */
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private readonly ExaminationContext _context;

        public ExamController(ExaminationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Exam> GetAll()
        {
            return _context.Exams
                .AsNoTracking()
                .Include(e => e.QuestionSetsExams)
                    .ThenInclude(qes => qes.QuestionSet)
                .ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Exam> GetById(int id)
        {
            var exam = _context.Exams
                .AsNoTracking()
                .Include(e => e.QuestionSetsExams)
                    .ThenInclude(qes => qes.QuestionSet)
                .SingleOrDefault(e => e.ExamId == id);

            if (exam == null)
                return NotFound();

            return exam;
        }

        [HttpPost]
        public IActionResult Create(Exam exam)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var entityEntry = _context.Exams.Add(exam);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = entityEntry.Entity.ExamId }, entityEntry.Entity);
        }

    }
}
