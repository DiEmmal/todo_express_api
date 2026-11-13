import type { TodoEntity } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

interface GetByUserUseCase {
    execute(user: string): Promise<TodoEntity[]>;
};

export class GetByUser implements GetByUserUseCase {
    constructor(
        private readonly repository: TodoRepository,
    ) { };

    async execute(user: string): Promise<TodoEntity[]> {
        return this.repository.getTodosByUser(user);
    };
};
