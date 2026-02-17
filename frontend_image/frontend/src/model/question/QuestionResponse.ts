import {SubjectResponse} from "@/model/subject/SubjectResponse";
import {TeachingGradeResponse} from "@/model/teachinggrade/TeachingGradeResponse";

export default abstract class QuestionResponse {
    readonly id: number;
    readonly subject: SubjectResponse;
    readonly teachingGrade: TeachingGradeResponse;
    readonly text: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(id: number, subject: SubjectResponse, teachingGrade: TeachingGradeResponse, text: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.subject = subject;
        this.teachingGrade = teachingGrade;
        this.text = text;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

