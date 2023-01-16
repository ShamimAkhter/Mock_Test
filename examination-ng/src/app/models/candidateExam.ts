import { Answer } from "./answer";

export class CandidateExam {
  examId: number;
  candidateId: number;
  questionSetId: number;
  startTime: string;
  endTime: string;
  score: number;

  answers: Answer[] = [];

  public constructor(init?: Partial<CandidateExam>) {
    Object.assign(this, init);
  }
}
