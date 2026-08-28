import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { testServer } from "../../test-server.js";
import { envs } from "../../../src/config/envs.js";
import { MongoDatabase } from "../../../src/infrastructure/data/mongo/init.js";
import { TodoModel } from "../../../src/infrastructure/data/mongo/index.js";
import request from 'supertest';

describe('routes / todos', () => {

    beforeAll(async () => {

        testServer.start();
        await MongoDatabase.connect({ dbName: envs.MONGO_DB_NAME, mongoURL: envs.MONGO_URL });

    });

    afterAll(async () => {

        testServer.close();
        await MongoDatabase.disconnect();

    });

    afterEach(async () => {

        await TodoModel.deleteMany();

    });

    const todo1 = {
        title: 'Todo 1',
        task: 'Task 1',
        user: 'User 1',
    };

    const todo2 = {
        title: 'Todo 2',
        task: 'Task 2',
        user: 'User 2',
    };


    const sendTodo = async (todo: any) => {
        return request(testServer.app)
        .post('/api/todos')
        .send(todo);
    };

    const fakeId = 'a'.repeat(36);

    it('get - /api/todos should return all todos and status code 200', async () => {

        await sendTodo(todo1);
        await sendTodo(todo2);

        const { body } = await request(testServer.app)
            .get('/api/todos')
            .expect(200);

        expect(body.todos).toHaveLength(2);

    });

    it('get - /api/todos/:id should return a todo and status code 200', async () => {

        const response = await sendTodo(todo1);

        const todoID = response.body.newTodo.id

        const { body } = await request(testServer.app)
            .get(`/api/todos/${todoID}`)

        expect(body.todo).toEqual({
            completedAt: null,
            createdAt: expect.any(String),
            id: expect.any(String),
            task: todo1.task,
            title: todo1.title,
            user: todo1.user
        });

    });

    it('get - /api/todos/:id should return 400', async () => {

        const { body } = await request(testServer.app)
            .get('/api/todos/123')
            .expect(400);

        expect(body).toEqual({
            error: 'Not valid ID'
        });

    });

    it('get  - /api/todos/:id should return 404', async () => {

        const { body } = await request(testServer.app)
            .get(`/api/todos/${fakeId}`)
            .expect(404);

        expect(body).toEqual({
            error: `Todo with id ${fakeId} not found`
        });
    });

    it('post - /api/todos should return 201', async () => {

        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send(todo1)
            .expect(201)

        expect(body.newTodo).toEqual({
            ...todo1,
            id: expect.any(String),
            createdAt: expect.any(String),
            completedAt: null
        });

    });

    it('post - /api/todos should return 400', async () => {

        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({ title: 'test' })
            .expect(400);

            expect(body.error).toBe('Invalid user property');

    });

    it('put - /api/todos/:id should update a todo and return 200', async () => {

        const response = await sendTodo(todo1);
        const todoID = response.body.newTodo.id;

        const { body } = await request(testServer.app)
            .put(`/api/todos/${todoID}`)
            .send({ title: 'Updated todo', completed: true })
            .expect(200);

        expect(body.todo).toEqual({
            id: todoID,
            title: 'Updated todo',
            task: todo1.task,
            user: todo1.user,
            createdAt: expect.any(String),
            completedAt: expect.any(String)
        });

    });

    it('put - /api/todos/:id should return 400', async () => {

        const response = await sendTodo(todo1);
        const todoID = response.body.newTodo.id;

        const { body } = await request(testServer.app)
            .put(`/api/todos/${todoID}`)
            .send({ title: '' })
            .expect(400);

        expect(body).toEqual({ error: 'Not valid title' });

    });

    it('put - /api/todos/:id should return 404', async () => {

        const { body } = await request(testServer.app)
            .put(`/api/todos/${fakeId}`)
            .send({ title: 'Updated todo' })
            .expect(404);

        expect(body).toEqual({ error: `Todo with id ${fakeId} not found` });

    });

    it('delete - /api/todos/:id should delete a todo', async () => {

        const response = await sendTodo(todo1);
        const todoID = response.body.newTodo.id;

        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todoID}`)
            .expect(200);

        expect(body.todo).toEqual({
            ...todo1,
            id: todoID,
            createdAt: expect.any(String),
            completedAt: null
        });

        await request(testServer.app)
            .get(`/api/todos/${todoID}`)
            .expect(404);

    });

    it('delete - /api/todos/:id should return 400', async () => {

        const { body } = await request(testServer.app)
            .delete('/api/todos/123')
            .expect(400);

        expect(body).toEqual({ error: 'Not valid ID' });

    });

    it('delete - /api/todos/:id should return 404', async () => {

        const { body } = await request(testServer.app)
            .delete(`/api/todos/${fakeId}`)
            .expect(404);

        expect(body).toEqual({ error: `Todo with id ${fakeId} not found` });

    });

});