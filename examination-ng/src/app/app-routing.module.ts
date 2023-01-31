import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CandidateLoginComponent } from './candidate-login/candidate-login.component';
import { CandidateRegisterComponent } from './candidate-register/candidate-register.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateGuardGuard } from './services/candidate-guard.guard';
import { ExamRegistrationComponent } from './exam-registration/exam-registration.component';
import { ExamTakingComponent } from './exam-taking/exam-taking.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'candidate',
    component: CandidateComponent,
    canActivate: [CandidateGuardGuard],
  },
  { path: 'login', component: CandidateLoginComponent },
  { path: 'register', component: CandidateRegisterComponent },
  {
    path: 'exam-register',
    component: ExamRegistrationComponent,
    canActivate: [CandidateGuardGuard],
  },
  {
    path: 'exam-taking',
    component: ExamTakingComponent,
    canActivate: [CandidateGuardGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
