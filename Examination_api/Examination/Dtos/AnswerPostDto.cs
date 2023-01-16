using Examination.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Examination.Dtos
{
    public class AnswerPostDto
    {

        public int ExamId { get; set; }

        public int CandidateId { get; set; }

        public int QuestionId { get; set; }
        
        [Required]
        [StringLength(255)]
        public string AnswerText { get; set; }
    }
}
