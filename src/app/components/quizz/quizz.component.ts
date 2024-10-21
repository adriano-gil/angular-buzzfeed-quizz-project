import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{

    title:string = ""

    questions:any
    questionSelected:any

    answers:string[] = []
    answerSelected:string = ""

    questionIndex:number = 0
    questionMaxInder:number = 0

    finished:boolean = false

    constructor() {}


    ngOnInit(): void {
        if(quizz_questions){
            this.finished = false
            this.title = quizz_questions.title

            this.questions = quizz_questions.questions
            this.questionSelected = this.questions[this.questionIndex]

            this.questionIndex = 0
            this.questionMaxInder = this.questions.length

            console.log(this.questionIndex)
            console.log(this.questionMaxInder)
        }
    }

    playerChoose(value:string){
        this.answers.push(value)
        this.nextStep()


    }

    async nextStep() {
        this.questionIndex += 1

        if (this.questionMaxInder > this.questionIndex) {
            this.questionSelected = this.questions [this.questionIndex]
        } else {
            const finalAnswer:string = await this.checkResult(this.answers)
            this.finished = true
            this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]

        }
    }

    async checkResult(answers:string[]) {
        const result = answers.reduce((previous, current, i, arr) => {
            if (
                arr.filter(item => item === previous).length >
                arr.filter(item => item === previous).length
            ){
                return previous
            } else {
                return current
            }
        })
        return result
    }

    resetQuiz() {
        this.finished = false; 
        this.answers = [];
        this.answerSelected = "";
        this.questionIndex = 0;


        this.questionSelected = this.questions[this.questionIndex];
    }
}
