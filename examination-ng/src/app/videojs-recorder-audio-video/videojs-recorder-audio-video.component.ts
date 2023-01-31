import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef
} from '@angular/core';

import videojs from 'video.js';
// import * as adapter from 'webrtc-adapter/out/adapter_no_global.js';
import adapter from 'webrtc-adapter/out/adapter_no_global.js';
// import * as RecordRTC from 'recordrtc';
import RecordRTC from 'recordrtc';

/*
// Required imports when recording audio-only using the videojs-wavesurfer plugin
import * as WaveSurfer from 'wavesurfer.js';
import * as MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;

// Register videojs-wavesurfer plugin
import * as Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
*/

// register videojs-record plugin with this import
// import * as Record from 'videojs-record/dist/videojs.record.js';
import Record from 'videojs-record/dist/videojs.record.js';
import { ButtonEventsStore } from '../services/button-events-store';
import { AnswerDto } from '../models/answer';
import { CandidateExamStore } from '../services/candidate-exam-store';

@Component({
  selector: 'app-videojs-recorder-audio-video',
  templateUrl: './videojs-recorder-audio-video.component.html',
  styleUrls: ['./videojs-recorder-audio-video.component.scss']
})
export class VideojsRecorderAudioVideoComponent implements OnInit, OnDestroy {

  // reference to the element itself: used to access events and methods
  private _elementRef: ElementRef

  // index to create unique ID for component
  idx = 'clip1';

  private config: any;
  private player: any;
  private plugin: any;

  // constructor initializes our declared vars
  constructor(elementRef: ElementRef, public storeButton: ButtonEventsStore
    , public store: CandidateExamStore) {
    this.player = false;

    // save reference to plugin (so it initializes)
    this.plugin = Record;

    // video.js configuration
    this.config = {
      controls: true,
      autoplay: false,
      fluid: false,
      loop: false,
      width: 480,
      height: 320,
      bigPlayButton: false,
      controlBar: {
        volumePanel: false,
        fullscreenToggle: false,
        recordIndicator: true,
        recordToggle: false,
        playToggle: true
      },
      plugins: {
        /*
        // wavesurfer section is only needed when recording audio-only
        wavesurfer: {
            backend: 'WebAudio',
            waveColor: '#36393b',
            progressColor: 'black',
            debug: true,
            cursorWidth: 1,
            displayMilliseconds: true,
            hideScrollbar: true,
            plugins: [
                // enable microphone plugin
                WaveSurfer.microphone.create({
                    bufferSize: 4096,
                    numberOfInputChannels: 1,
                    numberOfOutputChannels: 1,
                    constraints: {
                        video: false,
                        audio: true
                    }
                })
            ]
        },
        */
        // configure videojs-record plugin
        record: {
          maxLength: 300,
          audio: true,
          video: true,
          debug: true
        }
      }
    };
  }

  buttonStore;
  recorderType;

  ngOnInit() { }

  // use ngAfterViewInit to make sure we initialize the videojs element
  // after the component template itself has been rendered
  ngAfterViewInit() {
    // ID with which to access the template's video element
    let el = 'video_' + this.idx;

    // setup the player via the unique element ID
    this.player = videojs(document.getElementById(el), this.config, () => {
      console.log('player ready! id:', el);

      // print version information at startup
      var msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-record ' + videojs.getPluginVersion('record') +
        ' and recordrtc ' + RecordRTC.version;
      videojs.log(msg);
    });

    // device is ready
    this.player.on('deviceReady', () => {
      console.log('device is ready!');
    });

    // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---


    // user clicked the record button and started recording
    this.player.on('startRecord', () => {
      console.log('started recording!');
    });

    // user completed recording and stream is available
    this.player.on('finishRecord', () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log('finished recording: ', this.player.recordedData);

      //--- * ---
      // let answerDto = new AnswerDto({
      //   examId: this.store.state.currentAnswer.examId,
      //   candidateId: this.store.state.currentAnswer.candidateId,
      //   questionId: this.store.state.currentAnswer.questionId,
      //   answerText: this.store.state.currentAnswer.answerText,
      // });

      // answerDto.answerFile = new Blob(this.player.recordedData, { type: 'video/webm' });
      // answerDto.answerFile = this.player.recordedData;

      // this.store.setCurrentAnswerDto(answerDto);
      this.store.setAnswerFile(this.player.recordedData);
      //--- * ---


    });

    // ---------

    setTimeout(() => {
      this.player.record().getDevice();
    }, 2000);

    // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

    // error handling
    this.player.on('error', (element, error) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });


    // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

    this.buttonStore = this.storeButton.state$.subscribe({
      next: val => {
        if (val.recording === 'unknown') {
          // console.log('unknown---');
          // this.player.record().getDevice();
          // this.recorderType = this.player.record().getRecordType();
        }
        if (val.recording === 'start') {
          console.log('start---');
          this.player.record().start();
        }
        if (val.recording === 'pause') {
          console.log('pause---');
          this.player.record().pause();
        }
        if (val.recording === 'resume') {
          console.log('resume---');
          this.player.record().resume();
        }
        if (val.recording === 'stop') {
          console.log('stop---');
          this.player.record().stop();
        }
      }
    });
  }

  // use ngOnDestroy to detach event handlers and remove the player
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
      this.player = false;
    }

    this.storeButton.setRecordingState('unknown');

    this.buttonStore.unsubscribe();
  }
}

