using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Examination.Models
{
    public partial class Answer
    {
        [Key]
        public int ExamId { get; set; }
        [Key]
        public int CandidateId { get; set; }
        [Key]
        public int QuestionId { get; set; }

        [Required]
        //[StringLength(255)]
        public string AnswerText { get; set; }
        public int Marks { get; set; }
        [StringLength(255)]
        public string AnswerFileLink { get; set; }

        [ForeignKey("ExamId,CandidateId")]
        [InverseProperty("Answers")]
        public virtual CandidateExam CandidatesExams { get; set; }
    }
}
