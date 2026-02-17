'use client';
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import ExamListResponse from "@/model/exam/ExamListResponse";
import {examsService} from "@/services/exam/exams_service";
import {Box, Container, Fab, Paper} from "@mui/material";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {SubjectResponse} from "@/model/subject/SubjectResponse";
import {TeachingGradeResponse} from "@/model/teachinggrade/TeachingGradeResponse";
import {TeacherResponse} from "@/model/teacher/TeacherResponse";
import {format} from "date-fns";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingIndicator from "@/components/LoadingIndicator";
import AddIcon from "@mui/icons-material/Add";
import EmptyMessage from "@/components/EmptyMessage";

export default function Home() {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [exams, setExams] = useState<ExamListResponse>(new ExamListResponse([], true, true, true, 0, 0, 0, 0, 0));
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const tableColumns: GridColDef<(typeof exams.content)[number]>[] = [
        {
            field: 'subject',
            headerName: 'Matéria',
            valueGetter: (v: SubjectResponse) => v.name,
            minWidth: 180
        },
        {
            field: 'teachingGrade',
            headerName: 'Ano',
            valueGetter: (v: TeachingGradeResponse) => `${v.teachingLevel.name} - ${v.name}`,
            minWidth: 220
        },
        {
            field: 'classOfStudents',
            headerName: 'Turma',
            minWidth: 100
        },
        {
            field: 'teacher',
            headerName: 'Professor',
            valueGetter: (v: TeacherResponse) => v.name,
            minWidth: 250
        },
        {
            field: 'date',
            headerName: 'Data de Aplicação',
            valueGetter: (v: Date) => format(v, 'dd/MM/yyyy'),
            minWidth: 120
        },
    ]

    useEffect(() => {
        const initialize = async () => {
            setError(false);
            setLoading(true);

            try {
                const examResponse = await examsService(page, pageSize);

                setExams(examResponse);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        initialize();
    }, [page, pageSize]);

    return (<Container maxWidth="xl" sx={{marginTop: 4}}>
        {!loading && !error && (exams.totalElements > 0) && (
            <Paper>
                <DataGrid rows={exams.content}
                          columns={tableColumns}
                          disableColumnMenu={true}
                          disableColumnSorting={true}
                          disableRowSelectionOnClick={true}
                          pageSizeOptions={[10, 20, 30, 50]}
                          paginationModel={{
                              pageSize: exams.size,
                              page: exams.number
                          }}
                          onRowClick={(params) => router.push(`/exam/${params.row.id}`)}
                          onPaginationModelChange={(model) => {
                              setPage(model.page);
                              setPageSize(model.pageSize);
                          }}/>
            </Paper>
        )}

        {!loading && !error && (<Box
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
            }}>
            <Fab color="primary" onClick={() => router.push('/exam/create')}>
                <AddIcon/>
            </Fab>
        </Box>)}

        {loading && !error && (<LoadingIndicator/>)}

        {!loading && !error && (exams.totalElements == 0) && (
            <EmptyMessage sx={{marginTop: 4}}
                          emptyMessage="Nenhuma avaliação encontrada"/>)}

        {!loading && error && (
            <ErrorMessage sx={{marginTop: 4}}
                          errorMessage="Ocorreu um erro ao carregar as avaliações"/>)}
    </Container>);
}