import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  CandidateExamState } from '../services/candidate-exam-state';
import { CandidateExamStore } from '../services/candidate-exam-store';
import { ApiPaths } from '../enums/api-paths';
import { environment } from 'src/environments/environment';
import { Candidate } from '../models/candidate';

@Component({
  selector: 'app-login',
  templateUrl: './candidate-login.component.html',
})
export class CandidateLoginComponent implements OnInit {
  form: FormGroup;

  modal = {
    isOpen: false,
    header: null,
    body: null,
  };

  ariaBusy = false;

  constructor(
    private store: CandidateExamStore,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.ariaBusy = true;

    let candidate = new Candidate({
      email: this.form.value.email,
      password: this.form.value.password,
    });

    let url = `${environment.baseUrl}${ApiPaths.Login}`;

    this.http
      .post(url, candidate)
      .subscribe({
        next: (res: Candidate) => {
          console.log(res);
          this.ariaBusy = false;
          this.form.reset();
          this.store.setCandidate(res);
          this.router.navigate(['home']);
        },
        error: (err) => {
          console.log(err);
          this.ariaBusy = false;
          this.modal.header = 'Login Error!';
          this.modal.body = JSON.stringify(err);
          this.modal.isOpen = true;
        },
      });

    // http request to api/candidate/Verify
    // Success
    //    assign candidate state
    //    navigate to home
    // Fail
    //    form reset
    //    error modal
  }

  modalOkButton() {
    this.modal.isOpen = false;
    this.modal.header = null;
    this.modal.body = null;
  }


  setValue() {
    this.form.setValue({
      email: 'amie@bella',
      password: '1234',
    });
  }
}
