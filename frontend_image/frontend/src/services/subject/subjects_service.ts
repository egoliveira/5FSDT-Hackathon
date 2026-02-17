import apiClient from "@/services/api";
import {SubjectResponse} from "@/model/subject/SubjectResponse";

export const subjectsService = async (): Promise<SubjectResponse[]> => {
    const {data} = await apiClient.get<SubjectResponse[]>(`/subject`);

    return data;
}