DO
$$
    DECLARE
        subjectId       BIGINT;
        teacherId       BIGINT;
        teachingLevelId BIGINT;
        teachingGradeId BIGINT;
        examId          BIGINT;
        questionRecord  RECORD;
        index           INTEGER := 0;
        questionValue   FLOAT;
    BEGIN
        SELECT id INTO subjectId FROM subject WHERE name = 'Química';

        SELECT id INTO teacherId FROM teacher WHERE name = 'Professor de Química';

        SELECT id INTO teachingLevelId FROM teaching_level WHERE name = 'Ensino Médio';

        SELECT tg.id
        INTO teachingGradeId
        FROM teaching_grade AS tg
        WHERE tg.name = 'Terceiro Ano'
          AND tg.teaching_level_id = teachingLevelId;

        INSERT INTO exam (subject_id, teacher_id, teaching_grade_id, class_of_students, date, random_questions_order)
        VALUES (subjectId, teacherId, teachingGradeId, '3M A', '2026-02-25', true)
        RETURNING id INTO examId;

        FOR questionRecord IN SELECT id
                              FROM question
                              WHERE subject_id = subjectId
                                AND teaching_grade_id = teachingGradeId
                              LIMIT 7
            LOOP
                index := index + 1;

                CASE
                    WHEN index <= 4 THEN questionValue := 1;
                    ELSE questionValue := 2;
                    END CASE;

                INSERT INTO exam_question (exam_id, question_id, "order", value)
                VALUES (examId, questionRecord.id, index, questionValue);
            END LOOP;
    END
$$;
