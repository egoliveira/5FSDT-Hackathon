import apiClient from "@/services/api";
import {TeachingLevelResponse} from "@/model/teachinglevel/TeachingLevelResponse";

export const teachingLevelsService = async (): Promise<TeachingLevelResponse[]> => {
    const {data} = await apiClient.get<TeachingLevelResponse[]>(`/teachinglevel`);

    return data;
}