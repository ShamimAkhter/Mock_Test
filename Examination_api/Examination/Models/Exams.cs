using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Examination.Models
{
    public partial class Exam
    {
        public Exam()
        {
            CandidatesExams = new HashSet<CandidateExam>();
            QuestionSetsExams = new HashSet<QuestionSetsExam>();
        }

        [Key]
        public int ExamId { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [StringLength(255)]
        public string Description { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime ValidFrom { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime ValidTill { get; set; }
        public TimeSpan Duration { get; set; }

        [InverseProperty("Exam")]
        public virtual ICollection<CandidateExam> CandidatesExams { get; set; }
        [InverseProperty("Exam")]
        public virtual ICollection<QuestionSetsExam> QuestionSetsExams { get; set; }
    }
}
