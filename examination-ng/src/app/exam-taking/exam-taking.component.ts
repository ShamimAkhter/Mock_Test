import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths';
import { Answer, AnswerDto } from '../models/answer';
import { CandidateExam } from '../models/candidateExam';
import { QuestionSet } from '../models/questionSet';
import { CandidateExamStore } from '../services/candidate-exam-store';
import { MediaRecordingService, RecordingState } from '../services/media-recording.service';
import { VoiceRecognitionService } from '../services/voice-recognition.service';

@Component({
  selector: 'app-exam-taking',
  templateUrl: './exam-taking.component.html',
})
export class ExamTakingComponent implements OnInit, AfterViewInit , OnDestroy{

  // modelOpen = false;


  questionCount = 0;

  questionsSkipped = 0;

  minsRemaining;
  examExpired = false
  interval;

  submitDisable = false;

  isRecording = false;

  @ViewChild('recorder') videoRecorderRef: ElementRef;
  @ViewChild('player') videoPlayerRef: ElementRef;

  @ViewChild('final') final: ElementRef;
  @ViewChild('interim') interim: ElementRef;

  videoSize = {
    width: 480,
    height: 300
  }

  constructor(
    private router: Router,
    public store: CandidateExamStore,
    private http: HttpClient,
    private recognition: VoiceRecognitionService,
    public recording: MediaRecordingService
  ) { }


  ngOnInit(): void {
    if (this.store.state.exam === null) {
      this.router.navigate(['home']);
      alert('No exam selected. Select an exam from the Home page.');
      return;
    }

    if (!(this.store.isCandidateRegistered && (this.store.state.questionSet !== null))) {
      this.router.navigate(['exam-register']);
      alert('First register for exam.');
      return;
    }

    if (this.store.state.currentCandidateExam === null) {
      this.router.navigate(['exam-register']);
      alert('First appear for exam.');
      return;
    }



    // set timer and validate expiration status
    this.examTimerAndExamExpiration();
    if (this.examExpired)
      return;


    // remove already answered questions from questionSet.questions
    // take help from currentCandidateExam
    let revisedQuestionSet = new QuestionSet({
      questionSetId: this.store.state.questionSet.questionSetId,
      name: this.store.state.questionSet.name,
      description: this.store.state.questionSet.description,
      questions: []
    });

    let questions = this.store.state.questionSet.questions;
    let answers = this.store.state.currentCandidateExam.answers;

    let match = false;
    questions.forEach(question => {
      answers.forEach(answer => {
        if (question.questionId === answer.questionId) {
          match = true;
        }
      })
      if (match === false) {
        revisedQuestionSet.questions.push(question);
      }
      match = false;
    });
    // console.log(revisedQuestionSet);
    this.store.setQuestionSet(revisedQuestionSet);


    // Set First Question:
    this.store.setCurrentQuestion(this.store.state.questionSet.questions[this.questionCount]);
    this.questionCount++;



    // initialize recognition service
    this.recognition.init(this.final, this.interim);

  }


  ngAfterViewInit(): void {
    if (this.examExpired)
      return;

    this.recognition.init(this.final, this.interim);

    if (this.store.state.isVideo === true)
      this.recording.init(this.videoRecorderRef, this.videoPlayerRef, this.store.state.isVideo);


  }

  startStopRecording() {

    this.isRecording = !this.isRecording;

    if (this.isRecording === true) {
      this.recognition.startRecognition();
      this.recording.startRecording(this.store.state.isVideo);
    } else {
      this.recognition.stopRecognition();
      this.recording.stopRecording();
      let answer = new Answer({
        examId: this.store.state.exam.examId,
        candidateId: this.store.state.candidate.candidateId,
        questionId: this.store.state.currentQuestion.questionId,
        answerText: this.recognition.final_transcript,
      });
      this.store.setCurrentAnswer(answer);
    }
  }

  resetAnswer() {
    this.store.setCurrentAnswer(null);

    this.recognition.final_transcript = '';
    this.final.nativeElement.innerHTML = '';
    this.interim.nativeElement.innerHTML = '';

    this.recording.chunks = [];
  }

  skipQuestion() {
    if (this.questionCount < this.store.state.questionSet.questions.length) {
      this.questionsSkipped++;
      this.store.setCurrentQuestion(this.store.state.questionSet.questions[this.questionCount]);
      this.questionCount++;

      this.resetAnswer();
    }
  }

  submit() {
    // submit and on success bring next question and call reset

    this.recording.recorderPlayerState = RecordingState.dormant;

    if (this.recording.chunks.length === 0) {
      console.log('No BlobPart to submit!');
      return;
    }
    if (this.recognition.final_transcript.length === 0) {
      console.log('No Text to submit!');
      return;
    }

    if (this.store.state.currentAnswer === null) {
      console.log('Answer state is null');
      return;
    }

    let answerDto = new AnswerDto({
      examId: this.store.state.currentAnswer.examId,
      candidateId: this.store.state.currentAnswer.candidateId,
      questionId: this.store.state.currentAnswer.questionId,
      answerText: this.store.state.currentAnswer.answerText,
    });
    answerDto.answerFile = new Blob(this.recording.chunks, { type: 'video/webm' });

    // console.log(answerDto);

    const formData = new FormData();
    for (let key in answerDto) formData.append(key, answerDto[key]);

    console.log(formData);

    const url = `${environment.baseUrl}${ApiPaths.Answer}`;
    this.http.post(url, formData)
      .subscribe({
        next: res => {
          this.resetAnswer();

          // next question logic here
          this.store.setCurrentQuestion(this.store.state.questionSet.questions[this.questionCount]);
          this.questionCount++;
        },
        error: err => console.log(err)
      })

  }
  examTimerAndExamExpiration() {
    // Timer logic
    const examEndTime = (new Date(Date.parse(this.store.state.currentCandidateExam.endTime))).getTime();

    this.interval =  setInterval(() => {

      const timeNow = (new Date(Date.now())).getTime();

      let diff = examEndTime - timeNow;
      if (diff <= 0)
        diff = 0;

      let msec = diff;
      let hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;
      let mm = Math.floor(msec / 1000 / 60);
      msec -= mm * 1000 * 60;
      let ss = Math.floor(msec / 1000);
      msec -= ss * 1000;

      // this.minsRemaining = `${hh}:${mm}:${ss}:${msec}`;
      this.minsRemaining = `${hh}:${mm}:${ss} hh:mm:ss`;

      if (hh === 0 && mm === 0 && ss === 0)
        this.examExpired = true;
    }, 1000)
  }









  ngOnDestroy(): void {
    clearTimeout(this.interval);
  }
}
