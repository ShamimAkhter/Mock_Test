import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonEventsStore } from '../services/button-events-store';
import { CandidateExamStore } from '../services/candidate-exam-store';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-voice-recognition',
  templateUrl: './voice-recognition.component.html',
  styleUrls: ['./voice-recognition.component.scss']
})
export class VoiceRecognitionComponent implements OnInit, AfterViewInit, OnDestroy {
  speechRecognition = new webkitSpeechRecognition();
  final_transcript = '';

  @ViewChild('final') final: ElementRef;
  @ViewChild('interim') interim: ElementRef;

  constructor(
    public store: CandidateExamStore,
    public storeButton: ButtonEventsStore,
  ) { }


  buttonStore;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.speechRecognition.continuous = true;
    this.speechRecognition.interimResults = true;

    this.speechRecognition.onstart = () => {
      console.log('Speech Recognition Start');
    };
    this.speechRecognition.onerror = () => {
      console.log('Speech Recognition Error');
    };
    this.speechRecognition.onend = () => {
      console.log('Speech Recognition Ended');
    };
    this.speechRecognition.onresult = (event) => {
      let interim_transcript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }

      this.final.nativeElement.innerHTML = this.final_transcript;
      this.interim.nativeElement.innerHTML = interim_transcript;
    };

    this.buttonStore = this.storeButton.state$.subscribe({
      next: val => {

        if (val.recording === 'start') {
          this.final_transcript = '';
          this.speechRecognition.start();
        }
        if (val.recording === 'pause') {
        }
        if (val.recording === 'resume') {
        }
        if (val.recording === 'stop') {
          this.speechRecognition.stop();
          this.store.setTranscript(this.final_transcript);
        }

      }
    });

  }


  ngOnDestroy(): void {
    this.storeButton.setRecordingState('unknown');

    this.buttonStore.unsubscribe();
  }

}
