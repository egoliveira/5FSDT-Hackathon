# 5FSDT-Hackathon

Código do hackathon do curso de pós-graduação em Fullstack Development da FIAP - turma de 2025.

## Como executar os containers Docker do projeto

Crie um arquivo chamado `.env` no mesmo diretório do arquivo `docker-compose.yaml` com o seguinte conteúdo:

    POSTGRES_DATABASE=question
    POSTGRES_USER=question
    POSTGRES_PASSWORD=question
    POSTGRES_PORT=5432
    BACKEND_LOCAL_PORT=8080
    BACKEND_DOCKER_PORT=8080
    FRONTEND_LOCAL_PORT=3000
    FRONTEND_DOCKER_PORT=3000

Depois, execute os comandos:

    docker compose build
    docker compose up

Quando os containers do Docker estiverem funcionando devidamente, abra o
endereço http://localhost:3000 no seu navegador.

## Arquitetura do Projeto

O documento de arquitetura foi entregue através da plataforma do aluno em um arquivo PDF.