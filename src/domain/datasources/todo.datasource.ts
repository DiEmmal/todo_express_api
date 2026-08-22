import type { CreateTodoDto, UpdateTodoDto } from "../dtos/index.js";
import type { TodoEntity } from "../entities/todo.entity.js";

export abstract class TodoDatasource {
    abstract getTodos(): Promise<TodoEntity[]>;
    abstract getTodoById(id: string): Promise<TodoEntity>;
    abstract createTodo(dto: CreateTodoDto): Promise<TodoEntity>;
    abstract updateTodo(dto: UpdateTodoDto): Promise<TodoEntity>;
    abstract deleteTodoById(id: string): Promise<TodoEntity>;
};
