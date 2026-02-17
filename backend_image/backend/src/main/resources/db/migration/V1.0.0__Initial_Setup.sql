CREATE OR REPLACE FUNCTION update_modified_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE subject
(
    id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    name VARCHAR(100)                                    NOT NULL
);

CREATE TABLE teacher
(
    id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    name VARCHAR(255)                                    NOT NULL
);

CREATE TABLE teaching_level
(
    id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    name    VARCHAR(255)                                    NOT NULL,
    "order" INTEGER                                         NOT NULL
);

CREATE TABLE teaching_grade
(
    id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    name              VARCHAR(255)                                    NOT NULL,
    "order"           INTEGER                                         NOT NULL,
    teaching_level_id INTEGER                                         NOT NULL,
    FOREIGN KEY (teaching_level_id) REFERENCES teaching_level (id)
);

CREATE TABLE question
(
    id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    subject_id        BIGINT                                          NOT NULL REFERENCES subject (id),
    teaching_grade_id BIGINT                                          NOT NULL REFERENCES teaching_grade (id),
    text              TEXT                                            NOT NULL,
    created_at        TIMESTAMP WITH TIME ZONE                        NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMP WITH TIME ZONE                        NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_question_updated_at
    BEFORE UPDATE
    ON question
    FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TABLE essay_question
(
    id              BIGINT PRIMARY KEY NOT NULL REFERENCES question (id),
    lines_to_answer INT                NOT NULL,
    answer          TEXT               NOT NULL
);

CREATE TABLE multiple_choice_question
(
    id BIGINT PRIMARY KEY NOT NULL REFERENCES question (id)
);

CREATE TABLE multiple_choice_question_choice
(
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    text        TEXT                                            NOT NULL,
    "order"     INT                                             NOT NULL,
    question_id BIGINT                                          NOT NULL REFERENCES multiple_choice_question (id),
    answer      BOOLEAN                                         NOT NULL DEFAULT false
);

CREATE TABLE exam
(
    id                     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    subject_id             BIGINT                                          NOT NULL REFERENCES subject (id),
    teacher_id             BIGINT                                          NOT NULL REFERENCES teacher (id),
    teaching_grade_id      BIGINT                                          NOT NULL REFERENCES teaching_grade (id),
    class_of_students      VARCHAR(100)                                    NOT NULL,
    date                   DATE                                            NOT NULL,
    random_questions_order BOOLEAN                                         NOT NULL,
    created_at             TIMESTAMP WITH TIME ZONE                        NOT NULL DEFAULT NOW(),
    updated_at             TIMESTAMP WITH TIME ZONE                        NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_exam_updated_at
    BEFORE UPDATE
    ON exam
    FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TABLE exam_question
(
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    exam_id     BIGINT                                          NOT NULL REFERENCES exam (id),
    question_id BIGINT                                          NOT NULL REFERENCES question (id),
    "order"     INT                                             NOT NULL,
    value       FLOAT                                           NOT NULL
);