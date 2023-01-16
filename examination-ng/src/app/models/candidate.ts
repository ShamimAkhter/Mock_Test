import { CandidateExam } from "./candidateExam";

export class Candidate {
  candidateId: number;
  name: string;
  dateOfBirth: string;
  email: string;
  password: string;
  candidatesExams: CandidateExam[] = [];

  public constructor(init?: Partial<Candidate>) {
    Object.assign(this, init);
  }
}

