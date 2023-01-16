import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExcerptPipe } from './pipes/excerpt.pipe';
import { SharedRoutingModule } from './shared-routing.module';
import { StateStatusComponent } from './state-status/state-status.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

@NgModule({
  declarations: [ExcerptPipe, StateStatusComponent, AccessDeniedComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [ExcerptPipe],
})
export class SharedModule {}
