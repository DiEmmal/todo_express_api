import type { TodoDatasource } from "../../domain/datasources/todo.datasource.js";
import type { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import { TodoEntity } from "../../domain/entities/todo.entity.js";
import { TodoModel } from "../data/mongo/index.js";

export class TodoMongoDatasource implements TodoDatasource {

    async getTodos(): Promise<TodoEntity[]> {
        const todos = (await TodoModel.find()).map(todo => TodoEntity.fromObject(todo));

        return todos;
    };

    async getTodoById(id: string): Promise<TodoEntity> {
        const todo = await TodoModel.findOne({ id });

        if (!todo) throw new Error(`Todo with id ${id} not found`);

        return TodoEntity.fromObject(todo);
    };

    async createTodo(dto: CreateTodoDto): Promise<TodoEntity> {
        const { task, user, title } = dto.values;
        const todoEntity = new TodoEntity({
            task,
            title,
            user,
        });

        const todo = await TodoModel.create(todoEntity);

        return TodoEntity.fromObject(todo);
    };

    async updateTodo(dto: UpdateTodoDto): Promise<TodoEntity> {
        const { id } = dto;

        await this.getTodoById(id);

        const todo = await TodoModel.findOneAndUpdate(
            { id },
            dto.values,
            { returnDocument: 'after' }
        );

        return TodoEntity.fromObject(todo);
    };

    async deleteTodoById(id: string): Promise<TodoEntity> {
        const todo = await this.getTodoById(id);

        await TodoModel.deleteOne({ id });

        return TodoEntity.fromObject(todo);
        
    };

};
