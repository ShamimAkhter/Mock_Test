// import { ElementRef, Injectable } from '@angular/core';

// declare var webkitSpeechRecognition: any;

// @Injectable({
//   providedIn: 'root',
// })
// export class VoiceRecognitionService {
//   speechRecognition = new webkitSpeechRecognition();
//   final_transcript = '';


//   init(final:ElementRef, interim:ElementRef) {
//     this.speechRecognition.continuous = true;
//     this.speechRecognition.interimResults = true;

//     this.speechRecognition.onstart = () => {
//       console.log('Speech Recognition Start');
//     };
//     this.speechRecognition.onerror = () => {
//       console.log('Speech Recognition Error');
//     };
//     this.speechRecognition.onend = () => {
//       console.log('Speech Recognition Ended');
//     };
//     this.speechRecognition.onresult = (event) => {
//       let interim_transcript = '';

//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         if (event.results[i].isFinal) {
//           this.final_transcript += event.results[i][0].transcript;
//         } else {
//           interim_transcript += event.results[i][0].transcript;
//         }
//       }

//       final.nativeElement.innerHTML = this.final_transcript;
//       interim.nativeElement.innerHTML = interim_transcript;
//     };
//   }

//   startRecognition() {
//     this.final_transcript = '';
//     this.speechRecognition.start();
//   }

//   stopRecognition() {
//     this.speechRecognition.stop();
//     console.log(this.final_transcript);

//   }
// }
