import { QuestionSet } from "./questionSet";

export class QuestionSetExam {
  questionSetId: number;
  examId: number;

  questionSet: QuestionSet;

  public constructor(init?: Partial<QuestionSetExam>) {
    Object.assign(this, init);
  }
}
