package com.question.backend.data.entity

import jakarta.persistence.*

@Entity
@Table(name = "teaching_level")
data class TeachingLevelEntity(
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(name = "name", nullable = false, unique = true)
    val name: String,

    @Column(name = "order", nullable = false, unique = true)
    val order: Int
)
