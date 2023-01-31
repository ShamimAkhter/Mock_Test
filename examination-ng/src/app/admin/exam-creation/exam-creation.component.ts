import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/enums/api-paths';
import { Exam } from 'src/app/models/exam';
import { QuestionSet } from 'src/app/models/questionSet';
import { CandidateExamState } from 'src/app/services/candidate-exam-state';
import { CandidateExamStore } from 'src/app/services/candidate-exam-store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exam-creation',
  templateUrl: './exam-creation.component.html',
})
export class ExamCreationComponent implements OnInit {
  // constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.http
  //     .put('https://localhost:44334/api/Examination/1/1', {})
  //     .subscribe((res) => console.log);
  // }

  // state: CandidateExamState;
  examListObs;

  questionSets: QuestionSet[] = [];

  examCreationForm: FormGroup;

  constructor(
    private router: Router,
    // private candidateService: CandidateService // private
    private http: HttpClient,
    public store: CandidateExamStore,
    private fb: FormBuilder
  ) { }

  today = new Date();
  todayPlus10;
  ngOnInit(): void {
    this.todayPlus10 = this.today;
    this.todayPlus10.setDate(this.todayPlus10.getDate() + 10);


    // if (this.currentCandidate === null) this.router.navigate(['candidate/login']);
    // this.stateService.state$.subscribe(
    //   (res: CandidateExamState) => (this.state = res)
    // );
    this.getExams();

    const url = `${environment.baseUrl}${ApiPaths.QuestionSet}`;
    this.http.get<QuestionSet[]>(url)
      .subscribe({
        next: res => this.questionSets = res,
        error: err => console.log(err)
      })

    // let today = new Date();
    // let todayPlus10 = today;
    // todayPlus10.setDate(todayPlus10.getDate() + 10);

    this.examCreationForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['Some description!', [Validators.required, Validators.maxLength(255)]],
      validFrom: ['', [Validators.required]],
      validTill: ['', [Validators.required]],
      duration: [30, [Validators.required]],
      questionSetsExams: this.fb.array([], [Validators.required])
    });

    // this.examCreationForm.controls['validFrom'].setValue(formatDate(this.today, 'mm/dd/yyyy', 'en'));
    // this.examCreationForm.controls['validTill'].setValue(formatDate(this.today, 'mm/dd/yyyy', 'en'));

    // Open modal for exam creation and question submission forms //
    // For now do in the same page //
  }

  // get questionSetsExams():FormArray {
  //   return this.examCreationForm.controls['questionSetsExams'] as FormArray;
  // }

  onCheckChange(event) {
    const formArray: FormArray = this.examCreationForm.controls['questionSetsExams'] as FormArray;

    const questionSetExamsForm = this.fb.group({
      questionSetId: [this.questionSets[event.target.value].questionSetId]
    })
    if (event.target.checked) {

      formArray.push(questionSetExamsForm);
    } else {
      let i: number = 0;

      formArray.controls.forEach((group: FormGroup) => {

        if (group.value.questionSetId == questionSetExamsForm.value.questionSetId) {
          console.log(group.value);
          console.log(questionSetExamsForm.value);
          console.log(i);

          formArray.removeAt(i);
          return;
        }
        i++;
      })
    }
  }



  onSubmit() {
    // console.log(this.examCreationForm.value);

    let examPostDto: Exam = this.examCreationForm.value;
    examPostDto.duration = `00:${examPostDto.duration}:00`
    console.log(examPostDto);

    const url = `${environment.baseUrl}${ApiPaths.Exam}`;
    this.http.post(url, examPostDto).subscribe({
      next: res => {
        this.reset();
        this.getExams();
      },
      error: err => console.log(err)
    });

  }

  reset() {
    this.examCreationForm.reset();
    // this.questionSetsExams.clear();
  }

  getExams() {
    const url = `${environment.baseUrl}${ApiPaths.Exam}`;
    this.examListObs = this.http.get<Exam[]>(url);
  }
}
