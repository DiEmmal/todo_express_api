import type { UpdateTodoDto } from "../dtos/index.js";
import type { TodoEntity } from "../entities/todo.entity.js";

export abstract class TodoDatasource {
    abstract getTodos(): Promise<TodoEntity[]>;
    abstract getTodoById(id: string): Promise<TodoEntity>;
    abstract createTodo(todo: TodoEntity): Promise<void>;
    abstract updateTodo(options: UpdateTodoDto): Promise<TodoEntity>;
    abstract deleteTodos(): Promise<void>;
    abstract deleteTodoById(id: string): Promise<TodoEntity>;
};
