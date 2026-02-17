package com.question.backend.data.repository

import com.question.backend.data.dao.TeacherDAO
import com.question.backend.data.mapper.TeacherMapper
import com.question.backend.domain.repository.TeacherRepository
import com.question.backend.domain.vo.Teacher
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class TeacherRepositoryImpl(
    @Autowired private val teacherDAO: TeacherDAO,
    @Autowired private val teacherMapper: TeacherMapper
) : TeacherRepository {
    override fun getAll(): List<Teacher> {
        return teacherDAO.findAllByOrderByName().map { teacherMapper.fromEntity(it) }
    }

    override fun getById(teacherId: Long): Teacher? {
        val teacher = teacherDAO.findById(teacherId)

        return if (teacher.isPresent) {
            teacherMapper.fromEntity(teacher.get())
        } else null
    }
}