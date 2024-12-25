# Этап 1: Сборка фронтенда
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend .

RUN npm run build


# Этап 2: Настройка бекенда
FROM node:18-alpine AS backend

WORKDIR /app/backend

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend .

# Копируем собранный фронтенд в нужную директорию
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

EXPOSE 5000

CMD ["npm", "run", "start"]
