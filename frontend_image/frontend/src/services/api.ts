import axios, {AxiosError, AxiosResponse} from 'axios';
import {ErrorMessage} from "@/model/error/ErrorMessage";
import QuestionListResponse from "@/model/question/QuestionListResponse";
import MultipleChoiceQuestionChoiceResponse from "@/model/question/MultipleChoiceQuestionChoiceResponse";
import MultipleChoiceQuestionResponse from "@/model/question/MultipleChoiceQuestionResponse";
import EssayQuestionResponse from "@/model/question/EssayQuestionResponse";
import QuestionResponse from "@/model/question/QuestionResponse";

const apiClient = axios.create({
    baseURL: process.env.API_BASE_URL ?? 'http://localhost:8080',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return fixQuestionsResponse(response);
    },
    (error: AxiosError) => {
        let errorMessage: ErrorMessage;

        // @ts-ignore
        if (error.code && error.response && error.response.data && error.response.data.message) {
            // @ts-ignore
            errorMessage = new ErrorMessage(error.status, error.response.data.message);
        } else if (error.request) {
            errorMessage = new ErrorMessage(0, "Erro ao executar a requisição. Tente novamente.");
        } else {
            errorMessage = new ErrorMessage(0, "Erro ao configurar a requisição. Tente novamente.");
        }

        return Promise.reject(errorMessage);
    }
);

function fixQuestionsResponse(response: AxiosResponse): AxiosResponse {
    if ((response.config.url == '/question') && (response.config.method == 'get')) {
        response.data = fixQuestionListResponse(response.data as QuestionListResponse);
    } else if (response.config.url?.match(/\/question\/[0-9]+/) && (response.config.method == 'get')) {
        response.data = fixQuestionResponse(response.data as QuestionResponse);
    }

    return response;
}

function fixQuestionListResponse(response: QuestionListResponse): QuestionListResponse {
    const questions = response.content;

    const fixedQuestions = questions.map(
        (question) => fixQuestionResponse(question)
    );

    return new QuestionListResponse(
        fixedQuestions,
        response.empty,
        response.first,
        response.last,
        response.number,
        response.numberOfElements,
        response.size,
        response.totalElements,
        response.totalPages,
    );
}

function fixQuestionResponse(response: QuestionResponse): QuestionResponse {
    let newQuestion: QuestionResponse;

    // @ts-ignore
    if (response.choices) {
        newQuestion = new MultipleChoiceQuestionResponse(
            response.id,
            response.subject,
            response.teachingGrade,
            response.text,
            response.createdAt,
            response.updatedAt,
            // @ts-ignore
            response.choices.map((choice) =>
                new MultipleChoiceQuestionChoiceResponse(
                    choice.id,
                    choice.text,
                    choice.order,
                    choice.isAnswer
                )
            )
        );
    } else {
        newQuestion = new EssayQuestionResponse(
            response.id,
            response.subject,
            response.teachingGrade,
            response.text,
            response.createdAt,
            response.updatedAt,
            // @ts-ignore
            response.linesToAnswer,
            // @ts-ignore
            response.answer);
    }

    return newQuestion;
}

export default apiClient;