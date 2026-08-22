import type { TodoEntity } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

interface GetAllUseCase {
    execute(): Promise<TodoEntity[]>;
};

export class GetAll implements GetAllUseCase {
    constructor(
        private readonly repository: TodoRepository,
    ) { };
    async execute(): Promise<TodoEntity[]> {
        return await this.repository.getTodos();
    };
};