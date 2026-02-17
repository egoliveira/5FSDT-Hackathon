import apiClient from "@/services/api";
import {PageSize} from "@/model/exam/PageSize";

export const downloadExamService = async (
    examId: number,
    pageSize: PageSize,
    examCopies: number
): Promise<BlobPart> => {
    const response = await apiClient.get(`/exam/${examId}/document`,
        {
            params: {
                pageSize: pageSize,
                examCopies: examCopies
            },
            responseType: "blob"
        });

    return response.data;
}