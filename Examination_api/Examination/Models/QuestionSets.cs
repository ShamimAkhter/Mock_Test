using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Examination.Models
{
    public partial class QuestionSet
    {
        public QuestionSet()
        {
            QuestionSetsExams = new HashSet<QuestionSetsExam>();
            Questions = new HashSet<Question>();
        }

        [Key]
        public int QuestionSetId { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [StringLength(255)]
        public string Description { get; set; }

        [InverseProperty("QuestionSet")]
        public virtual ICollection<QuestionSetsExam> QuestionSetsExams { get; set; }
        [InverseProperty("QuestionSet")]
        public virtual ICollection<Question> Questions { get; set; }
    }
}
