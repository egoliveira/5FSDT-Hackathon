import apiClient from "@/services/api";
import CreateEditQuestionRequest from "@/model/question/CreateEditQuestionRequest";

export const createQuestionService = async (
    data: CreateEditQuestionRequest
): Promise<string> => {
    const response = await apiClient.post(`/question`, data);

    return response.data;
}