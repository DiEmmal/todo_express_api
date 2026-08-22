import type { TodoDatasource } from "../../domain/datasources/todo.datasource.js";
import type { UpdateTodoDto } from "../../domain/dtos/index.js";
import { TodoEntity } from "../../domain/entities/todo.entity.js";
import { TodoModel } from "../data/mongo/index.js";

export class TodoMongoDatasource implements TodoDatasource {

    async getTodos(): Promise<TodoEntity[]> {
        const todos = (await TodoModel.find()).map(todo => TodoEntity.fromObject(todo));

        return todos;
    };

    async getTodoById(id: string): Promise<TodoEntity> {
        const todo = await TodoModel.findOne({ id });

        if (!todo) throw (`Todo with id ${id} not found`);

        return TodoEntity.fromObject(todo);
    };

    async createTodo(todo: TodoEntity): Promise<void> {
        const { id, task, createdAt, user, title } = todo;

        await TodoModel.create({ id, task, createdAt, user, title });
    };

    async updateTodo(dto: UpdateTodoDto): Promise<TodoEntity> {
        const { id } = dto;

        const todo = await TodoModel.findOneAndUpdate(
            { id },
            dto.values,
            { returnDocument: 'after' }
        );

        if (!todo) throw (`Todo with id ${id} not found`)

        return TodoEntity.fromObject(todo);
    }

    async deleteTodos(): Promise<void> {
        await TodoModel.deleteMany();
    };

    async deleteTodoById(id: string): Promise<TodoEntity> {
        const todo = await this.getTodoById(id);

        await TodoModel.deleteOne({ id });

        return TodoEntity.fromObject(todo);
        
    };

};
