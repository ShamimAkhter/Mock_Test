using System.ComponentModel.DataAnnotations;

namespace Examination.Models.Validators
{
    public class AnswerAnswerTextValidator: ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            /* Validations:
             * - CandidateExam.StartTime != null : Not registered for exam
             * - CandidateExam.StartTime <= DateTime.Now <= CandidateExam.EndTime
             *  - DateTime.Now < CandidateExam.StartTime : Exam not yet started   
             *  - DateTime.Now > CandidateExam.EndTime   : Exam is already complete
             */
            return base.IsValid(value, validationContext);
        }
    }
}
