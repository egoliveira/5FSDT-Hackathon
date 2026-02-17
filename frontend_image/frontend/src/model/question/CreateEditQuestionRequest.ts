import CreateEditMultipleChoiceQuestionChoiceRequest
    from "@/model/question/CreateEditMultipleChoiceQuestionChoiceRequest";

export default class CreateEditQuestionRequest {
    readonly id: number;
    readonly subjectId: number;
    readonly teachingGradeId: number;
    readonly text: string;
    readonly choices?: CreateEditMultipleChoiceQuestionChoiceRequest[];
    readonly answer?: string;
    readonly linesToAnswer?: number;

    constructor(id: number, subjectId: number, teachingGradeId: number, text: string, choices: CreateEditMultipleChoiceQuestionChoiceRequest[], answer: string, linesToAnswer: number) {
        this.id = id;
        this.subjectId = subjectId;
        this.teachingGradeId = teachingGradeId;
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.linesToAnswer = linesToAnswer;
    }
}