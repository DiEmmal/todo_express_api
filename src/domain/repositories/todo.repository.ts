import type { CreateTodoDto, UpdateTodoDto } from "../dtos/index.js";
import type { PaginationDto } from "../dtos/shared/pagination.dto.js";
import type { TodoEntity } from "../entities/todo.entity.js";
import type { GetTodosResponse } from "../interfaces/get-todos-response.interface.js";

export abstract class TodoRepository {

    abstract getTodos(dto: PaginationDto): Promise<GetTodosResponse>;
    abstract getTodoById(id: string): Promise<TodoEntity>;
    abstract createTodo(dto: CreateTodoDto): Promise<TodoEntity>;
    abstract updateTodo(dto: UpdateTodoDto): Promise<TodoEntity>;
    abstract deleteTodoById(id: string): Promise<TodoEntity>;

};
