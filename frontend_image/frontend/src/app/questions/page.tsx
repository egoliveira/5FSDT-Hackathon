'use client';
import {useRouter} from "next/navigation";
import React, {useCallback, useEffect, useState} from "react";
import {
    Box,
    Button,
    Container,
    Fab,
    FormControl,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Stack,
    TablePagination
} from "@mui/material";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingIndicator from "@/components/LoadingIndicator";
import AddIcon from "@mui/icons-material/Add";
import QuestionListResponse from "@/model/question/QuestionListResponse";
import {questionsService} from "@/services/question/questions_service";
import EmptyMessage from "@/components/EmptyMessage";
import {SubjectResponse} from "@/model/subject/SubjectResponse";
import {TeachingLevelResponse} from "@/model/teachinglevel/TeachingLevelResponse";
import {TeachingGradeResponse} from "@/model/teachinggrade/TeachingGradeResponse";
import {teachingLevelsService} from "@/services/teachinglevel/teaching_levels_service";
import {teachingGradesService} from "@/services/teachinggrade/teaching_grades_service";
import {subjectsService} from "@/services/subject/subjects_service";
import QuestionStatement from "@/components/QuestionStatement";
import QuestionDetailsDialog from "@/components/QuestionDetailsDialog";
import QuestionResponse from "@/model/question/QuestionResponse";

