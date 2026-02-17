import apiClient from "@/services/api";
import CreateEditExamRequest from "@/model/exam/CreateEditExamRequest";

export const createExamService = async (
    data: CreateEditExamRequest
): Promise<string> => {
    const response = await apiClient.post(`/exam`, data);

    return response.data;
}