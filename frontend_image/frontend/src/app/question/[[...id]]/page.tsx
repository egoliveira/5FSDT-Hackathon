'use client';
import React, {use, useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {teachingLevelsService} from "@/services/teachinglevel/teaching_levels_service";
import {TeachingLevelResponse} from "@/model/teachinglevel/TeachingLevelResponse";
import {teachingGradesService} from "@/services/teachinggrade/teaching_grades_service";
import {SubjectResponse} from "@/model/subject/SubjectResponse";
import {subjectsService} from "@/services/subject/subjects_service";
import {isInteger} from "@/util/number_utils";
import {
    AppBar,
    Backdrop,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Snackbar,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {ArrowBack, ArrowDownward, ArrowUpward, Delete, Edit, Save} from "@mui/icons-material";
import {TeachingGradeResponse} from "@/model/teachinggrade/TeachingGradeResponse";
import QuestionResponse from "@/model/question/QuestionResponse";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import ErrorMessage from "@/components/ErrorMessage";
import {questionService} from "@/services/question/question_service";
import MultipleChoiceQuestionChoiceResponse from "@/model/question/MultipleChoiceQuestionChoiceResponse";
import MultipleChoiceQuestionResponse from "@/model/question/MultipleChoiceQuestionResponse";
import EssayQuestionResponse from "@/model/question/EssayQuestionResponse";
import NumberSpinner from "@/components/NumberField";
import QuestionChoiceEditDialog from "@/components/QuestionChoiceEditDialog";
import CreateEditQuestionRequest from "@/model/question/CreateEditQuestionRequest";
import CreateEditMultipleChoiceQuestionChoiceRequest
    from "@/model/question/CreateEditMultipleChoiceQuestionChoiceRequest";
import {createQuestionService} from "@/services/question/create_question_service";
import {updateQuestionService} from "@/services/question/update_question_service";

export default function QuestionEditPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = use(params)

    const isNewQuestion = Array.isArray(id) && (id.length > 0) && (id[0] === 'create');

    const router = useRouter();

    const [currentQuestion, setCurrentQuestion] = useState<QuestionResponse | undefined>();
    const [subject, setSubject] = useState<number>(0);
    const [teachingLevel, setTeachingLevel] = useState<number>(0);
    const [teachingGrade, setTeachingGrade] = useState<number>(0);
    const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.MULTIPLE_CHOICE);
    const [text, setText] = useState<string>("");
    const [questionChoices, setQuestionChoices] = useState<MultipleChoiceQuestionChoiceResponse[]>([]);
    const [questionAnswer, setQuestionAnswer] = useState<string>("");
    const [linesToAnswer, setLinesToAnswer] = useState<number>(1);

    const [availableSubjects, setAvailableSubjects] = useState<SubjectResponse[]>([]);
    const [availableTeachingLevels, setAvailableTeachingLevels] = useState<TeachingLevelResponse[]>([]);
    const [availableTeachingGrades, setAvailableTeachingGrades] = useState<TeachingGradeResponse[]>([]);

    const [showGoBackConfirmationDialog, setShowGoBackConfirmationDialog] = useState<boolean>(false);
    const [goBackConfirmationDialogPayload, setGoBackConfirmationDialogPayload] = useState<object | undefined>(undefined);

    const [showQuestionChoiceEditDialog, setShowQuestionChoiceEditDialog] = useState<boolean>(false);
    const [questionChoiceEditDialogPayload, setQuestionChoiceEditDialogPayload] = useState<MultipleChoiceQuestionChoiceResponse | undefined>(undefined);

    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const [subjectError, setSubjectError] = useState(false);
    const [teachingLevelError, setTeachingLevelError] = useState(false);
    const [teachingGradeError, setTeachingGradeError] = useState(false);
    const [questionTypeError, setQuestionTypeError] = useState(false);
    const [textError, setTextError] = useState(false);
    const [questionChoicesError, setQuestionChoicesError] = useState(false);
    const [questionAnswerError, setQuestionAnswerError] = useState(false);
    const [linesToAnswerError, setLinesToAnswerError] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchQuestionInfo = useCallback(async () => {
        let question: QuestionResponse | undefined;

        if (isInteger(id)) {
            question = await questionService(Number.parseInt(id));
        }

        return question;
    }, [id]);

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
            setLoading(true);

            let question: QuestionResponse | undefined;
            let subjects: SubjectResponse[] = [];
            let teachingLevels: TeachingLevelResponse[] = [];

            let hasError = false;

            if (!isNewQuestion) {
                try {
                    question = await fetchQuestionInfo();
                } catch (error) {
                    question = undefined;
                    hasError = true;
                }

                setCurrentQuestion(question);

                updateDataFromQuestion(question);
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

            setLoading(false);
            setLoadingError(hasError);
        }

        initialize();
    }, [isNewQuestion, fetchQuestionInfo, fetchTeachingLevels, fetchSubjects, loadingError]);

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

    const updateDataFromQuestion = (question: QuestionResponse | undefined) => {
        setSubject(question?.subject?.id ?? 0);
        setTeachingLevel(question?.teachingGrade?.teachingLevel?.id ?? 0);
        setTeachingGrade(question?.teachingGrade?.id ?? 0);
        setText(question?.text ?? "");

        if (question instanceof MultipleChoiceQuestionResponse) {
            setQuestionType(QuestionType.MULTIPLE_CHOICE);
            setQuestionChoices(question.choices)
        } else if (question instanceof EssayQuestionResponse) {
            setQuestionType(QuestionType.ESSAY);
            setQuestionAnswer(question.answer);
            setLinesToAnswer(question.linesToAnswer);
        }
    }

    const changeTeachingLevel = (teachingLevelId: number) => {
        const selectedTeachingLevel = availableTeachingLevels.find(
            (teachingLevel) => teachingLevel.id === teachingLevelId
        );

        setTeachingLevel(selectedTeachingLevel?.id ?? 0);
        setTeachingGrade(0);
    }

    const changeTeachingGrade = (teachingGradeId: number) => {
        const selectedTeachingGrade = availableTeachingGrades.find(
            (teachingGrade) => teachingGrade.id === teachingGradeId
        );

        setTeachingGrade(selectedTeachingGrade?.id ?? 0);
    }

    const deleteQuestionChoice = (questionChoice: MultipleChoiceQuestionChoiceResponse) => {
        setQuestionChoices(prevQuestionChoices => prevQuestionChoices.filter(
            choice =>
                choice.order != questionChoice.order
        ).map((questionChoice, index) => {
            const newQuestionChoice: MultipleChoiceQuestionChoiceResponse = {
                ...questionChoice,
                order: index + 1
            }

            return newQuestionChoice;
        }));
    }

    const moveQuestionChoiceUp = (questionChoice: MultipleChoiceQuestionChoiceResponse) => {
        const index = questionChoices.findIndex((choice) => choice.order == questionChoice.order);
        const targetIndex = index - 1;

        swapQuestionChoices(index, targetIndex);
    }

    const moveQuestionChoiceDown = (questionChoice: MultipleChoiceQuestionChoiceResponse) => {
        const index = questionChoices.findIndex((choice) => choice.order == questionChoice.order);
        const targetIndex = index + 1;

        swapQuestionChoices(index, targetIndex);
    }

    const swapQuestionChoices = (index: number, targetIndex: number) => {
        const value = questionChoices[index];
        const targetValue = questionChoices[targetIndex];

        setQuestionChoices(prevQuestionChoices => prevQuestionChoices.map(
            (v, i) => {
                let questionChoice = v;

                if (i == index) {
                    questionChoice = {
                        ...targetValue,
                        order: value.order
                    };
                } else if (i == targetIndex) {
                    questionChoice = {
                        ...value,
                        order: targetValue.order
                    };
                }

                return questionChoice;
            })
        );
    }

    const addChoice = (text: string, isAnswer: boolean) => {
        if (questionChoices.length < MAX_QUESTION_CHOICES_PER_QUESTION) {
            setQuestionChoices((prevQuestionChoices) => {
                return [
                    ...prevQuestionChoices,
                    new MultipleChoiceQuestionChoiceResponse(0, text, prevQuestionChoices.length + 1, isAnswer)
                ];
            });
        } else {
            displaySnackbar(`Limite de ${MAX_QUESTION_CHOICES_PER_QUESTION} alternativas por questão atingido.`);
        }
    }

    const editChoice = (currentChoice: MultipleChoiceQuestionChoiceResponse, text: string, isAnswer: boolean) => {
        setQuestionChoices((prevQuestionChoices) =>
            prevQuestionChoices.map((choice) => {
                let c = choice;

                if (choice.order == currentChoice.order) {
                    c = new MultipleChoiceQuestionChoiceResponse(
                        c.id,
                        text,
                        c.order,
                        isAnswer
                    )
                }

                return c;
            })
        );
    }

    const changeChoiceAnswer = (currentChoice: MultipleChoiceQuestionChoiceResponse, isAnswer: boolean) => {
        setQuestionChoices((prevQuestionChoices) =>
            prevQuestionChoices.map((choice) => {
                let c = choice;

                if (choice.order == currentChoice.order) {
                    c = {
                        ...currentChoice,
                        isAnswer: isAnswer
                    };
                }

                return c;
            })
        );
    }

    const displaySnackbar = (message: string) => {
        setSnackbarMessage(message);
        setShowSnackbar(true);
    }

    const isUnsaved = () => {
        let unsaved;

        if (isNewQuestion) {
            unsaved = (subject != 0) || (teachingLevel != 0) || (teachingGrade != 0) || (questionType != undefined) ||
                (text.trim().length > 0) || (questionChoices.length > 0) || (questionAnswer.trim().length > 0) ||
                (linesToAnswer > 0);
        } else {
            let currentQuestionType: QuestionType;

            if (currentQuestion instanceof MultipleChoiceQuestionResponse) {
                currentQuestionType = QuestionType.MULTIPLE_CHOICE;
            } else {
                currentQuestionType = QuestionType.ESSAY;
            }

            unsaved = (subject != currentQuestion?.subject.id) ||
                (teachingLevel != currentQuestion?.teachingGrade.teachingLevel.id) ||
                (teachingGrade != currentQuestion?.teachingGrade.id) ||
                (currentQuestionType != questionType) || (text.trim() != currentQuestion?.text.trim()) ||
                ((currentQuestionType == QuestionType.MULTIPLE_CHOICE) && areQuestionChoicesChanged()) ||
                ((currentQuestionType == QuestionType.ESSAY) &&
                    (questionAnswer.trim() != (currentQuestion as EssayQuestionResponse).answer.trim()) ||
                    (linesToAnswer != (currentQuestion as EssayQuestionResponse)?.linesToAnswer));
        }

        return unsaved;
    }

    const areQuestionChoicesChanged = () => {
        const originalQuestionChoices = (currentQuestion as MultipleChoiceQuestionResponse)?.choices ?? [];

        let changed = (originalQuestionChoices.length != questionChoices.length);

        if (!changed) {
            for (let i = 0; (i < questionChoices.length) && (!changed); i++) {
                changed = (originalQuestionChoices[i].id != questionChoices[i].id) ||
                    (originalQuestionChoices[i].text != questionChoices[i].text) ||
                    (originalQuestionChoices[i].isAnswer != questionChoices[i].isAnswer);
            }
        }

        return changed;
    }

    const goBack = () => {
        if (isUnsaved()) {
            setShowGoBackConfirmationDialog(true);
            setGoBackConfirmationDialogPayload({});
        } else {
            router.push('/questions');
        }
    }

    const openQuestionChoiceEditDialog = (payload?: MultipleChoiceQuestionChoiceResponse) => {
        setQuestionChoiceEditDialogPayload(payload);
        setShowQuestionChoiceEditDialog(true);
    }

    const save = async () => {
        let canSave = true;

        if (subject == 0) {
            setSubjectError(true);
            canSave = false;
        } else {
            setSubjectError(false);
        }

        if (teachingLevel == 0) {
            setTeachingLevelError(true);
            canSave = false;
        } else {
            setTeachingLevelError(false);
        }

        if (teachingGrade == 0) {
            setTeachingGradeError(true);
            canSave = false;
        } else {
            setTeachingGradeError(false);
        }

        if (questionType == undefined) {
            setQuestionTypeError(true);
            canSave = false;
        } else {
            setQuestionTypeError(false);
        }

        if (text.trim().length == 0) {
            setTextError(true);
            canSave = false;
        } else {
            setTextError(false);
        }

        if ((questionType == QuestionType.MULTIPLE_CHOICE) &&
            ((questionChoices.length < 2) ||
                (questionChoices.find((qc) => qc.isAnswer) == undefined))) {
            setQuestionChoicesError(true);
            canSave = false;
        } else {
            setQuestionChoicesError(false);
        }

        if (questionType == QuestionType.ESSAY) {
            if (questionAnswer.trim().length == 0) {
                setQuestionAnswerError(true);
                canSave = false;
            } else {
                setQuestionAnswerError(false);
            }

            if (linesToAnswer == 0) {
                setLinesToAnswerError(true);
                canSave = false;
            } else {
                setLinesToAnswerError(false);
            }
        } else {
            setQuestionAnswerError(false);
            setLinesToAnswerError(false);
        }

        if (canSave) {
            let choices: CreateEditMultipleChoiceQuestionChoiceRequest[] = [];
            let answer = "";
            let lines = 0;

            if (questionType == QuestionType.MULTIPLE_CHOICE) {
                choices = questionChoices.map(
                    (choice) => new CreateEditMultipleChoiceQuestionChoiceRequest(
                        choice.id,
                        choice.text,
                        choice.order,
                        choice.isAnswer
                    )
                );
            } else {
                answer = questionAnswer.trim();
                lines = linesToAnswer;
            }

            const data = new CreateEditQuestionRequest(
                currentQuestion?.id ?? 0,
                subject,
                teachingGrade,
                text.trim(),
                choices,
                answer,
                lines
            );

            setSaving(true);

            if (isNewQuestion) {
                try {
                    await createQuestionService(data);

                    router.push('/questions');
                } catch (error) {
                    displaySnackbar("Ocorreu um erro ao salvar a questão. Tente novamente.");
                } finally {
                    setSaving(false);
                }
            } else {
                try {
                    const updatedQuestion = await updateQuestionService(data);

                    setCurrentQuestion(updatedQuestion);
                    updateDataFromQuestion(updatedQuestion);

                    displaySnackbar("Questão atualizada com sucesso.");

                    router.push('/questions');
                } catch (error) {
                    displaySnackbar("Ocorreu um erro ao salvar a questão. Tente novamente.");
                } finally {
                    setSaving(false);
                }
            }
        }
    }

    return (<Box>
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" sx={{mr: 2}}>
                        <ArrowBack onClick={goBack}/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {isNewQuestion && ('Nova Questão')}
                        {!isNewQuestion && ('Editar Questão')}
                    </Typography>

                    <IconButton size="large" edge="end" color="inherit">
                        <Save onClick={save}/>
                    </IconButton>)
                </Toolbar>
            </AppBar>
        </Box>
        {!loading && (!loadingError) && (<Container maxWidth="xl" sx={{marginTop: 4}}>
            <FormControl fullWidth={true} error={subjectError}>
                <InputLabel id="subjectLabel"
                            variant="outlined"
                            htmlFor="subjectField">
                    Matéria
                </InputLabel>
                <Select variant="outlined"
                        labelId="subjectLabel"
                        disabled={!isNewQuestion}
                        sx={{
                            width: 200,
                            marginTop: 1
                        }}
                        inputProps={{
                            name: 'subjectField',
                            id: 'subjectField',
                        }}
                        value={subject}
                        onChange={(event) => setSubject(event.target.value)}>
                    {availableSubjects.map(subject => (
                        <MenuItem key={subject.id}
                                  value={subject.id}>
                            {subject.name}
                        </MenuItem>
                    ))}
                </Select>
                {subjectError && (<FormHelperText>Selecione uma matéria</FormHelperText>)}
            </FormControl>

            <FormControl fullWidth={true} error={teachingLevelError}>
                <InputLabel id="teachingLevelLabel"
                            variant="outlined"
                            htmlFor="teachingLevelField"
                            sx={{marginTop: 2}}>
                    Nível
                </InputLabel>
                <Select variant="outlined"
                        disabled={!isNewQuestion}
                        labelId="teachingLevelLabel"
                        sx={{
                            width: 400,
                            marginTop: 3
                        }}
                        inputProps={{
                            name: 'teachingLevelField',
                            id: 'teachingLevelField',
                        }}
                        value={teachingLevel}
                        onChange={(event) => changeTeachingLevel(event.target.value)}>
                    {availableTeachingLevels.map(teachingLevel => (
                        <MenuItem key={teachingLevel.id}
                                  value={teachingLevel.id}>
                            {teachingLevel.name}
                        </MenuItem>
                    ))}
                </Select>
                {teachingLevelError && (<FormHelperText>Selecione um nível</FormHelperText>)}
            </FormControl>

            <FormControl fullWidth={true} error={teachingGradeError}>
                <InputLabel id="teachingGradeLabel"
                            variant="outlined"
                            htmlFor="teachingGradeField"
                            sx={{marginTop: 2}}>
                    Ano
                </InputLabel>
                <Select variant="outlined"
                        disabled={!isNewQuestion}
                        labelId="teachingGradeLabel"
                        sx={{
                            width: 400,
                            marginTop: 3
                        }}
                        inputProps={{
                            name: 'teachingGradeField',
                            id: 'teachingGradeField',
                        }}
                        value={teachingGrade}
                        onChange={(event) => changeTeachingGrade(event.target.value)}>
                    {availableTeachingGrades.map(teachingGrade => (
                        <MenuItem key={teachingGrade.id}
                                  value={teachingGrade.id}>
                            {teachingGrade.name}
                        </MenuItem>
                    ))}
                </Select>
                {teachingGradeError && (<FormHelperText>Selecione um ano</FormHelperText>)}
            </FormControl>

            <FormControl fullWidth={true} error={questionTypeError}>
                <InputLabel id="questionTypeLabel"
                            variant="standard"
                            htmlFor="questionTypeField"
                            sx={{marginTop: 2}}>
                    Tipo da Questão
                </InputLabel>
                <RadioGroup
                    id="questionTypeField"
                    row={true}
                    sx={{marginTop: 8}}
                    value={questionType}
                    onChange={(event) => setQuestionType(parseInt(event.target.value))}>
                    <FormControlLabel value={QuestionType.MULTIPLE_CHOICE}
                                      control={<Radio/>}
                                      label="Múltipla Escolha"
                                      disabled={!isNewQuestion}/>
                    <FormControlLabel value={QuestionType.ESSAY}
                                      control={<Radio/>}
                                      label="Dissertativa"
                                      disabled={!isNewQuestion}/>
                </RadioGroup>
                {questionTypeError && (<FormHelperText>Selecione o tipo da questão</FormHelperText>)}
            </FormControl>

            <FormControl fullWidth={true} error={textError}>
                <TextField variant="outlined"
                           label="Enunciado"
                           multiline={true}
                           rows={10}
                           error={textError}
                           slotProps={{
                               htmlInput: {
                                   maxLength: 32767
                               }
                           }}
                           sx={{
                               width: '60%',
                               marginTop: 3
                           }}
                           value={text}
                           onChange={(event) => {
                               setText(event.target.value)
                           }}/>
                {textError && (<FormHelperText>Digite o enunciado da questão</FormHelperText>)}
            </FormControl>

            {(questionType == QuestionType.MULTIPLE_CHOICE) && (
                <FormControl fullWidth={true} error={questionChoicesError}>
                    <InputLabel id="choicesLabel"
                                htmlFor="choices"
                                sx={{marginTop: 2}}>
                        Alternativas
                    </InputLabel>
                    {(questionChoices.length > 0) &&
                        (<List id="choices"
                               sx={{
                                   marginTop: 5,
                               }}>
                            {questionChoices.map((item, index) => (
                                <ListItem key={index}>
                                    <Box display="flex"
                                         flexDirection="row"
                                         alignItems="center">
                                        <Checkbox checked={item.isAnswer}
                                                  onChange={(event) =>
                                                      changeChoiceAnswer(item, event.target.checked)}
                                        />
                                        <Typography variant="body1">
                                            {String.fromCharCode(65 + index)}) {item.text}
                                        </Typography>
                                        {(index > 0) &&
                                            (<IconButton onClick={() => moveQuestionChoiceUp(item)}>
                                                <ArrowUpward/>
                                            </IconButton>)}
                                        {(index < questionChoices.length - 1) &&
                                            (<IconButton onClick={() => moveQuestionChoiceDown(item)}>
                                                <ArrowDownward/>
                                            </IconButton>)}
                                        <IconButton>
                                            <Edit onClick={() => openQuestionChoiceEditDialog(item)}/>
                                        </IconButton>
                                        <IconButton onClick={() => deleteQuestionChoice(item)}>
                                            <Delete/>
                                        </IconButton>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>)}
                    {(questionChoices.length == 0) &&
                        (<Box sx={{marginTop: 8}}>
                            <Typography variant="body1">Nenhuma alternativa adicionada</Typography>
                        </Box>)}
                    {questionChoicesError && (
                        <FormHelperText>{(questionChoices.length < 2) ? 'Adicione ao menos duas alternativas' : 'Selecione ao menos uma alternativa como resposta'}
                        </FormHelperText>
                    )}
                    <Box sx={{marginTop: 1}}>
                        <Button onClick={() => openQuestionChoiceEditDialog()}>
                            Adicionar Alternativa
                        </Button>
                    </Box>
                </FormControl>)}

            {(questionType == QuestionType.ESSAY) && (
                <FormControl fullWidth={true} error={questionAnswerError}>
                    <TextField variant="outlined"
                               label="Resposta"
                               multiline={true}
                               rows={10}
                               error={questionAnswerError}
                               slotProps={{
                                   htmlInput: {
                                       maxLength: 32767
                                   }
                               }}
                               sx={{
                                   width: '60%',
                                   marginTop: 3
                               }}
                               value={questionAnswer}
                               onChange={(event) => {
                                   setQuestionAnswer(event.target.value)
                               }}/>
                    {textError && (<FormHelperText>Digite a resposta da questão</FormHelperText>)}
                </FormControl>)}

            {(questionType == QuestionType.ESSAY) && (
                <FormControl fullWidth={true} error={linesToAnswerError}>
                    <NumberSpinner size="small"
                                   min={1}
                                   max={50}
                                   step={1}
                                   label="Linhas de Resposta"
                                   value={linesToAnswer}
                                   sx={{marginTop: 2}}
                                   onValueChange={(event) => {
                                       if (event != null) {
                                           setLinesToAnswer(event);
                                       }
                                   }}/>
                </FormControl>)}
        </Container>)}

        {loading && !loadingError && (<Box sx={{
            marginTop: 4,
            display: 'flex',
            width: '100%',
            height: '80vh',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CircularProgress/>
        </Box>)}

        {!loading && loadingError && (<Box sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '80vh',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ErrorMessage errorMessage="Ocorreu um erro ao carregar as informações para criação da questão."/>

            <Button sx={{marginTop: 4}} onClick={() => {
                setLoading(true);
                setLoadingError(false);
            }}>
                Tentar Novamente
            </Button>
        </Box>)}

        {(goBackConfirmationDialogPayload) && (
            <ConfirmationDialog showDialog={showGoBackConfirmationDialog}
                                payload={goBackConfirmationDialogPayload}
                                onConfirm={() => {
                                    setGoBackConfirmationDialogPayload(undefined);
                                    router.push('/questions');
                                }}
                                onClose={() => setShowGoBackConfirmationDialog(false)}
                                title="Voltar"
                                message="Os dados da questão não foram salvos. Deseja voltar para a lista de questões?"
                                confirmButtonText="Voltar"/>)}

        <QuestionChoiceEditDialog showDialog={showQuestionChoiceEditDialog}
                                  onClose={() => setShowQuestionChoiceEditDialog(false)}
                                  questionChoice={questionChoiceEditDialogPayload}
                                  onEditFinished={(text, isAnswer, questionChoice) => {
                                      if (!questionChoice) {
                                          addChoice(text, isAnswer);
                                      } else {
                                          editChoice(questionChoice, text, isAnswer);
                                      }
                                  }}/>

        <Snackbar open={showSnackbar}
                  autoHideDuration={6000}
                  onClose={() => setShowSnackbar(false)}
                  message={snackbarMessage}
                  anchorOrigin={{vertical: 'top', horizontal: 'center'}}/>

        <Backdrop open={saving}
                  sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    </Box>);
}

enum QuestionType {
    MULTIPLE_CHOICE,
    ESSAY
}

const MAX_QUESTION_CHOICES_PER_QUESTION = 10;