export default function Home() {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [questions, setQuestions] = useState<QuestionListResponse>(new QuestionListResponse([], true, true, true, 0, 0, 0, 0, 0));
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [subject, setSubject] = useState<number>(0);
    const [teachingLevel, setTeachingLevel] = useState<number>(0);
    const [teachingGrade, setTeachingGrade] = useState<number>(0);

    const [availableSubjects, setAvailableSubjects] = useState<SubjectResponse[]>([]);
    const [availableTeachingLevels, setAvailableTeachingLevels] = useState<TeachingLevelResponse[]>([]);
    const [availableTeachingGrades, setAvailableTeachingGrades] = useState<TeachingGradeResponse[]>([]);

    const [showQuestionDetailsDialog, setShowQuestionDetailsDialog] = useState(false);
    const [questionDetailsDialogQuestion, setQuestionDetailsDialogQuestion] = useState<QuestionResponse | undefined>(undefined);

    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const fetchTeachingLevels = useCallback(async () => {
            return await teachingLevelsService();
        },
        []);

    const fetchTeachingGrades = useCallback(async (teachingLevelId: number) => {
        return await teachingGradesService(teachingLevelId);
    }, []);

    const fetchSubjects = useCallback(async () => {
            return await subjectsService();
        },
        []);

    useEffect(() => {
        const initialize = async () => {
            let hasError = false;

            let subjects: SubjectResponse[] = [];
            let teachingLevels: TeachingLevelResponse[] = [];

            setError(false);
            setLoading(true);

            try {
                if ((subject > 0) && (teachingLevel > 0) && (teachingGrade > 0)) {
                    const questionsResponse = await questionsService(subject, teachingGrade, page, pageSize);

                    setQuestions(questionsResponse);
                } else {
                    setQuestions(new QuestionListResponse([], true, true, true, 0, 0, 0, 0, 0));
                }
            } catch (error) {
                hasError = true;
            }

            if (!hasError) {
                try {
                    subjects = await fetchSubjects();
                } catch (error) {
                    hasError = true;
                }
            }

            setAvailableSubjects(subjects);

            if (!hasError) {
                try {
                    teachingLevels = await fetchTeachingLevels();
                } catch (error) {
                    hasError = true;
                }
            }

            setAvailableTeachingLevels(teachingLevels);

            setError(hasError);
            setLoading(false);
        }

        initialize();
    }, [page, pageSize, subject, teachingLevel, teachingGrade, fetchSubjects, fetchTeachingLevels]);

    useEffect(() => {
        const loadTeachingGrades = async () => {
            let teachingGrades: TeachingGradeResponse[] | undefined;

            try {
                teachingGrades = await fetchTeachingGrades(teachingLevel);
            } catch (error) {
                displaySnackbar("Ocorreu um erro ao carregar os anos pertencentes ao nível selecionado. Tente novamente.");

                teachingGrades = []
            }

            setAvailableTeachingGrades(teachingGrades);
        }

        loadTeachingGrades();
    }, [teachingLevel, fetchTeachingGrades]);

    const displaySnackbar = (message: string) => {
        setSnackbarMessage(message);
        setShowSnackbar(true);
    }

    return (<Container maxWidth="xl" sx={{marginTop: 4}}>
        <Stack direction="row" spacing={2}>
            <FormControl fullWidth={true}>
                <InputLabel id="subjectLabel"
                            variant="outlined"
                            htmlFor="subjectField">
                    Matéria
                </InputLabel>
                <Select variant="outlined"
                        labelId="subjectLabel"
                        autoWidth={true}
                        sx={{
                            marginTop: 1,
                            flexWrap: "wrap",
                            width: 200
                        }}
                        inputProps={{
                            name: 'subjectField',
                            id: 'subjectField',
                        }}
                        value={subject}
                        onChange={(event) => {
                            setSubject(event.target.value);
                        }}>
                    {availableSubjects.map(subject => (
                        <MenuItem key={subject.id}
                                  value={subject.id}>
                            {subject.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth={true}>
                <InputLabel id="teachingLevelLabel"
                            variant="outlined"
                            htmlFor="teachingLevelField">
                    Nível
                </InputLabel>
                <Select variant="outlined"
                        labelId="teachingLevelLabel"
                        sx={{
                            width: 400,
                            marginTop: 1
                        }}
                        inputProps={{
                            name: 'teachingLevelField',
                            id: 'teachingLevelField',
                        }}
                        value={teachingLevel}
                        onChange={(event) => {
                            setTeachingLevel(event.target.value);
                        }}>
                    {availableTeachingLevels.map(teachingLevel => (
                        <MenuItem key={teachingLevel.id}
                                  value={teachingLevel.id}>
                            {teachingLevel.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth={true}>
                <InputLabel id="teachingGradeLabel"
                            variant="outlined"
                            htmlFor="teachingGradeField">
                    Ano
                </InputLabel>
                <Select variant="outlined"
                        labelId="teachingGradeLabel"
                        sx={{
                            width: 400,
                            marginTop: 1
                        }}
                        inputProps={{
                            name: 'teachingGradeField',
                            id: 'teachingGradeField',
                        }}
                        value={teachingGrade}
                        onChange={(event) => {
                            setTeachingGrade(event.target.value);
                        }}>
                    {availableTeachingGrades.map(teachingGrade => (
                        <MenuItem key={teachingGrade.id}
                                  value={teachingGrade.id}>
                            {teachingGrade.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
        {!loading && !error && (questions.totalElements > 0) && (
            <Box sx={{marginTop: 4}}>
                {(questions.size > 0) && (<Box>
                    <List>
                        {questions.content.map((item, index) => (
                            <Paper key={item.id} sx={{marginTop: index > 0 ? 1 : 0}}>
                                <ListItem key={item.id}>
                                    <Stack direction="column" width="100%">
                                        <QuestionStatement question={item}
                                                           onClick={() => {
                                                               setQuestionDetailsDialogQuestion(item);
                                                               setShowQuestionDetailsDialog(true);
                                                           }}/>
                                        <Stack direction="row" justifyContent="flex-end" sx={{width: '100%'}}>
                                            <Button onClick={() => router.push(`/question/${item.id}`)}>
                                                Editar Questão
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </ListItem>
                            </Paper>
                        ))}
                    </List>
                    <Stack direction="row" justifyContent="flex-end" maxWidth="xl" sx={{marginTop: 2}}>
                        <TablePagination
                            component="div"
                            count={questions.totalElements}
                            page={questions.number}
                            onPageChange={(event, page) => {
                                setPage(page);
                            }}
                            onRowsPerPageChange={(event) => {
                                setPage(0);
                                setPageSize(parseInt(event.target.value));
                            }}
                            rowsPerPage={pageSize}
                            rowsPerPageOptions={[5, 10, 25]}/>
                    </Stack>
                </Box>)}
            </Box>
        )}

        {!loading && !error && (<Box
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
            }}>
            <Fab color="primary" onClick={() => router.push('/question/create')}>
                <AddIcon/>
            </Fab>
        </Box>)}

        {loading && !error && (<LoadingIndicator/>)}

        {!loading && !error && (subject != 0) && (teachingGrade != 0) && (questions.totalElements == 0) && (
            <EmptyMessage sx={{marginTop: 4}}
                          emptyMessage="Nenhuma questão encontrada"/>)}

        {!loading && !error && (subject == 0) && (teachingGrade == 0) &&
            (<EmptyMessage
                sx={{marginTop: 4}}
                emptyMessage="Selecione a matéria, o nível e o ano para exibir as questões."/>)}

        {!loading && error && (
            <ErrorMessage sx={{marginTop: 4}}
                          errorMessage="Ocorreu um erro ao carregar as questões"/>)}

        {questionDetailsDialogQuestion &&
            (<QuestionDetailsDialog showDialog={showQuestionDetailsDialog}
                                    onClose={() => setShowQuestionDetailsDialog(false)}
                                    question={questionDetailsDialogQuestion}/>)}

        <Snackbar open={showSnackbar}
                  autoHideDuration={6000}
                  onClose={() => setShowSnackbar(false)}
                  message={snackbarMessage}
                  anchorOrigin={{vertical: 'top', horizontal: 'center'}}/>
    </Container>);
}