package com.question.backend.data.entity

import jakarta.persistence.*

@Entity
@Table(name = "teaching_grade")
data class TeachingGradeEntity(
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(name = "name", nullable = false, unique = true)
    val name: String,

    @Column(name = "order", nullable = false, unique = true)
    val order: Int,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teaching_level_id", nullable = false)
    val teachingLevel: TeachingLevelEntity
)
