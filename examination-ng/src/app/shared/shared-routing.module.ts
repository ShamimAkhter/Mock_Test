import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { StateStatusComponent } from './state-status/state-status.component';

const routes: Routes = [
  { path: '', redirectTo: 'state', pathMatch: 'full' },
  { path: 'state', component: StateStatusComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
