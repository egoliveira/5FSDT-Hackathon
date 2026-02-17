import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    Paper,
    Typography
} from "@mui/material";
import QuestionResponse from "@/model/question/QuestionResponse";
import {SubjectResponse} from "@/model/subject/SubjectResponse";
import {TeachingGradeResponse} from "@/model/teachinggrade/TeachingGradeResponse";
import {useEffect, useState} from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import {questionsService} from "@/services/question/questions_service";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyMessage from "@/components/EmptyMessage";
import QuestionStatement from "@/components/QuestionStatement";

export default function QuestionBrowserDialog({
                                                  showDialog,
                                                  onClose,
                                                  subject,
                                                  teachingGrade,
                                                  onQuestionSelected
                                              }: {
    showDialog: boolean,
    onClose: () => void,
    subject: SubjectResponse,
    teachingGrade: TeachingGradeResponse,
    onQuestionSelected: (questions: QuestionResponse[]) => void,
}) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [questionItems, setQuestionItems] = useState<QuestionItem[]>([]);

    useEffect(() => {
        const initialize = async () => {
            setLoading(true);

            if (showDialog) {
                setQuestionItems([]);
            }

            try {
                const questions = await questionsService(subject.id, teachingGrade.id);

                setQuestionItems(questions.content.map((question) => new QuestionItem(question, false)));

                setError(false);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        initialize();
    }, [subject, teachingGrade, showDialog]);

    const switchQuestionSelection = (questionId: number) => {
        setQuestionItems(prevQuestionItem => prevQuestionItem.map(
            questionItem =>
                questionItem.question.id == questionId ? {
                    ...questionItem,
                    selected: !questionItem.selected
                } : questionItem
        ));
    }

    return (<Dialog open={showDialog}
                    onClose={onClose}>
        <DialogTitle>
            Selecionar Questão
        </DialogTitle>
        <DialogContent>
            <Typography variant="body1">Matéria: {subject.name}</Typography>
            <Typography variant="body1">Nível: {teachingGrade.teachingLevel.name}</Typography>
            <Typography variant="body1">Ano: {teachingGrade.name}</Typography>

            <Box sx={{height: 20}}/>

            {!loading && !error && (questionItems.length > 0) && (
                <List>
                    {questionItems.map((item, index) => (
                        <Paper key={item.question.id} sx={{marginTop: index > 0 ? 1 : 0}}>
                            <ListItem key={item.question.id}>
                                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                    <Box>
                                        <Checkbox checked={item.selected}
                                                  onChange={() => switchQuestionSelection(item.question.id)}/>
                                    </Box>
                                    <QuestionStatement question={item.question}
                                                       onClick={() => switchQuestionSelection(item.question.id)}/>
                                </Box>
                            </ListItem>
                        </Paper>
                    ))}
                </List>
            )}

            {loading && !error && (<LoadingIndicator/>)}

            {!loading && error && (<ErrorMessage errorMessage="Ocorreu um erro ao carregar as questões"/>)}

            {!loading && !error && (questionItems.length == 0) && (
                <EmptyMessage emptyMessage="Nenhuma questão encontrada"/>)}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>
                Cancelar
            </Button>
            <Button disabled={loading || error || (questionItems.find((item) => item.selected) == null)}
                    onClick={() => {
                        onQuestionSelected(questionItems
                            .filter((item) => item.selected)
                            .map((item) => item.question)
                        );
                        onClose();
                    }}>
                Selecionar
            </Button>
        </DialogActions>
    </Dialog>);
}

class QuestionItem {
    readonly question: QuestionResponse;
    selected: boolean;

    constructor(question: QuestionResponse, selected: boolean) {
        this.question = question;
        this.selected = selected;
    }
}