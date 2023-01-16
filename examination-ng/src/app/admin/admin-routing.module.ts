import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ExamCreationComponent } from './exam-creation/exam-creation.component';
import { QuestionSubmissionComponent } from './question-submission/question-submission.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'exam-create', component: ExamCreationComponent
  },
  { path: 'question-submit', component: QuestionSubmissionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
