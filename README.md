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

## For DB Development

You can use either of the following options for MongoDB:

### MongoDB Atlas

Create a free cluster in [MongoDB Atlas](https://www.mongodb.com/atlas/database) and set its connection string in `MONGO_URL` in your `.env` file:

```env
MONGO_URL=mongodb+srv://<user>:<password>@<cluster-url>/?retryWrites=true&w=majority
MONGO_DB_NAME=todo_db
```

### MongoDB with Docker

To run MongoDB locally with Docker, make sure Docker is installed and start the development environment:

```bash
npm run docker:up
npm run dev
```

This command starts MongoDB using Docker Compose and runs the API in watch mode. The default local connection is configured in `.env` with `MONGO_URL`.

## Endpoints
- `POST /api/todos`
- `GET /api/todos`
- `GET /api/todos/:id`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`
