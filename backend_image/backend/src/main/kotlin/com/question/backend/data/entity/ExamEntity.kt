package com.question.backend.data.entity

import jakarta.persistence.*
import java.time.LocalDate
import java.time.ZonedDateTime

@Entity
@Table(name = "exam")
data class ExamEntity(
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    val subject: SubjectEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    val teacher: TeacherEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teaching_grade_id", nullable = false)
    val teachingGrade: TeachingGradeEntity,

    @Column(name = "class_of_students", nullable = false)
    val classOfStudents: String,

    @Column(name = "date", nullable = false)
    val date: LocalDate,

    @Column(name = "random_questions_order", nullable = false)
    val randomQuestionsOrder: Boolean,

    @Column(name = "created_at", nullable = false)
    val createdAt: ZonedDateTime,

    @Column(name = "updated_at", nullable = false)
    val updatedAt: ZonedDateTime
)
