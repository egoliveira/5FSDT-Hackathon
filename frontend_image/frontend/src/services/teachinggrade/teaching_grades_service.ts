import apiClient from "@/services/api";
import {TeachingGradeResponse} from "@/model/teachinggrade/TeachingGradeResponse";

export const teachingGradesService = async (teachingLevelId: number): Promise<TeachingGradeResponse[]> => {
    const {data} = await apiClient.get<TeachingGradeResponse[]>(`/teachinggrade/teachinglevel/${teachingLevelId}`);

    return data;
}