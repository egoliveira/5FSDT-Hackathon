DO
$$
    DECLARE
        question_id     BIGINT;
        subjectId       BIGINT;
        teachingLevelId BIGINT;
        teachingGradeId BIGINT;
    BEGIN
        SELECT id INTO subjectId FROM subject WHERE name = 'Química';

        SELECT id INTO teachingLevelId FROM teaching_level WHERE name = 'Ensino Médio';

        SELECT tg.id
        INTO teachingGradeId
        FROM teaching_grade AS tg
        WHERE tg.name = 'Terceiro Ano'
          AND tg.teaching_level_id = teachingLevelId;

        INSERT INTO question (subject_id, teaching_grade_id, text)
        VALUES (subjectId,
                teachingGradeId,
                '(UCPEL 2004) Os principais combustíveis usados atualmente pelo ser humano são obtidos por meio da destilação fracionada do petróleo. Assinale a alternativa que mostra um combustível de uso muito comum no Brasil, que não é obtido a partir do petróleo.')
        RETURNING id INTO question_id;

        INSERT INTO multiple_choice_question(id) VALUES (question_id);

        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('H₃C-CHOHCH₃', 1, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Na₂CO₃', 2, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('H₃C-CH₂-OH', 3, question_id, true);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('C₆H₆', 4, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('C₈H₁₈', 5, question_id, false);

        /* ----------------- */

        INSERT INTO question (subject_id, teaching_grade_id, text)
        VALUES (subjectId,
                teachingGradeId,
                '(UCPEL 2004) Aquecendo, juntos, ácido benzóico e etanol, podemos esperar a formação de:')
        RETURNING id INTO question_id;

        INSERT INTO multiple_choice_question(id) VALUES (question_id);

        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Sal e água', 1, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Éster e água', 2, question_id, true);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Cetona e água', 3, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Aldeído e água', 4, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Éter e água', 5, question_id, false);

        /* ----------------- */

        INSERT INTO question (subject_id, teaching_grade_id, text)
        VALUES (subjectId,
                teachingGradeId,
                '(UCPEL 2004) Uma massa de 750 mg de NaOH comercial foi dissolvida em água e neutralizada com 27 mL de uma solução 0,5 N de H₂SO₄. Que porcentagem de pureza tem o hidróxido de sódio?')
        RETURNING id INTO question_id;

        INSERT INTO multiple_choice_question(id) VALUES (question_id);

        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('54%', 1, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('30%', 2, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('27%', 3, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('49%', 4, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('72%', 5, question_id, true);

        /* ----------------- */

        INSERT INTO question (subject_id, teaching_grade_id, text)
        VALUES (subjectId,
                teachingGradeId,
                '(UCPEL 2004) Um químico abriu um frasco de ácido clorídrico concentrado perto de um colega que utilizava hidróxido de amônio. Depois de algum tempo verificou que na superfície da bancada havia pequenos pontos brancos. Este material branco poderia ser:')
        RETURNING id INTO question_id;

        INSERT INTO multiple_choice_question(id) VALUES (question_id);

        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Nitrogênio', 1, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Amônia', 2, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Ácido Nítrico', 3, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Cloro', 4, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Cloreto de Amônio', 5, question_id, true);

        /* ----------------- */

        INSERT INTO question (subject_id, teaching_grade_id, text)
        VALUES (subjectId,
                teachingGradeId,
                '(UCPEL 2004) A combustão completa do pentano é representada, qualitativamente, pela seguinte equação' ||
                CHR(10) ||
                'C₅H₁₂(G) + O₂(G) -> CO₂(G) + H₂O(G)' || CHR(10) ||
                'Partindo da equação química ajustada e estabelecendo um consumo de 1,5 mols de pentano em 30 minutos de reação, pode-se concluir que a velocidade da reação, em mols de gás carbônico por minuto, é')
        RETURNING id INTO question_id;

        INSERT INTO multiple_choice_question(id) VALUES (question_id);

        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('0,25', 1, question_id, true);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('0,05', 2, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('0,15', 3, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('0,30', 4, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('7,50', 5, question_id, false);

        /* ----------------- */

        INSERT INTO question (subject_id, teaching_grade_id, text)
        VALUES (subjectId,
                teachingGradeId,
                '(UCPEL 2004) O volume de SO₂ gasoso, medido nas CNTP, necessário para transformar 250 mL de solução aquosa 0,100 mol/L de NaOH em solução de Na₂SO₃(aq) é:')
        RETURNING id INTO question_id;

        INSERT INTO multiple_choice_question(id) VALUES (question_id);

        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('1,12L', 1, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('0,56L', 2, question_id, true);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('0,14L', 3, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('0,28L', 4, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('2,24L', 5, question_id, false);

        /* ----------------- */

        INSERT INTO question (subject_id, teaching_grade_id, text)
        VALUES (subjectId,
                teachingGradeId,
                '(UCPEL 2004) Segundo dados experimentais, o oxigênio do ar que respiramos contém exatos 99,759% de ₈Oⁱ⁶, 0,037% de átomos de ₈Oⁱ⁷ e 0,204% de átomos de ₈Oⁱ⁸. Diante desta constatação, pode-se afirmar que essas três formas naturais de oxigênio constituem átomos que, entre si, são:')
        RETURNING id INTO question_id;

        INSERT INTO multiple_choice_question(id) VALUES (question_id);

        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Isóbaros', 1, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Isômeros', 2, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Isótopos', 3, question_id, true);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Isótonos', 4, question_id, false);
        INSERT INTO multiple_choice_question_choice(text, "order", question_id, answer)
        VALUES ('Alótropos', 5, question_id, false);
    END
$$;

