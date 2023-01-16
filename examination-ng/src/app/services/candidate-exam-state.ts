import { Candidate } from "../models/candidate";
import { Answer } from "../models/answer";
import { QuestionSet } from "../models/questionSet";
import { Exam } from "../models/exam";
import { Question } from "../models/question";
import { CandidateExam } from "../models/candidateExam";

export class CandidateExamState {
  candidate: Candidate;
  exam: Exam;
  questionSet: QuestionSet;

  // questions: Array<Question>;
  // answers: Array<Answer>;
  isVideo: boolean
  currentCandidateExam: CandidateExam;
  currentQuestion: Question;
  currentAnswer: Answer;

  public constructor(init?: Partial<CandidateExamState>) {
    Object.assign(this, init);
  }
}


// models here - move to models folders later

