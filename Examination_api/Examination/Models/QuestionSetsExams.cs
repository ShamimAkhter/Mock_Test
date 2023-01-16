using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Examination.Models
{
    public partial class QuestionSetsExam
    {
        [Key]
        public int QuestionSetId { get; set; }
        [Key]
        public int ExamId { get; set; }

        [ForeignKey(nameof(ExamId))]
        [InverseProperty(nameof(Models.Exam.QuestionSetsExams))]
        public virtual Exam Exam { get; set; }
        [ForeignKey(nameof(QuestionSetId))]
        [InverseProperty(nameof(Models.QuestionSet.QuestionSetsExams))]
        public virtual QuestionSet QuestionSet { get; set; }
    }
}
