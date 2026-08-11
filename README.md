# TODO API (Express)

Simple TODO API built with Express, TypeScript, MongoDB, and a small clean architecture structure.

## Setup
1. Copy `.env.template` to `.env` and fill the values.
2. Install dependencies with `npm install`.
3. Start the API and MongoDB with `npm run dev`.

## Scripts
- `npm run dev`: starts MongoDB with Docker Compose and runs the API in watch mode.
- `npm run build`: compiles TypeScript into `dist`.
- `npm start`: runs the compiled app from `dist`.

## Endpoints
- `POST /api/todos`
- `GET /api/todos`
- `GET /api/todos/:id`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`
- `DELETE /api/todos`
