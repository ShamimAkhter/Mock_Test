import { Component, OnInit } from '@angular/core';
import { CandidateExamStore } from '../services/candidate-exam-store';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
})
export class CandidateComponent implements OnInit {

  constructor(
    public store: CandidateExamStore
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.setCandidate(null);
    this.store.setExam(null);
    this.store.setQuestionSet(null);
    this.store.setCurrentQuestion(null);
    this.store.setCurrentAnswer(null);
    this.store.setCurrentCandidateExam(null);
  }

}
