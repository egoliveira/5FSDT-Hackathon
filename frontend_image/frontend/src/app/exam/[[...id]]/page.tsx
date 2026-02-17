'use client';
import React, {use, useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {teachingLevelsService} from "@/services/teachinglevel/teaching_levels_service";
import {TeachingLevelResponse} from "@/model/teachinglevel/TeachingLevelResponse";
import {teachingGradesService} from "@/services/teachinggrade/teaching_grades_service";
import {SubjectResponse} from "@/model/subject/SubjectResponse";
import {subjectsService} from "@/services/subject/subjects_service";
import {isInteger} from "@/util/number_utils";
import ExamResponse from "@/model/exam/ExamResponse";
import {TeacherResponse} from "@/model/teacher/TeacherResponse";
import {
    AppBar,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Switch,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {examService} from "@/services/exam/exam_service";
import {ArrowBack, Cancel, Download, Edit, Save} from "@mui/icons-material";
import {teachersService} from "@/services/teacher/teachers_service";
import {TeachingGradeResponse} from "@/model/teachinggrade/TeachingGradeResponse";
import {DatePicker} from "@mui/x-date-pickers";
import ExamQuestionResponse from "@/model/exam/ExamQuestionResponse";
import NumberSpinner from "@/components/NumberField";
import AlertDialog from "@/components/AlertDialog";
import QuestionBrowserDialog from "@/components/QuestionBrowserDialog";
import QuestionStatement from "@/components/QuestionStatement";
import QuestionResponse from "@/model/question/QuestionResponse";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import EmptyMessage from "@/components/EmptyMessage";
import CreateEditExamRequest from "@/model/exam/CreateEditExamRequest";
import CreateEditExamQuestionRequest from "@/model/exam/CreateEditExamQuestionRequest";
import {createExamService} from "@/services/exam/create_exam_service";
import ErrorMessage from "@/components/ErrorMessage";
import DownloadExamDialog from "@/components/DownloadExamDialog";
import {PageSize} from "@/model/exam/PageSize";
import {downloadExamService} from "@/services/exam/download_exam_service";
import {updateExamService} from "@/services/exam/update_exam_service";
import {parse} from "date-fns";

export default function ExamEditPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = use(params)

    const isNewExam = Array.isArray(id) && (id.length > 0) && (id[0] === 'create');
    const [isEditing, setIsEditing] = useState(false);

    const now = new Date();

    const router = useRouter();

    const [currentExam, setCurrentExam] = useState<ExamResponse | undefined>();
    const [subject, setSubject] = useState<number>(0);
    const [teacher, setTeacher] = useState<number>(0);
    const [teachingLevel, setTeachingLevel] = useState<number>(0);
    const [teachingGrade, setTeachingGrade] = useState<number>(0);
    const [classOfStudents, setClassOfStudents] = useState<string>("");
    const [date, setDate] = useState<Date | null>(now);
    const [randomQuestionsOrder, setRandomQuestionsOrder] = useState<boolean>(false);
    const [examQuestions, setExamQuestions] = useState<ExamQuestionResponse[]>([]);

    const [availableSubjects, setAvailableSubjects] = useState<SubjectResponse[]>([]);
    const [availableTeachers, setAvailableTeachers] = useState<TeacherResponse[]>([]);
    const [availableTeachingLevels, setAvailableTeachingLevels] = useState<TeachingLevelResponse[]>([]);
    const [availableTeachingGrades, setAvailableTeachingGrades] = useState<TeachingGradeResponse[]>([]);

    const [selectedSubject, setSelectedSubject] = useState<SubjectResponse | undefined>(undefined);
    const [selectedTeachingGrade, setSelectedTeachingGrade] = useState<TeachingGradeResponse | undefined>(undefined);

    const [alertDialogType, setAlertDialogType] = useState<AlertDialogType | undefined>(undefined);
    const [showQuestionBrowserDialog, setShowQuestionBrowserDialog] = useState<boolean>(false);

    const [showDeleteQuestionConfirmationDialog, setShowDeleteQuestionConfirmationDialog] = useState<boolean>(false);
    const [deleteQuestionConfirmationDialogPayload, setDeleteQuestionConfirmationDialogPayload] = useState<QuestionResponse | undefined>(undefined);

    const [showChangeSubjectConfirmationDialog, setShowChangeSubjectConfirmationDialog] = useState<boolean>(false);
    const [changeSubjectConfirmationDialogPayload, setChangeSubjectConfirmationDialogPayload] = useState<SubjectResponse | undefined>(undefined);

    const [showChangeTeachingLevelConfirmationDialog, setShowChangeTeachingLevelConfirmationDialog] = useState<boolean>(false);
    const [changeTeachingLevelConfirmationDialogPayload, setChangeTeachingLevelConfirmationDialogPayload] = useState<TeachingLevelResponse | undefined>(undefined);

    const [showChangeTeachingGradeConfirmationDialog, setShowChangeTeachingGradeConfirmationDialog] = useState<boolean>(false);
    const [changeTeachingGradeConfirmationDialogPayload, setChangeTeachingGradeConfirmationDialogPayload] = useState<TeachingGradeResponse | undefined>(undefined);

    const [showGoBackConfirmationDialog, setShowGoBackConfirmationDialog] = useState<boolean>(false);
    const [goBackConfirmationDialogPayload, setGoBackConfirmationDialogPayload] = useState<object | undefined>(undefined);

    const [showCancelConfirmationDialog, setShowCancelConfirmationDialog] = useState<boolean>(false);
    const [cancelConfirmationDialogPayload, setCancelConfirmationDialogPayload] = useState<object | undefined>(undefined);

    const [showDownloadExamDialog, setShowDownloadExamDialog] = useState<boolean>(false);

    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const [subjectError, setSubjectError] = useState(false);
    const [teacherError, setTeacherError] = useState(false);
    const [teachingLevelError, setTeachingLevelError] = useState(false);
    const [teachingGradeError, setTeachingGradeError] = useState(false);
    const [classOfStudentsError, setClassOfStudentsError] = useState(false);
    const [dateError, setDateError] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchExamInfo = useCallback(async () => {
        let exam: ExamResponse | undefined;

        if (isInteger(id)) {
            exam = await examService(Number.parseInt(id));
        }

        return exam;
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

    const fetchTeachers = useCallback(async () => {
            return await teachersService();
        },
        []);

    useEffect(() => {
        const initialize = async () => {
            setLoading(true);

            let exam: ExamResponse | undefined;
            let subjects: SubjectResponse[] = [];
            let teachers: TeacherResponse[] = [];
            let teachingLevels: TeachingLevelResponse[] = [];

            let hasError = false;

            if (!isNewExam) {
                try {
                    exam = await fetchExamInfo();
                } catch (error) {
                    exam = undefined;
                    hasError = true;
                }

                setCurrentExam(exam);

                updateDataFromExam(exam);
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
                    teachers = await fetchTeachers();
                } catch (error) {
                    hasError = true;
                }
            }

            setAvailableTeachers(teachers);

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
    }, [isNewExam, fetchExamInfo, fetchTeachingLevels, fetchSubjects, fetchTeachers, loadingError]);

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

    const isReadOnly = () => {
        return !isNewExam && !isEditing;
    };

    const updateDataFromExam = (exam: ExamResponse | undefined) => {
        const examData = exam ? exam : currentExam;

        setSubject(examData?.subject?.id ?? 0);
        setTeacher(examData?.teacher?.id ?? 0);
        setTeachingLevel(examData?.teachingGrade?.teachingLevel?.id ?? 0);
        setTeachingGrade(examData?.teachingGrade?.id ?? 0);
        setClassOfStudents(examData?.classOfStudents ?? '');

        const dateStr = examData?.date;

        if (dateStr) {
            // @ts-ignore
            setDate(parse(dateStr, 'yyyy-MM-dd', new Date()));
        } else {
            setDate(now);
        }

        setRandomQuestionsOrder(examData?.randomQuestionsOrder ?? false);

        setExamQuestions(examData?.questions?.sort((q1, q2) => q1.order - q2.order) ?? []);
    }

    const updateQuestionValue = (questionId: number, value: number) => {
        setExamQuestions(prevExamQuestions => prevExamQuestions.map(
            examQuestion =>
                examQuestion.question.id == questionId ? {...examQuestion, value: value} : examQuestion
        ));
    }

    const changeTeachingLevel = (teachingLevelId: number) => {
        const selectedTeachingLevel = availableTeachingLevels.find(
            (teachingLevel) => teachingLevel.id === teachingLevelId
        );

        setTeachingLevel(selectedTeachingLevel?.id ?? 0);
        setTeachingGrade(0);
        setExamQuestions([]);
    }

    const changeTeachingGrade = (teachingGradeId: number) => {
        const selectedTeachingGrade = availableTeachingGrades.find(
            (teachingGrade) => teachingGrade.id === teachingGradeId
        );

        setTeachingGrade(selectedTeachingGrade?.id ?? 0);
        setExamQuestions([]);
    }

    const addQuestions = (questions: QuestionResponse[]) => {
        let index = examQuestions.length + 1;
        let existing = false;

        let currentExamQuestions = examQuestions;

        questions.forEach((question) => {
            if (currentExamQuestions.find((examQuestion) => examQuestion.question.id == question.id)) {
                existing = true;
            } else {
                const newExamQuestion = new ExamQuestionResponse(0, currentExam?.id ?? 0, question, index++, 1);

                currentExamQuestions = [...currentExamQuestions, newExamQuestion];
            }
        });

        if (index == examQuestions.length + 1) {
            displaySnackbar("Todas as questões selecionadas já fazem parte da prova.");
        } else {
            if (existing) {
                displaySnackbar("Algumas das questões selecionadas já fazem parte da prova.");
            }

            setExamQuestions(currentExamQuestions);
        }
    }

    const deleteQuestion = (question: QuestionResponse) => {
        setExamQuestions(prevExamQuestions => prevExamQuestions.filter(
            examQuestion =>
                examQuestion.question.id != question.id
        ).map((question, index) => {
            const newQuestion: ExamQuestionResponse = {
                ...question,
                order: index + 1
            }

            return newQuestion;
        }));
    }

    const moveQuestionUp = (question: QuestionResponse) => {
        const index = examQuestions.findIndex((examQuestion) => examQuestion.question.id == question.id);
        const targetIndex = index - 1;

        swapQuestions(index, targetIndex);
    }

    const moveQuestionDown = (question: QuestionResponse) => {
        const index = examQuestions.findIndex((examQuestion) => examQuestion.question.id == question.id);
        const targetIndex = index + 1;

        swapQuestions(index, targetIndex);
    }

    const swapQuestions = (index: number, targetIndex: number) => {
        const value = examQuestions[index];
        const targetValue = examQuestions[targetIndex];

        setExamQuestions(prevExamQuestions => prevExamQuestions.map(
            (v, i) => {
                let examQuestion = v;

                if (i == index) {
                    examQuestion = {
                        ...targetValue,
                        order: value.order
                    };
                } else if (i == targetIndex) {
                    examQuestion = {
                        ...value,
                        order: targetValue.order
                    };
                }

                return examQuestion;
            })
        );
    }

    const getAlertDialogMessage = (alertDialogType: AlertDialogType | undefined) => {
        let message: string = "";

        switch (alertDialogType) {
            case AlertDialogType.SELECT_SUBJECT_FIRST:
                message = "Selecione uma matéria primeiro";
                break;
            case AlertDialogType.SELECT_TEACHING_LEVEL_FIRST:
                message = "Selecione um nível primeiro"
                break;
            case AlertDialogType.SELECT_TEACHING_GRADE_FIRST:
                message = "Selecione um ano primeiro"
                break;
            case AlertDialogType.SELECT_QUESTIONS:
                message = "Adicione questões à avaliação antes de salvá-la";
                break;
            default:
                break;
        }

        return message;
    }

    const displaySnackbar = (message: string) => {
        setSnackbarMessage(message);
        setShowSnackbar(true);
    }

    const isUnsaved = () => {
        let unsaved;

        if (isNewExam) {
            unsaved = (subject != 0) || (teacher != 0) || (teachingLevel != 0) || (teachingGrade != 0) ||
                (classOfStudents.trim().length > 0) || ((date != null) && (date.getDate() != now.getDate()) &&
                    (date.getMonth() != now.getMonth()) && (date.getFullYear() != now.getFullYear())) ||
                (randomQuestionsOrder) || (examQuestions.length > 0);
        } else {
            let originalDate = new Date();

            if (currentExam?.date) {
                // @ts-ignore
                originalDate = parse(currentExam?.date, 'yyyy-MM-dd', new Date());
            }

            unsaved = (subject != currentExam?.subject.id) || (teacher != currentExam?.teacher.id) ||
                (teachingLevel != currentExam?.teachingGrade.teachingLevel.id) ||
                (teachingGrade != currentExam?.teachingGrade.id) ||
                (classOfStudents.trim() != currentExam?.classOfStudents.trim()) ||
                ((date?.getDate() != originalDate.getDate()) &&
                    (date?.getMonth() != originalDate.getMonth()) &&
                    (date?.getFullYear() != originalDate.getFullYear())) ||
                (randomQuestionsOrder != currentExam?.randomQuestionsOrder) ||
                areQuestionsChanged();
        }

        return unsaved;
    }

    const areQuestionsChanged = () => {
        const originalQuestions = currentExam?.questions ?? [];

        let changed = (originalQuestions.length != examQuestions.length);

        if (!changed) {
            for (let i = 0; (i < examQuestions.length) && (!changed); i++) {
                changed = (originalQuestions[i].question.id != examQuestions[i].question.id) ||
                    (originalQuestions[i].value != examQuestions[i].value);
            }
        }

        return changed;
    }

    const goBack = () => {
        if (isUnsaved()) {
            setShowGoBackConfirmationDialog(true);
            setGoBackConfirmationDialogPayload({});
        } else {
            router.push('/');
        }
    }

    const save = async () => {
        let canSave = true;

        if (subject == 0) {
            setSubjectError(true);
            canSave = false;
        } else {
            setSubjectError(false);
        }

        if (teacher == 0) {
            setTeacherError(true);
            canSave = false;
        } else {
            setTeacherError(false);
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

        if (classOfStudents.trim().length == 0) {
            setClassOfStudentsError(true);
            canSave = false;
        } else {
            setClassOfStudentsError(false);
        }

        if (date == null) {
            setDateError(true);
            canSave = false;
        } else {
            const today = new Date();

            today.setHours(0, 0, 0, 0);

            if (date < today) {
                setDateError(true);
                canSave = false;
            } else {
                setDateError(false);
            }
        }

        if (canSave && (examQuestions.length == 0)) {
            setAlertDialogType(AlertDialogType.SELECT_QUESTIONS);
            canSave = false;
        }

        if (canSave) {
            const data = new CreateEditExamRequest(
                currentExam?.id,
                subject,
                teacher,
                teachingGrade,
                classOfStudents,
                date!,
                randomQuestionsOrder,
                examQuestions.map(
                    (examQuestion) => new CreateEditExamQuestionRequest(
                        examQuestion.question.id,
                        examQuestion.value,
                        examQuestion.order
                    )
                ));

            setSaving(true);

            if (isNewExam) {
                try {
                    await createExamService(data);

                    router.push('/');
                } catch (error) {
                    displaySnackbar("Ocorreu um erro ao salvar a avaliação. Tente novamente.");
                } finally {
                    setSaving(false);
                }
            } else {
                try {
                    const updatedExam = await updateExamService(data);

                    setCurrentExam(updatedExam);
                    updateDataFromExam(updatedExam);

                    displaySnackbar("Avaliação atualizada com sucesso.");

                    setIsEditing(false);
                } catch (error) {
                    displaySnackbar("Ocorreu um erro ao salvar a avaliação. Tente novamente.");
                } finally {
                    setSaving(false);
                }
            }
        }
    }

    const downloadExam = async (exam: ExamResponse, pageSize: PageSize, copies: number) => {
        const data = await downloadExamService(exam.id, pageSize, copies);

        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", "exam.pdf");
        document.body.appendChild(link);

        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
    }

    return (<Box>
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" sx={{mr: 2}}>
                        <ArrowBack onClick={goBack}/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {isNewExam && ('Nova Avaliação')}
                        {!isNewExam && (isEditing ? 'Editar Avaliação' : 'Visualizar Avaliação')}
                    </Typography>

                    {isReadOnly() && (<IconButton size="large" edge="end" color="inherit">
                        <Download onClick={() => setShowDownloadExamDialog(true)}/>
                    </IconButton>)}

                    {isReadOnly() && (<IconButton size="large" edge="end" color="inherit" sx={{ml: 2}}>
                        <Edit onClick={() => {
                            setIsEditing(true);
                        }}/>
                    </IconButton>)}

                    {!isReadOnly() && (<IconButton size="large" edge="end" color="inherit">
                        <Save onClick={save}/>
                    </IconButton>)}

                    {!isReadOnly() && !isNewExam && (<IconButton size="large" edge="end" color="inherit" sx={{ml: 2}}>
                        <Cancel onClick={() => {
                            if (isUnsaved()) {
                                setCancelConfirmationDialogPayload({});
                                setShowCancelConfirmationDialog(true);
                            } else {
                                setIsEditing(false);
                            }
                        }}/>
                    </IconButton>)}
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
                        disabled={isReadOnly()}
                        sx={{
                            width: 200,
                            marginTop: 1
                        }}
                        inputProps={{
                            name: 'subjectField',
                            id: 'subjectField',
                        }}
                        value={subject}
                        onChange={(event) => {
                            const selectedSubject = availableSubjects.find(
                                (subject) => subject.id === event.target.value
                            )

                            if (examQuestions.length == 0) {
                                setSubject(selectedSubject?.id ?? 0);
                            } else {
                                setChangeSubjectConfirmationDialogPayload(selectedSubject);
                                setShowChangeSubjectConfirmationDialog(true);
                            }
                        }}>
                    {availableSubjects.map(subject => (
                        <MenuItem key={subject.id}
                                  value={subject.id}>
                            {subject.name}
                        </MenuItem>
                    ))}
                </Select>
                {subjectError && (<FormHelperText>Selecione uma matéria</FormHelperText>)}
            </FormControl>

            <FormControl fullWidth={true} error={teacherError}>
                <InputLabel id="teacherLabel"
                            variant="outlined"
                            htmlFor="teacherField"
                            sx={{marginTop: 2}}>
                    Professor
                </InputLabel>
                <Select variant="outlined"
                        labelId="teacherLabel"
                        disabled={isReadOnly()}
                        sx={{
                            width: 400,
                            marginTop: 3
                        }}
                        inputProps={{
                            name: 'teacherField',
                            id: 'teacherField',
                        }}
                        value={teacher}
                        onChange={(event) => {
                            const selectedTeacher = availableTeachers.find(
                                (teacher) => teacher.id === event.target.value
                            )

                            setTeacher(selectedTeacher?.id ?? 0);
                        }}>
                    {availableTeachers.map(teacher => (
                        <MenuItem key={teacher.id}
                                  value={teacher.id}>
                            {teacher.name}
                        </MenuItem>
                    ))}
                </Select>
                {teacherError && (<FormHelperText>Selecione um professor</FormHelperText>)}
            </FormControl>

            <FormControl fullWidth={true} error={teachingLevelError}>
                <InputLabel id="teachingLevelLabel"
                            variant="outlined"
                            htmlFor="teachingLevelField"
                            sx={{marginTop: 2}}>
                    Nível
                </InputLabel>
                <Select variant="outlined"
                        labelId="teachingLevelLabel"
                        disabled={isReadOnly()}
                        sx={{
                            width: 400,
                            marginTop: 3
                        }}
                        inputProps={{
                            name: 'teachingLevelField',
                            id: 'teachingLevelField',
                        }}
                        value={teachingLevel}
                        onChange={(event) => {
                            if (examQuestions.length == 0) {
                                changeTeachingLevel(event.target.value);
                            } else {
                                const selectedTeachingLevel = availableTeachingLevels.find(
                                    (teachingLevel) => teachingLevel.id === event.target.value
                                );

                                setChangeTeachingLevelConfirmationDialogPayload(selectedTeachingLevel);
                                setShowChangeTeachingLevelConfirmationDialog(true);
                            }
                        }}>
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
                        labelId="teachingGradeLabel"
                        disabled={isReadOnly()}
                        sx={{
                            width: 400,
                            marginTop: 3
                        }}
                        inputProps={{
                            name: 'teachingGradeField',
                            id: 'teachingGradeField',
                        }}
                        value={teachingGrade}
                        onChange={(event) => {
                            if (examQuestions.length == 0) {
                                changeTeachingGrade(event.target.value);
                            } else {
                                const selectedTeachingGrade = availableTeachingGrades.find(
                                    (teachingGrade) => teachingGrade.id === event.target.value
                                );

                                setChangeTeachingGradeConfirmationDialogPayload(selectedTeachingGrade);
                                setShowChangeTeachingGradeConfirmationDialog(true);
                            }
                        }}>
                    {availableTeachingGrades.map(teachingGrade => (
                        <MenuItem key={teachingGrade.id}
                                  value={teachingGrade.id}>
                            {teachingGrade.name}
                        </MenuItem>
                    ))}
                </Select>
                {teachingGradeError && (<FormHelperText>Selecione um ano</FormHelperText>)}
            </FormControl>

            <FormControl fullWidth={true} error={classOfStudentsError}>
                <TextField variant="outlined"
                           disabled={isReadOnly()}
                           label="Turma"
                           error={classOfStudentsError}
                           slotProps={{
                               htmlInput: {
                                   maxLength: 100
                               }
                           }}
                           sx={{
                               width: 150,
                               marginTop: 3
                           }}
                           value={classOfStudents}
                           onChange={(event) => {
                               setClassOfStudents(event.target.value)
                           }}/>
                {classOfStudentsError && (<FormHelperText>Informe a turma de alunos</FormHelperText>)}
            </FormControl>

            <FormControl fullWidth={true} error={dateError}>
                <DatePicker format="dd-MM-yyyy"
                            label="Data de Aplicação"
                            disabled={isReadOnly()}
                            value={date}
                            onChange={(event) => {
                                setDate(event);
                            }}
                            sx={{
                                width: 150,
                                marginTop: 2
                            }}/>
                {dateError && (<FormHelperText>{
                    (date == null) ? "Informe a data de aplicação da avaliação" : "Informe uma data futura para a aplicação da avaliação"}
                </FormHelperText>)}


            </FormControl>

            <FormControlLabel control={<Switch checked={randomQuestionsOrder}/>}
                              label="Questões em ordem aleatória"
                              disabled={isReadOnly()}
                              onChange={(event) => {
                                  // @ts-ignore
                                  setRandomQuestionsOrder(event.target.checked);
                              }}
                              sx={{
                                  marginTop: 2
                              }}/>

            <Box sx={{marginTop: 2}}>
                <Typography variant="subtitle1">
                    Pontuação da avaliação:&nbsp;
                    {examQuestions.reduce((sum, examQuestion) => sum + examQuestion.value, 0)}
                </Typography>
            </Box>

            <Box sx={{marginTop: 2}}>
                <Button disabled={isReadOnly()} onClick={() => {
                    if (subject == 0) {
                        setAlertDialogType(AlertDialogType.SELECT_SUBJECT_FIRST);
                    } else if (teachingLevel == 0) {
                        setAlertDialogType(AlertDialogType.SELECT_TEACHING_LEVEL_FIRST);
                    } else if (teachingGrade == 0) {
                        setAlertDialogType(AlertDialogType.SELECT_TEACHING_GRADE_FIRST);
                    } else {
                        setSelectedSubject(availableSubjects.find((s) => s.id == subject));
                        setSelectedTeachingGrade(availableTeachingGrades.find((tg) => tg.id == teachingGrade));

                        setShowQuestionBrowserDialog(true);
                    }
                }}>Adicionar questão</Button>
            </Box>

            {examQuestions.map((question, index) => (
                <Paper elevation={1}
                       key={question.question.id}
                       sx={{
                           marginTop: 2,
                           padding: 1
                       }}>
                    <QuestionStatement question={question}/>

                    <Box sx={{marginTop: 1, width: '100%'}} display="flex" alignItems="center">
                        <Box sx={{width: '50%'}}
                             display="flex"
                             alignItems="center">
                            <NumberSpinner size="small"
                                           min={0}
                                           max={100}
                                           step={0.25}
                                           label="Pontuação"
                                           value={question.value}
                                           onValueChange={(event) => {
                                               if (event != null) {
                                                   updateQuestionValue(question.question.id, event);
                                               }
                                           }}
                                           disabled={isReadOnly()}/>
                        </Box>
                        <Box sx={{width: '50%'}}
                             display="flex"
                             justifyContent="flex-end"
                             alignItems="center">
                            <Button disabled={isReadOnly()} onClick={() => {
                                setDeleteQuestionConfirmationDialogPayload(question.question);
                                setShowDeleteQuestionConfirmationDialog(true);
                            }}>Excluir</Button>

                            {(index != 0) && (examQuestions.length > 1) && (
                                <Button disabled={isReadOnly()} onClick={() => moveQuestionUp(question.question)}>
                                    Mover para cima
                                </Button>)}

                            {(index != examQuestions.length - 1) && (examQuestions.length > 1) && (
                                <Button disabled={isReadOnly()} onClick={() => moveQuestionDown(question.question)}>
                                    Mover para baixo
                                </Button>)}
                        </Box>
                    </Box>
                </Paper>
            ))}

            {(examQuestions.length == 0) && (
                <EmptyMessage emptyMessage="Adicione questões à avaliação" sx={{marginTop: 4}}/>)}
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
            <ErrorMessage errorMessage="Ocorreu um erro ao carregar as informações para criação da avaliação."/>

            <Button sx={{marginTop: 4}} onClick={() => {
                setLoading(true);
                setLoadingError(false);
            }}>
                Tentar Novamente
            </Button>
        </Box>)}

        <AlertDialog showDialog={alertDialogType !== undefined}
                     onClose={() => setAlertDialogType(undefined)}
                     title="Atenção"
                     message={getAlertDialogMessage(alertDialogType)}/>

        {(selectedSubject !== undefined) && (selectedTeachingGrade !== undefined) && (
            <QuestionBrowserDialog showDialog={showQuestionBrowserDialog}
                                   onClose={() => setShowQuestionBrowserDialog(false)}
                                   subject={selectedSubject}
                                   teachingGrade={selectedTeachingGrade}
                                   onQuestionSelected={addQuestions}/>)}

        {(deleteQuestionConfirmationDialogPayload) && (
            <ConfirmationDialog showDialog={showDeleteQuestionConfirmationDialog}
                                payload={deleteQuestionConfirmationDialogPayload}
                                onConfirm={(question) => {
                                    deleteQuestion(question as QuestionResponse);
                                }}
                                onClose={() => setShowDeleteQuestionConfirmationDialog(false)}
                                title="Excluir Questão"
                                message="Deseja realmente excluir a questão da avaliação?"/>)}

        {(changeSubjectConfirmationDialogPayload) && (
            <ConfirmationDialog showDialog={showChangeSubjectConfirmationDialog}
                                payload={changeSubjectConfirmationDialogPayload}
                                onConfirm={(subject) => {
                                    setSubject((subject as SubjectResponse).id);
                                    setExamQuestions([]);
                                }}
                                onClose={() => setShowChangeSubjectConfirmationDialog(false)}
                                title="Alterar matéria"
                                message="Ao alterar a matéria, todas as questões serão apagadas. Deseja continuar?"
                                confirmButtonText="Alterar"/>)}

        {(changeTeachingLevelConfirmationDialogPayload) && (
            <ConfirmationDialog showDialog={showChangeTeachingLevelConfirmationDialog}
                                payload={changeTeachingLevelConfirmationDialogPayload}
                                onConfirm={(teachingLevel) => {
                                    changeTeachingLevel((teachingLevel as TeachingLevelResponse).id);
                                }}
                                onClose={() => setShowChangeTeachingLevelConfirmationDialog(false)}
                                title="Alterar nível"
                                message="Ao alterar o nível, todas as questões serão apagadas. Deseja continuar?"
                                confirmButtonText="Alterar"/>)}

        {(changeTeachingGradeConfirmationDialogPayload) && (
            <ConfirmationDialog showDialog={showChangeTeachingGradeConfirmationDialog}
                                payload={changeTeachingGradeConfirmationDialogPayload}
                                onConfirm={(teachingGrade) => {
                                    changeTeachingGrade((teachingGrade as TeachingGradeResponse).id);
                                }}
                                onClose={() => setShowChangeTeachingGradeConfirmationDialog(false)}
                                title="Alterar nível"
                                message="Ao alterar o ano, todas as questões serão apagadas. Deseja continuar?"
                                confirmButtonText="Alterar"/>)}

        {(goBackConfirmationDialogPayload) && (
            <ConfirmationDialog showDialog={showGoBackConfirmationDialog}
                                payload={goBackConfirmationDialogPayload}
                                onConfirm={() => {
                                    setGoBackConfirmationDialogPayload(undefined);
                                    router.push('/');
                                }}
                                onClose={() => setShowGoBackConfirmationDialog(false)}
                                title="Voltar"
                                message="Os dados da avaliação não foram salvos. Deseja voltar para a lista de avaliações?"
                                confirmButtonText="Voltar"/>)}

        {(cancelConfirmationDialogPayload) && (
            <ConfirmationDialog showDialog={showCancelConfirmationDialog}
                                payload={cancelConfirmationDialogPayload}
                                onConfirm={() => {
                                    setCancelConfirmationDialogPayload(undefined);
                                    updateDataFromExam(undefined);
                                    setIsEditing(false);
                                }}
                                onClose={() => setShowCancelConfirmationDialog(false)}
                                title="Descartar Edição"
                                message="Os dados da avaliação não foram salvos. Deseja descartar a edição da avaliação?"
                                confirmButtonText="Descartar"/>)}

        {currentExam && (<DownloadExamDialog showDialog={showDownloadExamDialog}
                                             exam={currentExam}
                                             onDownloadExam={downloadExam}
                                             onClose={() => setShowDownloadExamDialog(false)}/>)};

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

enum AlertDialogType {
    SELECT_SUBJECT_FIRST,
    SELECT_TEACHING_LEVEL_FIRST,
    SELECT_TEACHING_GRADE_FIRST,
    SELECT_QUESTIONS
}
