import type { Todo, UpdateTodo } from "../entities/todo.entity.js";

export abstract class TodoRepository {

    abstract getTodos(): Promise<Todo[]>;
    abstract getTodoById(id: string): Promise<Todo | null>;
    abstract createTodo(todo: Todo): Promise<void>;
    abstract updateTodo(options: UpdateTodo): Promise<Todo | null>;
    abstract deleteTodos(): Promise<void>;
    abstract deleteTodoById(id: string): Promise<Todo[] | null>;
    
};
