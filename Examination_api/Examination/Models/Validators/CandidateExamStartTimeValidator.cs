using System.ComponentModel.DataAnnotations;

namespace Examination.Models.Validators
{
    public class CandidateExamStartTimeValidator : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var candidateExam = (CandidateExam)validationContext.ObjectInstance;

            //if (candidateExam.StartTime != null)
            //    return new ValidationResult("Already appeared for exam");

            if (candidateExam.StartTime == null)
                return ValidationResult.Success;

            if (candidateExam.StartTime < candidateExam.Exam.ValidFrom)
                return new ValidationResult("Exam has not started yet");

            if (candidateExam.StartTime > candidateExam.Exam.ValidTill)
                return new ValidationResult("Exam is already over");

            return candidateExam.StartTime >= candidateExam.Exam.ValidFrom
                && candidateExam.StartTime <= candidateExam.Exam.ValidTill
                ? ValidationResult.Success
                : new ValidationResult("StartTime is invalid");
        }
    }
}
