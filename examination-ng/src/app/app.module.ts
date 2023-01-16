import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidateExamStore } from './services/candidate-exam-store';
import { HomeComponent } from './home/home.component';
import { CandidateLoginComponent } from './candidate-login/candidate-login.component';
import { CandidateRegisterComponent } from './candidate-register/candidate-register.component';
import { ExamTakingComponent } from './exam-taking/exam-taking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidateComponent } from './candidate/candidate.component';
import { ExamRegistrationComponent } from './exam-registration/exam-registration.component';
import { VoiceRecognitionService } from './services/voice-recognition.service';
import { MediaRecordingService } from './services/media-recording.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CandidateLoginComponent,
    CandidateRegisterComponent,
    ExamTakingComponent,
    CandidateComponent,
    ExamRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CandidateExamStore,
    VoiceRecognitionService,
    MediaRecordingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
