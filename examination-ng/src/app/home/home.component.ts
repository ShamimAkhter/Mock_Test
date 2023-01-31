import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths';
import { CandidateExam } from '../models/candidateExam';
import { Exam } from '../models/exam';
import { CandidateExamStore } from '../services/candidate-exam-store';

@Component({
  selector: 'app-candidate-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  modal = {
    isOpen: false,
    header: null,
    body: null,
  };

  alreadyRegistered = false;

  examObs = null;

  // selectedExam: Exam = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    public store: CandidateExamStore
  ) { }

  ngOnInit(): void {
    let url = `${environment.baseUrl}${ApiPaths.Exam}`;

    this.examObs = this.http.get<Exam>(url);





  }

  openModal(exam: Exam) {
    // this.modal.isOpen = true;
    // this.modal.header = 'Exam Details';
    // this.modal.body = exam;

    // console.log(exam);

    this.store.setExam(exam);

    console.log(exam);


    this.router.navigate(['exam-register']);

    // if (this.store.isCandidateRegistered)
    //   this.alreadyRegistered = true;
    // else
    //   this.alreadyRegistered = false;
  }
  closeModal(res) {
    this.modal.isOpen = false;
    this.modal.header = null;
    this.modal.body = null;

    if (res === 'forward') {
      this.router.navigate(['exam-register']);
    }
    if (res === 'exam') {
      this.router.navigate(['exam-taking']);
    }
    if (res === 'cancel') {
      this.store.setExam(null);
    }
  }

  just(validFrom:string, validTill:string): string {
    let from = new Date(validFrom);
    let till = new Date(validTill);
    let now = new Date(Date.now());

    if (now.getTime() < from.getTime()) return 'Not started';
    else if ((from.getTime() <= now.getTime()) && (now.getTime() <= till.getTime())) return 'Go to Exam';
    else if (now.getTime() > till.getTime()) return 'Expired';
    else return 'Unknown'

    // // if (now.getDate() > till.getDate()) return 'Expired';
    // if (now.getTime() > till.getTime()) return 'Expired';
    // else return 'Unknown'
  }

}
