export class Answer {
  examId: number;
  candidateId: number;
  questionId: number;
  answerText: string;
  answerFileLink: string;
  marks: number;

  public constructor(init?: Partial<Answer>) {
    Object.assign(this, init);
  }
}

export class AnswerDto {
  examId: number;
  candidateId: number;
  questionId: number;
  answerText: string;

  answerFile: Blob;

  public constructor(init?: Partial<Answer>) {
    Object.assign(this, init);
  }
}
