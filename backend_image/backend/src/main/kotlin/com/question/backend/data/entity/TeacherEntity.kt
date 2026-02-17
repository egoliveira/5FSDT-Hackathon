package com.question.backend.data.entity

import jakarta.persistence.*

@Entity
@Table(name = "teacher")
data class TeacherEntity(
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(name = "name", nullable = false, unique = true)
    val name: String
)
