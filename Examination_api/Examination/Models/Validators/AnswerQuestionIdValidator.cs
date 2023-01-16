using System;
using System.ComponentModel.DataAnnotations;

namespace Examination.Models.Validators
{
    // to be applied on answer text
    public class AnswerQuestionIdValidator : ValidationAttribute // 
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var candidateExam = (CandidateExam)validationContext.ObjectInstance;

            if (candidateExam == null)
                return ValidationResult.Success;

            if (candidateExam.StartTime == null)
                return new ValidationResult("Start examination before giving answers");

            return DateTime.Now <= candidateExam.EndTime
                && DateTime.Now >= candidateExam.StartTime
                ? ValidationResult.Success
                : new ValidationResult("Answering is only allowed within the alloted time");
        }
    }
}
