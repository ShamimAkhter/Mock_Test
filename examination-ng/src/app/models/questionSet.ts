import { Question } from "./question";

export class QuestionSet {
  questionSetId: number;
  name: string;
  description: string;

  questions: Question[] = [];

  public constructor(init?: Partial<QuestionSet>) {
    Object.assign(this, init);
  }
}
