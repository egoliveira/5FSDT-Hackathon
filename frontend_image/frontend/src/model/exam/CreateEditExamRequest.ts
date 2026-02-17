import CreateEditExamQuestionRequest from "@/model/exam/CreateEditExamQuestionRequest";

export default class CreateEditExamRequest {
    readonly examId: number | undefined;
    readonly subjectId: number;
    readonly teacherId: number;
    readonly teachingGradeId: number;
    readonly classOfStudents: string;
    readonly date: Date;
    readonly randomQuestionsOrder: boolean;
    readonly questions: CreateEditExamQuestionRequest[];

    constructor(examId: number | undefined, subjectId: number, teacherId: number, teachingGradeId: number, classOfStudents: string, date: Date, randomQuestionsOrder: boolean, questions: CreateEditExamQuestionRequest[]) {
        this.examId = examId;
        this.subjectId = subjectId;
        this.teacherId = teacherId;
        this.teachingGradeId = teachingGradeId;
        this.classOfStudents = classOfStudents;
        this.date = date;
        this.randomQuestionsOrder = randomQuestionsOrder;
        this.questions = questions;
    }
}