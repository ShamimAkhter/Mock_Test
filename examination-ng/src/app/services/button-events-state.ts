export class ButtonEventsState {

  recording: 'unknown' | 'start' | 'pause' | 'resume' | 'stop'

  public constructor(init?: Partial<ButtonEventsState>) {
    Object.assign(this, init);
  }
}
