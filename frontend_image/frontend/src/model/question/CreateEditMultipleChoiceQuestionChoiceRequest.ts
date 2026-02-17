export default class CreateEditMultipleChoiceQuestionChoiceRequest {
    readonly id?: number;
    readonly text: string;
    readonly order: number;
    readonly isAnswer: boolean;

    constructor(id: number, text: string, order: number, isAnswer: boolean) {
        this.id = id;
        this.text = text;
        this.order = order;
        this.isAnswer = isAnswer;
    }
}