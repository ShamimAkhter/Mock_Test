import { Injectable } from '@angular/core';
import { Answer, AnswerDto } from '../models/answer';
import { Candidate } from '../models/candidate';
import { CandidateExam } from '../models/candidateExam';
import { Exam } from '../models/exam';
import { Question } from '../models/question';
import { QuestionSet } from '../models/questionSet';
import { CandidateExamState } from './candidate-exam-state';
import { Store } from './store';

@Injectable()
export class CandidateExamStore extends Store<CandidateExamState> {
  constructor() {
    super(
      new CandidateExamState({
        candidate: null,
        exam: null,
        questionSet: null,
        isVideo: false,
        currentQuestion: null,
        currentAnswer: null,
        currentCandidateExam: null,

        transcript: null,
        answerFile:null
      })
    );
  }

  setCandidate(candidate: Candidate) {
    this.setState({
      ...this.state,
      candidate: candidate,
    });
    // this.setState({
    //   this.state.candidate.candidatesExams = candidate.candidatesExams
    // });
  }

  setExam(exam: Exam) {
    this.setState({
      ...this.state,
      exam: exam,
    });
  }

  setQuestionSet(questionSet: QuestionSet) {
    this.setState({
      ...this.state,
      questionSet: questionSet,
    });
  }

  setVideoMode(val: boolean) {
    this.setState({
      ...this.state,
      isVideo: val
    })
  }

  setCurrentCandidateExam(candidateExam: CandidateExam) {
    this.setState({
      ...this.state,
      currentCandidateExam: candidateExam
    })
  }

  setCurrentQuestion(question: Question) {
    this.setState({
      ...this.state,
      currentQuestion: question
    })
  }

  setCurrentAnswer(answer: Answer) {
    this.setState({
      ...this.state,
      // answers: [...this.state.answers, answer],
      currentAnswer: answer,
    });
  }

  setCurrentAnswerDto(answerDto: AnswerDto) {
    this.setState({
      ...this.state,
      // answers: [...this.state.answers, answer],
      currentAnswerDto: answerDto,
    });
  }

  setTranscript(transcript: string) {
    this.setState({
      ...this.state,
      transcript: transcript
    });
  }

  setAnswerFile(answerFile: Blob) {
    this.setState({
      ...this.state,
      answerFile: answerFile
    });
  }


  get isCandidateRegistered(): boolean {
    if (this.state.candidate === null)
      return false;

    if (this.state.exam === null)
      return false;

    let candidateExam = this.state.candidate.candidatesExams.find((candidateExam: CandidateExam) => {
      // console.log(candidateExam.examId === this.state.exam.examId);
      return candidateExam.examId === this.state.exam.examId;
    });

    // console.log(candidateExam);

    if (candidateExam === undefined)
      return false;

    // this.setQuestionSet(new QuestionSet({questionSetId: }))
    return true;
  }

}
