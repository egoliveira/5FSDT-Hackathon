import apiClient from "@/services/api";
import CreateEditQuestionRequest from "@/model/question/CreateEditQuestionRequest";
import QuestionResponse from "@/model/question/QuestionResponse";

export const updateQuestionService = async (
    data: CreateEditQuestionRequest
): Promise<QuestionResponse> => {
    const response = await apiClient.patch(`/question/${data.id}`, data);

    return response.data;
}