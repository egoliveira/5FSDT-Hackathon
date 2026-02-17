INSERT INTO teaching_level (name, "order")
VALUES ('Ensino Fundamental', 1);
INSERT INTO teaching_level (name, "order")
VALUES ('Ensino Médio', 2);

INSERT INTO teaching_grade (name, "order", teaching_level_id)
VALUES ('Primeiro Ano', 1, (SELECT id FROM teaching_level WHERE name = 'Ensino Fundamental'));
INSERT INTO teaching_grade (name, "order", teaching_level_id)
VALUES ('Segundo Ano', 2, (SELECT id FROM teaching_level WHERE name = 'Ensino Fundamental'));
INSERT INTO teaching_grade (name, "order", teaching_level_id)
VALUES ('Terceiro Ano', 3, (SELECT id FROM teaching_level WHERE name = 'Ensino Fundamental'));
INSERT INTO teaching_grade (name, "order", teaching_level_id)
VALUES ('Quarto Ano', 4, (SELECT id FROM teaching_level WHERE name = 'Ensino Fundamental'));
INSERT INTO teaching_grade (name, "order", teaching_level_id)
VALUES ('Quinto Ano', 5, (SELECT id FROM teaching_level WHERE name = 'Ensino Fundamental'));
INSERT INTO teaching_grade (name, "order", teaching_level_id)
VALUES ('Sexto Ano', 6, (SELECT id FROM teaching_level WHERE name = 'Ensino Fundamental'));
INSERT INTO teaching_grade (name, "order", teaching_level_id)
VALUES ('Sétimo Ano', 7, (SELECT id FROM teaching_level WHERE name = 'Ensino Fundamental'));
INSERT INTO teaching_grade (name, "order", teaching_level_id)
VALUES ('Oitavo Ano', 8, (SELECT id FROM teaching_level WHERE name = 'Ensino Fundamental'));
INSERT INTO teaching_grade (name, "order", teaching_level_id)
VALUES ('Nono Ano', 9, (SELECT id FROM teaching_level WHERE name = 'Ensino Fundamental'));

INSERT INTO teaching_grade (name, "order", teaching_level_id)
VALUES ('Primeiro Ano', 10, (SELECT id FROM teaching_level WHERE name = 'Ensino Médio'));
INSERT INTO teaching_grade (name, "order", teaching_level_id)
VALUES ('Segundo Ano', 11, (SELECT id FROM teaching_level WHERE name = 'Ensino Médio'));
INSERT INTO teaching_grade (name, "order", teaching_level_id)
VALUES ('Terceiro Ano', 12, (SELECT id FROM teaching_level WHERE name = 'Ensino Médio'));