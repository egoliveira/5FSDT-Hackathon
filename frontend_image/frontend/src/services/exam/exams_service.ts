import apiClient from "@/services/api";
import ExamListRequestParams from "@/model/exam/ExamListRequestParams";
import ExamListResponse from "@/model/exam/ExamListResponse";

export const examsService = async (
    page: number | undefined,
    pageSize: number | undefined
): Promise<ExamListResponse> => {
    const params = new ExamListRequestParams(
        page === undefined ? 0 : page,
        pageSize === undefined ? 10 : pageSize
    )

    const {data} = await apiClient.get<ExamListResponse>('/exam', {params: params});

    return data;
}