using Examination.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Examination.Controllers
{
    /* Responsible for Models:
     * - Answer
     */
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly ExaminationContext _context;
        private readonly string directory;
        private readonly IWebHostEnvironment _environment;


        public AnswerController(ExaminationContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
            directory = Path.Combine(_environment.WebRootPath, "Answers");
        }

        [HttpGet]
        public ActionResult<IEnumerable<Answer>> GetAnswers()
        {
            var answers = _context.Answers.ToList();

            return answers;
        }

        [HttpGet("{examId}/{candidateId}")]
        public ActionResult<Answer> GetAnswerById(int examId, int candidateId)
        {
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> PostAnswer([FromForm] AnswerPostDto answerPostDto)
        {
            if (answerPostDto == null)
                return BadRequest();

            var answer = new Answer();
            answer.ExamId = answerPostDto.ExamId;
            answer.CandidateId = answerPostDto.CandidateId;
            answer.QuestionId = answerPostDto.QuestionId;
            answer.AnswerText = answerPostDto.AnswerText;
            answer.AnswerFileLink = $"Answers/{answerPostDto.ExamId}-{answerPostDto.CandidateId}-{answerPostDto.QuestionId}.mp4";

            var entityEntry = _context.Answers.Add(answer);
            _context.SaveChanges();

            // File work start here
            if (!Directory.Exists(directory))
            {
                DirectoryInfo info = Directory.CreateDirectory(directory);
            }

            string filePath = Path.Combine(directory,
                                           answerPostDto.ExamId.ToString() + "-" +
                                           answerPostDto.CandidateId.ToString() + "-" +
                                           answerPostDto.QuestionId.ToString() + ".mp4");

            using (var stream = System.IO.File.Create(filePath))
            {
                await answerPostDto.AnswerFile.CopyToAsync(stream);
            }
            // File work end here

            return NoContent();
        }


    }
}
