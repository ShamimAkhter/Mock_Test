using System;
using System.ComponentModel.DataAnnotations;

namespace Examination.Models.Validators
{
    public class CandidateDateOfBirthValidator : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var candidate = (Candidate)validationContext.ObjectInstance;

            if (candidate.DateOfBirth > DateTime.Parse("01-01-2000"))
                return new ValidationResult("Date of birth cannot be greater than 01-01-2000");

            if (candidate.DateOfBirth < DateTime.Parse("01-01-1980"))
                return new ValidationResult("Date of birth cannot be less than 01-01-1980");


            return ValidationResult.Success;
        }
    }
}
