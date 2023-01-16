using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Examination.Models
{
    public partial class Question
    {
        [Key]
        public int QuestionId { get; set; }
        public int QuestionNumber { get; set; }
        [Required]
        [StringLength(255)]
        public string QuestionText { get; set; }
        public int MaxMarks { get; set; }
        public int QuestionSetId { get; set; }

        [ForeignKey(nameof(QuestionSetId))]
        [InverseProperty(nameof(Models.QuestionSet.Questions))]
        public virtual QuestionSet QuestionSet { get; set; }
    }
}
