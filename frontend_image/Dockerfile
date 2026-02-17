FROM node:24-slim

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY frontend/package.json .
COPY frontend/package-lock.json .
COPY frontend/tsconfig.json .
COPY frontend/next.config.ts .

RUN npm install

COPY frontend/src ./src
COPY frontend/public ./public

RUN npm run build

EXPOSE $PORT

CMD ["npm", "start"]
