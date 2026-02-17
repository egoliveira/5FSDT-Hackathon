package com.question.backend.domain.service

import com.question.backend.domain.repository.SubjectRepository
import com.question.backend.domain.vo.Subject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SubjectService(
    @Autowired val subjectRepository: SubjectRepository
) {
    fun getAll(): List<Subject> {
        return subjectRepository.getAll()
    }

    fun getById(subjectId: Long): Subject? {
        return subjectRepository.getById(subjectId)
    }
}