package com.question.backend.data.mapper

import com.question.backend.data.entity.ExamEntity
import com.question.backend.domain.vo.Exam
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.time.ZonedDateTime

@Component
class ExamMapper(
    @Autowired private val subjectMapper: SubjectMapper,
    @Autowired private val teacherMapper: TeacherMapper,
    @Autowired private val teachingGradeMapper: TeachingGradeMapper,
    @Autowired private val questionMapper: QuestionMapper,
) {
    fun fromEntity(entity: ExamEntity): Exam {
        return Exam(
            entity.id,
            subjectMapper.fromEntity(entity.subject),
            teacherMapper.fromEntity(entity.teacher),
            teachingGradeMapper.fromEntity(entity.teachingGrade),
            entity.classOfStudents,
            entity.date,
            entity.randomQuestionsOrder,
            emptyList(),
            entity.createdAt,
            entity.updatedAt
        )
    }

    fun toEntity(exam: Exam): ExamEntity {
        return ExamEntity(
            exam.id,
            subjectMapper.toEntity(exam.subject),
            teacherMapper.toEntity(exam.teacher),
            teachingGradeMapper.toEntity(exam.teachingGrade),
            exam.classOfStudents,
            exam.date,
            exam.randomQuestionsOrder,
            exam.createdAt ?: ZonedDateTime.now(),
            exam.updatedAt ?: ZonedDateTime.now()
        )
    }
}