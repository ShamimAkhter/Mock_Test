import { QuestionSetExam } from "./questionSetExam";

export class Exam {
  examId: number;
  name: string;
  description: string;
  validFrom: string;
  validTill: string;
  duration: string;

  questionSetsExams: QuestionSetExam[] = [];

  public constructor(init?: Partial<Exam>) {
    Object.assign(this, init);
  }
}
