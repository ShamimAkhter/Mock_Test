import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths';
import { Candidate } from '../models/candidate';
import { CandidateExam } from '../models/candidateExam';
import { QuestionSet } from '../models/questionSet';
import { QuestionSetExam } from '../models/questionSetExam';
import { CandidateExamStore } from '../services/candidate-exam-store';

@Component({
  selector: 'app-exam-registration',
  templateUrl: './exam-registration.component.html',
})
export class ExamRegistrationComponent implements OnInit {

  // questionSetExams: QuestionSetExam[];

  minsRemaining;
  examExpired = false
  interval;

  modelOpen = false;


  constructor(
    private router: Router,
    private http: HttpClient,

    public store: CandidateExamStore
  ) { }

  ngOnInit(): void {


    if (this.store.state.exam === null) {
      this.router.navigate(['home']);
      alert('No exam selected. Select an exam from the Home page.');
    }



    if (this.store.isCandidateRegistered) {

      let candidateExam = this.store.state.candidate.candidatesExams.find((candidateExam: CandidateExam) => {
        return candidateExam.examId === this.store.state.exam.examId;
      });

      const url = `${environment.baseUrl}${ApiPaths.QuestionSet}/${candidateExam.questionSetId}`;

      this.http.get<QuestionSet>(url)
        .subscribe({
          next: (res: QuestionSet) => this.store.setQuestionSet(res),
          error: err => console.log(err)
        })
    }

    this.examTimerAndExamExpiration();
  }


  register(questionSetId: number) {

    const url = `${environment.baseUrl}${ApiPaths.CandidateExam}`;

    let candidateExam = new CandidateExam({
      examId: this.store.state.exam.examId,
      candidateId: this.store.state.candidate.candidateId,
      questionSetId: questionSetId
    });

    this.http.post<CandidateExam>(url, candidateExam)
      .subscribe({
        next: res => {
          let url = `${environment.baseUrl}${ApiPaths.Candidate}/${this.store.state.candidate.candidateId}`;

          this.http.get<Candidate>(url)
            .subscribe({
              next: (res: Candidate) => {
                this.store.setCandidate(res);

              },
              error: err => console.log(err)
            })

          let url2 = `${environment.baseUrl}${ApiPaths.QuestionSet}/${questionSetId}`;

          this.http.get<QuestionSet>(url2)
          .subscribe({
            next: (res: QuestionSet) => {
              this.store.setQuestionSet(res);
            },
            error: err => console.log(err)
          })
        },
        error: err => console.log(err)
      });
  }

  appearNow() {
    this.modelOpen = true;
  }

  modalResponse(res: string) {
    this.modelOpen = false;

    if (res === 'confirm') {

      const url1 = `${environment.baseUrl}${ApiPaths.CandidateExam}/${this.store.state.exam.examId}/${this.store.state.candidate.candidateId}`;



      this.http.put<CandidateExam>(url1, {})
        .subscribe({
          next: res => {


            this.http.get<CandidateExam>(url1)
              .subscribe({
                next: res => {
                  this.store.setCurrentCandidateExam(res);

                  this.router.navigate(['exam-taking']);
                },
                error: err => console.log(err)
              })


          },
          error: err => console.log(err)
        });
    }
  }

  setVideoMode(event) {
    console.log(event.target.checked);
    this.store.setVideoMode(event.target.checked);
  }


  examTimerAndExamExpiration() {
    // Timer logic
    const examEndTime = (new Date(Date.parse(this.store.state.exam.validTill))).getTime();

    this.interval = setInterval(() => {

      const timeNow = (new Date(Date.now())).getTime();

      let diff = examEndTime - timeNow;
      if (diff <= 0)
        diff = 0;

      let msec = diff;
      let hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;
      let mm = Math.floor(msec / 1000 / 60);
      msec -= mm * 1000 * 60;
      let ss = Math.floor(msec / 1000);
      msec -= ss * 1000;

      // this.minsRemaining = `${hh}:${mm}:${ss}:${msec}`;
      this.minsRemaining = `${hh}:${mm}:${ss} hh:mm:ss`;

      if (hh === 0 && mm === 0 && ss === 0)
        this.examExpired = true;
    }, 1000)
  }










  ngOnDestroy(): void {
    clearTimeout(this.interval);
  }
}
