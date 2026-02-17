import apiClient from "@/services/api";
import QuestionListResponse from "@/model/question/QuestionListResponse";

export const questionsService = async (
    subjectId: number,
    teachingGradeId: number,
    page?: number,
    pageSize?: number
): Promise<QuestionListResponse> => {
    const {data} = await apiClient.get<QuestionListResponse>(`/question`, {
        params: {
            subjectId: subjectId,
            teachingGradeId: teachingGradeId,
            page: page,
            pageSize: pageSize,
        }
    });

    return data;
}