// import { ElementRef, Injectable } from '@angular/core';

// export enum RecordingState {
//   dormant = 0,
//   start = 1,
//   stop = 2,
//   // play = 3,
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class MediaRecordingService {
//   videoRecorderRef: ElementRef;
//   videoPlayerRef: ElementRef;

//   //   videoRecorderElement: HTMLVideoElement;
//   //   videoPlayerElement: HTMLVideoElement;

//   isRecording = false;
//   mediaStream: MediaStream;
//   mediaRecorder: MediaRecorder;
//   mediaRecorderState: string;
//   chunks: BlobPart[] = [];
//   downloadUrl: string = null;

//   recorderPlayerState: RecordingState;

//   init(recorder: ElementRef, player: ElementRef, isVideo: boolean) {
//     this.recorderPlayerState = RecordingState.dormant;

//     this.videoRecorderRef = recorder;
//     this.videoPlayerRef = player;

//     let constraints = null;
//     if (isVideo) {
//       constraints = {
//         audio: true,
//         video: {
//           facingMode: 'user',
//           // width: 360,
//           // height: 360,
//         },
//       }
//     } else {
//       constraints = {
//         audio: true,
//         // video: false
//       }
//     }

//     navigator.mediaDevices
//       .getUserMedia(constraints)
//       .then((stream) => {
//         // this.videoRecorderElement = this.videoRecorderRef.nativeElement;
//         // this.videoPlayerElement = this.videoPlayerRef.nativeElement;

//         this.mediaStream = stream;
//         // this.videoRecorderElement.srcObject = this.mediaStream;
//         this.videoRecorderRef.nativeElement.srcObject = this.mediaStream;

//         console.log('stream ok!');
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   startRecording(isVideo) {
//     this.recorderPlayerState = RecordingState.start;

//     console.log('start recording!!!!');

//     this.chunks = [];

//     let options;
//     if (isVideo) {
//       options = {
//         audioBitsPerSecond :  256000,
// 	      videoBitsPerSecond : 2500000,
// 	      bitsPerSecond:       2628000,
//         mimeType: 'video/webm'
//       };
//     }
//     else {
//       options = {
//         audioBitsPerSecond :  256000,
// 	      videoBitsPerSecond : 2500000,
// 	      bitsPerSecond:       2628000,
//         mimeType: 'audio/ogg'
//       };
//     }

//     console.log(options);


//     this.mediaRecorder = new MediaRecorder(this.mediaStream, options);

//     // if(isVideo)
//     //   this.mediaRecorder = new MediaRecorder(this.mediaStream, options);
//     // else
//     //   this.mediaRecorder = new MediaRecorder(this.mediaStream);


//     this.mediaRecorder.start();

//     this.mediaRecorderState = this.mediaRecorder.state;
//     this.isRecording = !this.isRecording;

//     this.onDataAvailableEvent();
//     this.onRecordingStopEvent();
//   }

//   stopRecording() {
//     this.recorderPlayerState = RecordingState.stop;

//     this.mediaRecorder.stop();
//     this.mediaRecorderState = this.mediaRecorder.state;
//     this.isRecording = !this.isRecording;
//   }

//   playRecording() {
//     if (!this.chunks || !this.chunks.length) {
//       console.log(this.chunks);
//       console.log('Cannot play!!!!!');
//       return;
//     }
//     // this.recordingState = RecordingState.play;
//     this.videoPlayerRef.nativeElement.play();
//     console.log(this.chunks.length);
//   }

//   // Events
//   onDataAvailableEvent() {
//     console.log('Data available');

//     try {
//       this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
//         if (event.data && event.data.size > 0) {
//           this.chunks.push(event.data);
//           console.log('blob Size', event.data.size);
//         }
//       };
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   onRecordingStopEvent() {
//     try {
//       this.mediaRecorder.onstop = (event: Event) => {
//         const videoBlob = new Blob(this.chunks, { type: 'video/webm' });
//         this.downloadUrl = window.URL.createObjectURL(videoBlob);
//         this.videoPlayerRef.nativeElement.src = this.downloadUrl;
//       };
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }
