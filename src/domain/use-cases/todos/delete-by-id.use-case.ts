import type { TodoEntity } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

interface DeleteByIdUseCase {
    execute(id: string): Promise<TodoEntity>;
};

export class DeleteById implements DeleteByIdUseCase {
    constructor(
        private readonly repository: TodoRepository,
    ) { }

    async execute(id: string): Promise<TodoEntity> {
        return await this.repository.deleteTodoById(id);
    };
};