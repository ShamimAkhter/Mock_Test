using System.ComponentModel.DataAnnotations;

namespace Examination.Models.Validators
{
    //public ActionResult<CandidateExam> GetCandidateExam(int examId, int candidateId)
    public class CandidateExamQuestionSetIdValidator : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            /* Validations:
             * - QuestionSetId present in Exam.QuestionSetExam : QuestionSet not available for this exam
             */

            return base.IsValid(value, validationContext);
        }
    }
}
