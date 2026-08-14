import { Todo, type UpdateTodo } from "../../domain/entities/todo.entity.js";
import type { TodoRepository } from "../../domain/repositories/todo.repository.js";
import { TodoModel } from "../data/mongo/index.js";

export class MongoTodoRepository implements TodoRepository {

    constructor() { };

    async getTodos(): Promise<Todo[]> {
        const todos = (await TodoModel.find()).map(todo => Todo.fromObject(todo));

        return todos;
    };

    async getTodoById(id: string): Promise<Todo | null> {
        const todo = await TodoModel.findOne({ id });

        if (!todo) return null;

        return Todo.fromObject(todo);
    };

    async createTodo(todo: Todo): Promise<void> {
        const { id, task, timestamp, user } = todo;

        await TodoModel.create({ id, task, timestamp, user });

    };

    async updateTodo(options: UpdateTodo): Promise<Todo | null> {
        const { id, task, timestamp } = options;

        const todo = await TodoModel.findOneAndUpdate({ id }, { task, timestamp }, { returnDocument: 'after' });

        if (!todo) return null;

        return Todo.fromObject(todo);
    }

    async deleteTodos(): Promise<void> {
        await TodoModel.deleteMany();
    };

    async deleteTodoById(id: string): Promise<Todo[] | null> {
        const result = await TodoModel.deleteOne({ id });

        if (result.deletedCount === 0) return null;

        return (await TodoModel.find()).map(todo => Todo.fromObject(todo));
    };

};
