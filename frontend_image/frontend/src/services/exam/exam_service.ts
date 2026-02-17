import apiClient from "@/services/api";
import ExamResponse from "@/model/exam/ExamResponse";

export const examService = async (
    examId: number
): Promise<ExamResponse> => {
    const {data} = await apiClient.get<ExamResponse>(`/exam/${examId}`);

    return data;
}