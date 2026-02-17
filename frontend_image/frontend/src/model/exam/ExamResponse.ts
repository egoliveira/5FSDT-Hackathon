import {SubjectResponse} from "@/model/subject/SubjectResponse";
import {TeacherResponse} from "@/model/teacher/TeacherResponse";
import {TeachingGradeResponse} from "@/model/teachinggrade/TeachingGradeResponse";
import ExamQuestionResponse from "@/model/exam/ExamQuestionResponse";

export default class ExamResponse {
    readonly id: number;
    readonly subject: SubjectResponse;
    readonly teacher: TeacherResponse;
    readonly teachingGrade: TeachingGradeResponse;
    readonly classOfStudents: string;
    readonly date: string;
    readonly randomQuestionsOrder: boolean;
    readonly questions: ExamQuestionResponse[]
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(id: number, subject: SubjectResponse, teacher: TeacherResponse, teachingGrade: TeachingGradeResponse, classOfStudents: string, date: string, randomQuestionsOrder: boolean, questions: ExamQuestionResponse[], createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.subject = subject;
        this.teacher = teacher;
        this.teachingGrade = teachingGrade;
        this.classOfStudents = classOfStudents;
        this.date = date;
        this.randomQuestionsOrder = randomQuestionsOrder;
        this.questions = questions;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}