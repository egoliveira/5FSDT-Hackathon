import apiClient from "@/services/api";
import CreateEditExamRequest from "@/model/exam/CreateEditExamRequest";
import ExamResponse from "@/model/exam/ExamResponse";

export const updateExamService = async (
    data: CreateEditExamRequest
): Promise<ExamResponse> => {
    const response = await apiClient.patch(`/exam/${data.examId}`, data);

    return response.data;
}