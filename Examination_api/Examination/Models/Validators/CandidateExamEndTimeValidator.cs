using System.ComponentModel.DataAnnotations;

namespace Examination.Models.Validators
{
    public class CandidateExamEndTimeValidator : ValidationAttribute // not required actually, user will not set this.
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var candidateExam = (CandidateExam)validationContext.ObjectInstance;

            if (candidateExam.EndTime == null)
                return ValidationResult.Success;

            if (candidateExam.StartTime == null)
                return new ValidationResult("StartTime is required");

            return (candidateExam.EndTime == candidateExam.StartTime + candidateExam.Exam.Duration)
                ? ValidationResult.Success
                : new ValidationResult("Incorrect End time");
        }
    }
}
