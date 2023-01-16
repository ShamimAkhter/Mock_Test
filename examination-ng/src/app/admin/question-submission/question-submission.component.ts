import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiPaths } from 'src/app/enums/api-paths';
import { QuestionSet } from 'src/app/models/questionSet';
import { ExcerptPipe } from 'src/app/shared/pipes/excerpt.pipe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-question-submission',
  templateUrl: './question-submission.component.html',
})
export class QuestionSubmissionComponent implements OnInit {
  questionSetListObs;

  questionSetForm: FormGroup;

  // arr: QuestionSet;

  constructor(private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.getQuestionSets();


    this.questionSetForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(255)]],
      questions: this.fb.array([]),
    });
  }

  get questions(): FormArray {
    return this.questionSetForm.controls['questions'] as FormArray;
  }

  addQuestion() {
    const questionForm = this.fb.group({
      questionNumber: [null],
      questionText: ['', [Validators.required]],
      maxMarks: ['', [Validators.required]],
    });

    this.questions.push(questionForm);
  }

  removeQuestion(questionIndex: number) {
    this.questions.removeAt(questionIndex);
  }

  onSubmit() {
    let questionSetPostDto = this.questionSetForm.value;

    for (let i = 0; i < questionSetPostDto.questions.length; i++) {
      questionSetPostDto.questions[i].questionNumber = i + 1;
    }

    // console.log(this.arr);

    const url = `${environment.baseUrl}${ApiPaths.QuestionSet}`;
    this.http.post(url, questionSetPostDto).subscribe({
      next: res => {
        this.reset();
        this.getQuestionSets();
      },
      error: err=>console.log(err)
    });

  }

  reset() {
    this.questionSetForm.reset();
    this.questions.clear();
  }

  getQuestionSets() {
    const url = `${environment.baseUrl}${ApiPaths.QuestionSet}`;
    this.questionSetListObs = this.http.get<QuestionSet[]>(url);
  }
}
