import QuestionResponse from "@/model/question/QuestionResponse";

export default class ExamQuestionResponse {
    readonly id: number;
    readonly examId: number;
    readonly question: QuestionResponse;
    readonly order: number;
    readonly value: number;

    constructor(id: number, examId: number, question: QuestionResponse, order: number, value: number) {
        this.id = id;
        this.examId = examId;
        this.question = question;
        this.order = order;
        this.value = value;
    }
}