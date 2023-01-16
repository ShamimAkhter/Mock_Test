import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths';
import { Candidate } from '../models/candidate';

@Component({
  selector: 'app-register',
  templateUrl: './candidate-register.component.html',
})
export class CandidateRegisterComponent implements OnInit {
  form: FormGroup;

  modal = {
    isOpen: false,
    header: null,
    body1: null,
    body: null,
  };

  ariaBusy = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  setValue() {
    this.form.setValue({
      name: 'Amie Bella',
      dateOfBirth: '1979-01-12',
      email: 'amie@bella',
      password: '1234',
    });
  }

  onSubmit() {
    this.ariaBusy = true;

    let candidate = new Candidate({
      name: this.form.value.name,
      dateOfBirth: this.form.value.dateOfBirth,
      email: this.form.value.email,
      password: this.form.value.password,
    });

    let url = `${environment.baseUrl}${ApiPaths.Candidate}`;

    this.http
      .post(url, candidate)
      .subscribe({
        next: (res: Candidate) => {
          this.ariaBusy = false;
          this.form.reset();
          console.log(res);
          this.modal.header = 'Success!';
          this.modal.body = JSON.stringify(res);
          this.modal.isOpen = true;
        },
        error: (err) => {
          this.ariaBusy = false;
          console.log(err);
          this.modal.header = 'Error!';
          this.modal.body = JSON.stringify(err);
          this.modal.isOpen = true;
        },
      });
  }

  modalOkButton() {
    this.modal.isOpen = false;
    this.modal.header = null;
    this.modal.body = null;
  }
}
