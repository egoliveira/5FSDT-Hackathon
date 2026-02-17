DO
$$
    DECLARE
        question_id     BIGINT;
        subjectId       BIGINT;
        teachingLevelId BIGINT;
        teachingGradeId BIGINT;
    BEGIN
        SELECT id INTO subjectId FROM subject WHERE name = 'Português';

        SELECT id INTO teachingLevelId FROM teaching_level WHERE name = 'Ensino Médio';

        SELECT tg.id
        INTO teachingGradeId
        FROM teaching_grade AS tg
        WHERE tg.name = 'Terceiro Ano'
          AND tg.teaching_level_id = teachingLevelId;

        INSERT INTO question (subject_id, teaching_grade_id, text)
        VALUES (subjectId,
                teachingGradeId,
                '(UNICAMP 2004) Em matéria recentemente publicada no Caderno Sinapse da Folha de S. Paulo, é ' ||
                'apresentada uma definição de media training: ensinar profissionais a lidarem com a imprensa e se ' ||
                'saírem bem nas entrevistas. Na parte final da reportagem, o jornalista faz a seguinte ressalva:' ||
                CHR(10) || 'O “media training” não se restringe a corporações. A Universidade X distribui para seus ' ||
                'profissionais uma cartilha com dicas para que professores e médicos possam ter um bom ' ||
                'relacionamento com a imprensa. Ironicamente intitulado de “Corra que a Imprensa vem aí”, o manual ' ||
                'aponta gafes cometidas e dá dicas sobre a melhor forma de atender um repórter. (Adaptado de ' ||
                'Vinícius Queiroz Galvão, Treinamento antigafe, Caderno Sinapse, 30/09/2003, p. 32).' || CHR(10) ||
                'a) No trecho acima, as aspas são utilizadas em dois momentos diferentes. Transcreva as passagens ' ||
                'entre aspas e explique seu uso em cada uma delas.' || CHR(10) ||
                'b) Podemos relacionar o título da cartilha ' ||
                'com o título em português da conhecida comédia norte-americana “Corra que a polícia vem aí”, que ' ||
                'trata de um inspetor de polícia atrapalhado. Explicite os sentidos da palavra ‘correr’ nos ' ||
                'títulos do filme e do manual.')
        RETURNING id INTO question_id;

        INSERT INTO essay_question(id, lines_to_answer, answer)
        VALUES (question_id,
                10,
                'a) “Media Training”: expressão em língua estrangeira; “Corra que a Imprensa vem aí”: ' ||
                'título de publicação.' || CHR(10) ||
                'b) No título do filme, “correr” significa “fugir”, tratase, portanto, de ' ||
                '“correr de”. No título do manual, depreende-se do contexto irônico que se trata do “correr” no ' ||
                'sentido de “correr para”, referindo-se à preparação para “enfrentar” a imprensa.');

        /* ---------- */

        INSERT INTO question (subject_id, teaching_grade_id, text)
        VALUES (subjectId,
                teachingGradeId,
                '(UNICAMP 2003) MARCAPASSO NATURAL – Uma alternativa menos invasiva pode substituir o implante ' ||
                'do marcapasso eletrônico [...]. Cientistas do Hospital John Hopkins, nos EUA, conseguiram ' ||
                'converter células cardíacas de porquinhos-da-índia em células especializadas, que atuam como um ' ||
                'marcapasso, controlando o ritmo dos batimentos cardíacos. No experimento, o coração dos suínos ' ||
                'recuperou a regularidade dos movimentos. A expectativa é que em alguns anos seja possível testar ' ||
                'a técnica em humanos. (ISTOÉ, 1720, 18/09/2002.)' || CHR(10) ||
                'a) Alguém que nunca tivesse ouvido falar de ' ||
                'marcapasso poderia dar uma definição desse instrumento lendo este texto. Qual é essa definição?' ||
                CHR(10) ||
                'b) A ocorrência da expressão “a técnica”, no final do texto, indica que ela foi explicada ' ||
                'anteriormente. Em que consiste essa técnica?' || CHR(10) ||
                'c) Apesar do nome, o porquinho-da-índia é um roedor. ' ||
                'Sendo assim, há uma forma equivocada de referir-se a ele no texto. Qual é essa forma e como se ' ||
                'explica sua ocorrência?')
        RETURNING id INTO question_id;

        INSERT INTO essay_question(id, lines_to_answer, answer)
        VALUES (question_id,
                10,
                'a) Sim. A definição da atividade ou da função do marcapasso aparece no trecho: “… atuam como ' ||
                'um marcapasso, controlando o ritmo dos batimentos cardíacos”.' || CHR(10) ||
                'b) Trata-se da técnica de conversão ' ||
                'de células cardíacas em células especializadas, “que atuam como um marcapasso”.' || CHR(10) ||
                'c) A referência ' ||
                'equivocada encontra-se no adjetivo “suínos”, aplicável a porcos, mas não a porquinhosda-índia, ' ||
                'que são roedores.');

        /* ---------- */

        INSERT INTO question (subject_id, teaching_grade_id, text)
        VALUES (subjectId,
                teachingGradeId,
                '(UNICAMP 2003) Uma das últimas edições do Jornal Visão de Barão Geraldo trazia em sua seção “Sorria” esta ' ||
                'anedota: No meio de uma visita de rotina, o presidente daquela enorme empresa chega ao setor de ' ||
                'produção e pergunta ao encarregado:' || CHR(10) || '– Quantos funcionários trabalham neste setor?' ||
                CHR(10) || 'Depois de ' ||
                'pensar por alguns segundos, o encarregado responde:' || CHR(10) || '– Mais ou menos a metade!' ||
                CHR(10) || 'a) Explique o que ' ||
                'quis perguntar o presidente da empresa.' || CHR(10) || 'b) Explique o que respondeu o encarregado.' ||
                CHR(10) || 'c) Um dos ' ||
                'sentidos de trabalhar é "estar empregado". Supondo que o encarregado entendesse a fala do ' ||
                'presidente da empresa nesse sentido e quisesse dar uma resposta correta, que resposta teria que dar?')
        RETURNING id INTO question_id;

        INSERT INTO essay_question(id, lines_to_answer, answer)
        VALUES (question_id,
                10,
                'a) O presidente da empresa quis saber qual o número dos funcionários que compunham a equipe ' ||
                'daquele setor.' || CHR(10) ||
                'b) O encarregado, tendo entendido equivocadamente a pergunta como se fosse ' ||
                '“quantos funcionários deste setor de fato trabalham?”, respondeu que apenas a metade dos ' ||
                'funcionários trabalhava, dando a entender que a outra metade cruzava os braços ou se dedicava a ' ||
                'outras atividades.' || CHR(10) ||
                'c) “O dobro dos que trabalham” – dado que só metade dos empregados de fato ' ||
                'trabalhavam.');

        /* ---------- */

        INSERT INTO question (subject_id, teaching_grade_id, text)
        VALUES (subjectId,
                teachingGradeId,
                '(UNICAMP 2003) Mas, a mal, vinha vesprando a hora, o fim do prazo, Miguilim não achava pé em ' ||
                'pensamento onde se firmar, os dias não cabiam dentro do tempo. Tudo era tarde! De siso, devia de ' ||
                'rezar, urgente, montão de rezas. (João Guimarães Rosa, "Campo geral", in Manulezão e Miguilim. ' ||
                'Rio de Janeiro, Editora José Olympio. 1972.)' || CHR(10) ||
                'a) O trecho acima refere-se a uma espécie de acordo ' ||
                'que Miguilim propôs a Deus. Que acordo era esse?' || CHR(10) ||
                'b) Sabendo-se que o acordo se relaciona às perdas ' ||
                'sofridas por Miguilim, cite as duas que mais profundamente o marcaram.' || CHR(10) ||
                'c) Se "vesprando" deriva de ' ||
                '"véspera", que se associa a Vésper (Estrela da Tarde), como se deve interpretar "vinha vesprando a hora"?')
        RETURNING id INTO question_id;

        INSERT INTO essay_question(id, lines_to_answer, answer)
        VALUES (question_id,
                10,
                'a) Seu Deográcias, espécie de curandeiro que perambulava pelo Mutum, diagnosticara que ' ||
                'Miguilim, fraco, abatido, corria risco de vida, de contrair tuberculose. Primeiramente, o menino ' ||
                'recorre à negra Mãitina, mas desiste ao encontrar bêbada a velha mandingueira. Volta-se para Deus e ' ||
                'faz uma espécie de trato: se tivesse de morrer, que fosse no prazo de três dias, dilatado mais ' ||
                'tarde, para dez dias, para permitir uma “novena” de rezas. Se não morresse que, por vontade de Deus, ' ||
                'ficasse curado.' || CHR(10) ||
                'b) As duas perdas que mais profundamente marcaram a “travessia” de Miguilim do ' ||
                'mundo mágico da infância para o mundo adulto foram as experiências com a morte: a do pai, que se ' ||
                'suicidou, e a do irmão mais querido, o Dito, vitimado pelo tétano. A superação dessas duas perdas ' ||
                'foram instantes dolorosamente decisivos no amadurecimento da criança no embate com fatos da vida.' ||
                CHR(10) || '' ||
                'c) O neologismo “vesprando” sugere tanto a noção mais imediata de aproximação temporal, de fazer-se' ||
                ' véspera, como também nos remete à idéia de anoitecer e, metaforicamente, de morrer, associada à ' ||
                '“noite” que a estrela Vésper prenuncia.');

        /* ---------- */

        INSERT INTO question (subject_id, teaching_grade_id, text)
        VALUES (subjectId,
                teachingGradeId,
                '(UNICAMP 2003) O conto “Gaetaninho” começa com a fala “—Xi, Gaetaninho, como é bom!", e termina ' ||
                'com a seguinte afirmação: “Quem na boléia de um dos carros do cortejo mirim exibia soberbo terno ' ||
                'vermelho que feria a vista da gente era o Beppino”. (Antonio Alcântara Machado. "Gaetaninho", in ' ||
                'Brás, Bexiga e Barra Funda. Belo Horizonte/Rio de Janeiro, Villa Rica Ed. Reunidas, 1994.)A fala ' ||
                'inicial é de Beppino, mencionado também no último parágrafo.' || CHR(10) ||
                'a) A que ele se referia como sendo ' ||
                'bom?' || CHR(10) ||
                'b) Ambos os trechos citados têm relação direta com o núcleo central da narrativa. Que núcleo ' ||
                'é esse?' || CHR(10) ||
                'c) Que relação há entre os nomes próprios das personagens e o título do livro?')
        RETURNING id INTO question_id;

        INSERT INTO essay_question(id, lines_to_answer, answer)
        VALUES (question_id,
                10,
                'a) Beppino dizia a Gaetaninho que era muito bom andar de carro. A valorização desse fato ' ||
                'decorre das raras vezes em que as pessoas pobres podiam andar de carro: apenas em dias de enterro ' ||
                'ou casamento.' || CHR(10) ||
                'b) O núcleo central do conto é o desejo intenso do menino Gaetaninho: andar de carro, ' ||
                'ainda que puxado a cavalo. Ironicamente, Gaetaninho só anda de carro quando morto, ao ser ' ||
                'transportado para o cemitério.' || CHR(10) ||
                'c) Os nomes das personagens Gaetaninho e Beppino têm relação de ' ||
                'grande pertinência com o título do livro Brás, Bexiga e Barra Funda e com a intenção do autor que, ' ||
                'em português macarrônico, registra a crônica dos ítalo-paulistanos no início do século XX. Assim, o ' ||
                'registro popular Gaetaninho e Beppino – quase transcrições fonéticas – no lugar das formas normais ' ||
                'Gaetaninho e Peppino (Giuseppe), captam a fala das ruas dos bairros habitados por imigrantes italianos.');
    END
$$;

