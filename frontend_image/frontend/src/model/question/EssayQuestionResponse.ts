import QuestionResponse from "@/model/question/QuestionResponse";
import {SubjectResponse} from "@/model/subject/SubjectResponse";
import {TeachingGradeResponse} from "@/model/teachinggrade/TeachingGradeResponse";

export default class EssayQuestionResponse extends QuestionResponse {
    readonly linesToAnswer: number;
    readonly answer: string;

    constructor(id: number, subject: SubjectResponse, teachingGrade: TeachingGradeResponse, text: string,
                createdAt: Date, updatedAt: Date, linesToAnswer: number, answer: string) {
        super(id, subject, teachingGrade, text, createdAt, updatedAt);

        this.linesToAnswer = linesToAnswer;
        this.answer = answer;
    }
}