import apiClient from "@/services/api";
import QuestionResponse from "@/model/question/QuestionResponse";

export const questionService = async (
    questionId: number,
): Promise<QuestionResponse> => {
    const {data} = await apiClient.get<QuestionResponse>(`/question/${questionId}`);

    return data;
}