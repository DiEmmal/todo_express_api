import type { TodoDatasource } from "../../domain/datasources/todo.datasource.js";
import type { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import { TodoEntity } from "../../domain/entities/todo.entity.js";
import { CustomHTTPError } from "../../domain/errors/custom-http.error.js";
import { TodoModel } from "../data/mongo/index.js";

export class TodoMongoDatasource implements TodoDatasource {

    async getTodos(): Promise<TodoEntity[]> {
        const todos = (await TodoModel.find()).map(todo => TodoEntity.fromObject(todo));

        return todos;
    };

    async getTodoById(id: string): Promise<TodoEntity> {
        
        const todo = await TodoModel.findOne({ id });

        if (!todo) throw CustomHTTPError.NotFoundError(`Todo with id ${id} not found`);

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

        const existingTodo = await this.getTodoById(id);

        if(!existingTodo) throw CustomHTTPError.NotFoundError(`Todo with id ${id} not found`);

        const todo = await TodoModel.findOneAndUpdate(
            { id },
            dto.values,
            { returnDocument: 'after' }
        );

        return TodoEntity.fromObject(todo);
    };

    async deleteTodoById(id: string): Promise<TodoEntity> {
        const todo = await this.getTodoById(id);

        if(!todo) throw CustomHTTPError.NotFoundError(`Todo with id ${id} not found`);

        await TodoModel.deleteOne({ id });

        return TodoEntity.fromObject(todo);
        
    };

};
