import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPaths } from 'src/app/enums/api-paths';
import { Answer } from 'src/app/models/answer';
import { Candidate } from 'src/app/models/candidate';
import { Exam } from 'src/app/models/exam';
import { Question } from 'src/app/models/question';
import { QuestionSet } from 'src/app/models/questionSet';
import { QuestionSetExam } from 'src/app/models/questionSetExam';
import { CandidateExamState } from 'src/app/services/candidate-exam-state';
import { CandidateExamStore } from 'src/app/services/candidate-exam-store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-state-status',
  templateUrl: './state-status.component.html',
})
export class StateStatusComponent implements OnInit {
  // currentCandidate: Candidate = null;

  // state: CandidateExamState;

  AnswerObs;

  Url = environment.baseUrl;

  constructor(
    private router: Router,
    // private candidateService: CandidateService // private
    public store: CandidateExamStore,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // if (this.currentCandidate === null) this.router.navigate(['candidate/login']);
    // this.store.state$.subscribe(
    //   (res: CandidateExamState) => (this.state = res)
    // );

    let url = `${environment.baseUrl}${ApiPaths.Answer}`
    this.AnswerObs = this.http.get<Answer[]>(url);
  }

  setCandidate(id: number) {

    if (id === 0) {
      this.store.setCandidate(null);
      return;
    }

    let candidate = new Candidate({
      candidateId: id,
      name: 'Ben Parkinson',
      email: 'ben@parkinson',
      dateOfBirth: '1990-03-04',
    });
    this.store.setCandidate(candidate);
  }

  setExam(set: number) {

    if (set === 0) {
      this.store.setExam(null);
      return;
    }

    let exam = new Exam({
      examId: 1,
      name: 'Dec First Exam',
      description: 'Useless exam of the year!',
      duration: '00:30:00',
      validFrom: '2022-12-17',
      validTill: '2022-12-25',

      questionSetsExams: [
        new QuestionSetExam({
          questionSetId: 1,
          examId: 1
        }),
        new QuestionSetExam({
          questionSetId: 2,
          examId: 1
        })
      ]
    });
    this.store.setExam(exam);
  }

  setQuestionSet(set: number) {

    if (set === 0) {
      this.store.setQuestionSet(null);
      return;
    }

    let questionSet = new QuestionSet({
      questionSetId: 1,
      name: "Dummy Question Set",
      description: "Dummy Question Set description",
      questions: [
        new Question({
          questionId: 101,
          questionNumber: 1,
          questionText: 'Who is the potato of the year?',
          maxMarks: 5,
        }),
        new Question({
          questionId: 102,
          questionNumber: 2,
          questionText: 'How are you mister?',
          maxMarks: 5,
        }),
        new Question({
          questionId: 103,
          questionNumber: 3,
          questionText: 'What is this?',
          maxMarks: 5,
        }),
      ]
    });

    this.store.setQuestionSet(questionSet);
  }

  setAnswer(set: number) {
    if (set === 0) {
      this.store.setCurrentAnswer(null);
      return;
    }

    let answer = new Answer({
      examId: this.store.state.exam.examId,
      candidateId: this.store.state.candidate.candidateId,
      questionId: this.store.state.questionSet.questionSetId,
      answerText: 'Junk answer',
    });

    this.store.setCurrentAnswer(answer);
  }
}

