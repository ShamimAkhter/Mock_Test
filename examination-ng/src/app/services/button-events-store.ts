import { Injectable } from '@angular/core';
import { ButtonEventsState } from './button-events-state';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class ButtonEventsStore extends Store<ButtonEventsState>{

  constructor() {
    super(
      new ButtonEventsState({
        recording: 'unknown'
      })
    );
  }

  setRecordingState(recording: 'unknown' | 'start' | 'pause' | 'resume' | 'stop') {
    this.setState({
      ...this.state,
      recording: recording,
    });
  }
}
