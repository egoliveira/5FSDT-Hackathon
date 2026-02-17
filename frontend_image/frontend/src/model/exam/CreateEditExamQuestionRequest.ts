export default class CreateEditExamQuestionRequest {
    readonly questionId: number;
    readonly value: number;
    readonly order: number;

    constructor(questionId: number, value: number, order: number) {
        this.questionId = questionId;
        this.value = value;
        this.order = order;
    }
}