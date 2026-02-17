import apiClient from "@/services/api";
import {TeacherResponse} from "@/model/teacher/TeacherResponse";

export const teachersService = async (): Promise<TeacherResponse[]> => {
    const {data} = await apiClient.get<TeacherResponse[]>(`/teacher`);

    return data;
}