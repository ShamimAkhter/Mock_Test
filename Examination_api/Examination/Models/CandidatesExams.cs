using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Examination.Models
{
    public partial class CandidateExam
    {
        public CandidateExam()
        {
            Answers = new HashSet<Answer>();
        }

        [Key]
        public int ExamId { get; set; }
        [Key]
        public int CandidateId { get; set; }
        public int QuestionSetId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? StartTime { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EndTime { get; set; }
        public int? Score { get; set; }

        [ForeignKey(nameof(CandidateId))]
        [InverseProperty(nameof(Models.Candidate.CandidatesExams))]
        public virtual Candidate Candidate { get; set; }
        [ForeignKey(nameof(ExamId))]
        [InverseProperty(nameof(Models.Exam.CandidatesExams))]
        public virtual Exam Exam { get; set; }
        [InverseProperty("CandidatesExams")]
        public virtual ICollection<Answer> Answers { get; set; }
    }
}
