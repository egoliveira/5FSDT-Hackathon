import QuestionResponse from "@/model/question/QuestionResponse";
import {SubjectResponse} from "@/model/subject/SubjectResponse";
import {TeachingGradeResponse} from "@/model/teachinggrade/TeachingGradeResponse";
import MultipleChoiceQuestionChoiceResponse from "@/model/question/MultipleChoiceQuestionChoiceResponse";

export default class MultipleChoiceQuestionResponse extends QuestionResponse {
    readonly choices: MultipleChoiceQuestionChoiceResponse[];

    constructor(id: number, subject: SubjectResponse, teachingGrade: TeachingGradeResponse, text: string, createdAt: Date, updatedAt: Date, choices: MultipleChoiceQuestionChoiceResponse[]) {
        super(id, subject, teachingGrade, text, createdAt, updatedAt);

        this.choices = choices;
    }
}