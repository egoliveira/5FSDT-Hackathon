import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import ExamResponse from "@/model/exam/ExamResponse";
import {PageSize} from "@/model/exam/PageSize";
import NumberSpinner from "@/components/NumberField";

export default function DownloadExamDialog({
                                               showDialog,
                                               exam,
                                               onDownloadExam,
                                               onClose,
                                           }: {
    showDialog: boolean,
    exam: ExamResponse,
    onDownloadExam: (exam: ExamResponse, pageSize: PageSize, copies: number) => void,
    onClose: () => void,
}) {
    const [pageSize, setPageSize] = useState<PageSize>(PageSize.A4);
    const [copies, setCopies] = useState<number>(1);

    let maxCopies = 1;

    if (exam.randomQuestionsOrder) {
        for (let i = 1; i <= exam.questions.length; i++) {
            maxCopies *= maxCopies * i;
        }
    }

    const close = () => {
        onClose();

        setPageSize(PageSize.A4);
        setCopies(1);
    }

    return (<Dialog open={showDialog}
                    onClose={() => close()}>
        <DialogTitle>
            Baixar Avaliação
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                <Typography variant="subtitle2" sx={{
                    color: '#000'
                }} component="div">
                    Tamaho da Página
                </Typography>
                <Select variant="outlined"
                        inputProps={{
                            name: 'pageSizeField',
                            id: 'pageSizeField',
                        }}
                        sx={{marginTop: 1}}
                        value={pageSize}
                        onChange={(event) => setPageSize(event.target.value)}>
                    <MenuItem value={PageSize.A4}>A4</MenuItem>
                    <MenuItem value={PageSize.LETTER}>Carta</MenuItem>
                </Select>

                {(maxCopies > 1) && (
                    <NumberSpinner size="small"
                                   min={1}
                                   max={maxCopies}
                                   step={1}
                                   label="Variações"
                                   sx={{marginTop: 2}}
                                   value={copies}
                                   onValueChange={(event) => {
                                       if (event) {
                                           setCopies(event);
                                       }
                                   }}/>)}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => {
                onDownloadExam(exam, pageSize, copies);
                close();
            }}>
                Baixar
            </Button>
            <Button onClick={close}>
                Cancelar
            </Button>
        </DialogActions>
    </Dialog>);
}