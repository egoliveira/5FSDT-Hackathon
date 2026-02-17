import QuestionResponse from "@/model/question/QuestionResponse";
import {Box, Typography} from "@mui/material";
import React from "react";
import ExamQuestionResponse from "@/model/exam/ExamQuestionResponse";

export default function QuestionStatement({question, showAnswer, onClick}: {
    question: QuestionResponse | ExamQuestionResponse,
    showAnswer?: boolean,
    onClick?: () => void,
}) {
    let questionOrder = "";
    let questionDef: QuestionResponse;

    // @ts-ignore
    if (question.question) {
        // @ts-ignore
        questionOrder = `${question.order}) `;
        // @ts-ignore
        questionDef = question.question as QuestionResponse;
    } else {
        questionDef = question as QuestionResponse;
    }

    return (<Box onClick={onClick} sx={{width: '100%'}}>
        <Typography
            variant="body1"
            sx={{whiteSpace: 'pre-line'}}>
            {questionOrder}
            {questionDef.text.replaceAll("\\n", "\n")}
        </Typography>


        {// @ts-ignore
            (questionDef.choices) &&
            // @ts-ignore
            questionDef.choices.sort((q1, q2) => q1.order - q2.order)
                // @ts-ignore
                .map((choice, index) => (
                    <Typography
                        variant="body1"
                        fontWeight={((choice.isAnswer) && (showAnswer) ? 'bold' : 'normal')}
                        key={choice.id}>
                        &nbsp;&nbsp;&nbsp;&nbsp;{String.fromCharCode(65 + index)}) {choice.text}
                    </Typography>))}

        {
            // @ts-ignore
            (!questionDef.choices) && (showAnswer) && (
                <Box>
                    <Typography variant="body1"
                                fontStyle="italic"
                                sx={{marginTop: 2}}>Resposta:</Typography>
                    <Typography variant="body1">&nbsp;</Typography>
                    <Typography variant="body1"
                                sx={{whiteSpace: 'pre-line'}}>
                        {// @ts-ignore
                            questionDef.answer.replaceAll("\\n", "\n")
                        }
                    </Typography>
                </Box>
            )}
    </Box>);
}