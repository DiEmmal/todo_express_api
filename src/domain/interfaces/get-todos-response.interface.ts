import type { TodoEntity } from "../entities/todo.entity.js";

export interface GetTodosResponse {
    todos: TodoEntity[];
    page: number;
    limit: number;
    total: number;
}