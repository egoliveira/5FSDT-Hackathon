package com.question.backend.domain.service

import com.question.backend.domain.repository.TeacherRepository
import com.question.backend.domain.vo.Teacher
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TeacherService(
    @Autowired val teacherRepository: TeacherRepository
) {
    fun getAll(): List<Teacher> {
        return teacherRepository.getAll()
    }

    fun getById(teacherId: Long): Teacher? {
        return teacherRepository.getById(teacherId)
    }
}