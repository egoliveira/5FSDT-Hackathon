package com.question.backend.data.entity

import jakarta.persistence.*
import java.io.Serializable
import java.time.ZonedDateTime

@Entity
@Table(name = "question")
@Inheritance(strategy = InheritanceType.JOINED)
abstract class QuestionEntity(
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    open var id: Long,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    open var subject: SubjectEntity,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teaching_grade_id", nullable = false)
    open var teachingGrade: TeachingGradeEntity,

    @Column(name = "text", nullable = false)
    open var text: String,

    @Column(name = "created_at", nullable = true)
    open var createdAt: ZonedDateTime?,

    @Column(name = "updated_at", nullable = true)
    open var updatedAt: ZonedDateTime?
) : Serializable
