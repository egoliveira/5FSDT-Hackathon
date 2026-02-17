import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    TextField
} from "@mui/material";
import MultipleChoiceQuestionChoiceResponse from "@/model/question/MultipleChoiceQuestionChoiceResponse";
import React, {useEffect, useState} from "react";

export default function QuestionChoiceEditDialog({
                                                     showDialog,
                                                     onClose,
                                                     questionChoice,
                                                     onEditFinished
                                                 }:
                                                 {
                                                     showDialog: boolean,
                                                     onClose: () => void,
                                                     questionChoice?: MultipleChoiceQuestionChoiceResponse,
                                                     onEditFinished: (
                                                         text: string,
                                                         isAnswer: boolean,
                                                         choice?: MultipleChoiceQuestionChoiceResponse
                                                     ) => void,
                                                 }) {
    const [text, setText] = useState<string>("");
    const [isAnswer, setIsAnswer] = useState<boolean>(false);

    const [textError, setTextError] = useState<boolean>(false);

    useEffect(() => {
        if (questionChoice) {
            setText(questionChoice.text);
            setIsAnswer(questionChoice.isAnswer);
        } else {
            setText("");
            setIsAnswer(false);
        }
    }, [questionChoice]);

    const onCancel = () => {
        setText("");
        setIsAnswer(false);

        onClose();
    }

    const onSave = () => {
        if (text.trim().length == 0) {
            setTextError(true);
        } else {
            setTextError(false);

            onEditFinished(text.trim(), isAnswer, questionChoice);
            onCancel();
        }
    }

    return (<Dialog open={showDialog}
                    onClose={onCancel}>
        <DialogTitle>
            {(questionChoice) ? 'Editar Alternativa' : 'Adicionar Alternativa'}
        </DialogTitle>
        <DialogContent>
            <FormControl fullWidth={true} error={textError}>
                <TextField variant="outlined"
                           label="Alternativa"
                           error={textError}
                           slotProps={{
                               htmlInput: {
                                   maxLength: 255
                               },
                           }}
                           sx={{
                               width: 400,
                               marginTop: 2
                           }}
                           value={text}
                           onChange={(event) => {
                               setText(event.target.value)
                           }}/>
                {textError && (<FormHelperText>Digite o texto da alternativa</FormHelperText>)}
            </FormControl>

            <Box>
                <FormControlLabel
                    label="Alternativa correta"
                    control={<Checkbox
                        checked={isAnswer}
                        onChange={(event) => setIsAnswer(event.target.checked)}/>}
                    sx={{marginTop: 2}}/>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={onSave}>
                Salvar
            </Button>
            <Button onClick={onCancel}>
                Cancelar
            </Button>
        </DialogActions>
    </Dialog>);
}

