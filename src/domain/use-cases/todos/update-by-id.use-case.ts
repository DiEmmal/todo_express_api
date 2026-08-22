import type { UpdateTodoDto } from "../../dtos/index.js";
import type { TodoEntity } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

interface UpdateByIdUseCase {
    execute(options: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodoById implements UpdateByIdUseCase {
    constructor(
        private readonly repository: TodoRepository,
    ) { }

    async execute(options: UpdateTodoDto): Promise<TodoEntity> {
        return this.repository.updateTodo(options);
    }
}