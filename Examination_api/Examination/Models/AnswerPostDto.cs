using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Examination.Models
{
    public class AnswerPostDto
    {
        [Required]
        public int ExamId { get; set; }

        [Required]
        public int CandidateId { get; set; }

        [Required]
        public int QuestionId { get; set; }

        //[AnswerAnswerTextValidator]
        [Required]
        [StringLength(255)]
        public string AnswerText { get; set; }

        public IFormFile AnswerFile { get; set; }
    }

}
