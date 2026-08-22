import type { TodoEntity } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

interface GetByIdUseCase {
    execute(id: string): Promise<TodoEntity>;
};

export class GetById implements GetByIdUseCase {
    constructor(
        private readonly repository: TodoRepository,
    ) { };

    async execute(id: string): Promise<TodoEntity> {
        return await this.repository.getTodoById(id);
    };
};