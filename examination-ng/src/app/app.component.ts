import { Component } from '@angular/core';
import { CandidateExamStore } from './services/candidate-exam-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(
    // private router: Router,
    // private candidateService: CandidateService // private
    public store: CandidateExamStore
  ) {}

  title = 'Mock Test';
}
