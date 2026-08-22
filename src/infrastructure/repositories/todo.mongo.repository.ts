import type { TodoDatasource } from "../../domain/datasources/todo.datasource.js";
import type { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import type { TodoEntity } from "../../domain/entities/todo.entity.js";
import type { TodoRepository } from "../../domain/repositories/todo.repository.js";

export class TodoMongoRepository implements TodoRepository {
    constructor(
        private readonly todoDatasource: TodoDatasource
    ) { };

    async getTodos(): Promise<TodoEntity[]> {
        return this.todoDatasource.getTodos();
    };

    async getTodoById(id: string): Promise<TodoEntity> {
        return this.todoDatasource.getTodoById(id);
    };

    async createTodo(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.todoDatasource.createTodo(dto);
    };

    async updateTodo(options: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoDatasource.updateTodo(options);
    };

    async deleteTodoById(id: string): Promise<TodoEntity> {
        return this.todoDatasource.deleteTodoById(id);
    };

}