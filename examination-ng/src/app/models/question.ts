export class Question {
  questionId: number;
  questionNumber: number;
  questionText: string;
  maxMarks: number;
  questionSetId: number;

  public constructor(init?: Partial<Question>) {
    Object.assign(this, init);
  }
}
