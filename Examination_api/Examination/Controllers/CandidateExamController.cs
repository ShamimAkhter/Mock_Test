using Examination.Dtos;
using Examination.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Examination.Controllers
{
    /* Responsible for Models:
     * - CandidateExam
     */
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateExamController : ControllerBase
    {
        private readonly ExaminationContext _context;

        public CandidateExamController(ExaminationContext context)
        {
            _context = context;
        }

        [HttpGet("{examId}/{candidateId}")]
        public ActionResult<CandidateExam> GetCandidateExam(int examId, int candidateId)
        {
            var candidateExamInDb = _context.CandidatesExams
                .Include(ce => ce.Answers)
                .SingleOrDefault(ce => (ce.ExamId == examId) && (ce.CandidateId == candidateId));
            //.FirstOrDefault(ce => (ce.ExamId == examId) && (ce.CandidateId == candidateId));

            if (candidateExamInDb == null)
                return NotFound();

            return candidateExamInDb;
        }

        // Register for exam - Create a new CandidateExam
        [HttpPost]
        public IActionResult ExamRegister(CandidateExamPostDto dto)
        {
            var candidateInDb = _context.Candidates.SingleOrDefault(c => c.CandidateId == dto.CandidateId);
            if (candidateInDb == null)
                return NotFound("Candidate not found");

            var examInDb = _context.Exams.Include(e => e.QuestionSetsExams).SingleOrDefault(e => e.ExamId == dto.ExamId);
            if (examInDb == null)
                return NotFound("Exam not found");

            var questionSetExamInDb = examInDb.QuestionSetsExams.SingleOrDefault(q => q.QuestionSetId == dto.QuestionSetId);
            if (questionSetExamInDb == null)
                return NotFound("QuestionSet not found!");


            // remove these with custom validator's later -----------------
            if (!(examInDb.ValidFrom <= DateTime.Now))
                return BadRequest("Exam not yet started!");

            if (!(DateTime.Now <= examInDb.ValidTill))
                return BadRequest("Exam expired!");

            var candidateExam = new CandidateExam();
            candidateExam.ExamId = dto.ExamId;
            candidateExam.CandidateId = dto.CandidateId;
            candidateExam.QuestionSetId = dto.QuestionSetId;

            var entityEntry = _context.CandidatesExams.Add(candidateExam);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetCandidateExam), new
            {
                examId = entityEntry.Entity.ExamId,
                candidateId = entityEntry.Entity.CandidateId
            }, entityEntry.Entity); // change to CreatedAtAction
        }


        // Appear for exam - To set start time and end time
        [HttpPut("{examId}/{candidateId}")]
        public IActionResult ExamAppear(int examId, int candidateId)
        {
            var candidateExamInDb = _context.CandidatesExams
                .SingleOrDefault(ce => (ce.ExamId == examId) && (ce.CandidateId == candidateId));

            if (candidateExamInDb == null)
                return NotFound();

            //return BadRequest("You already appeared for this exam");
            if (candidateExamInDb.StartTime != null)
                return NoContent();

            candidateExamInDb.StartTime = DateTime.Now;
            var exam = _context.Exams.Single(e => e.ExamId == examId);
            candidateExamInDb.EndTime = candidateExamInDb.StartTime + exam.Duration;

            _context.SaveChanges();

            return NoContent();
        }
    }
}
