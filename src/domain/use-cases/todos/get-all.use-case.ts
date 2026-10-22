import type { PaginationDto } from "../../dtos/shared/pagination.dto.js";
import type { GetTodosResponse } from "../../interfaces/get-todos-response.interface.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

interface GetAllUseCase {
    execute(dto: PaginationDto): Promise<GetTodosResponse>;
};

export class GetAll implements GetAllUseCase {
    constructor(
        private readonly repository: TodoRepository,
    ) { };
    async execute(dto: PaginationDto): Promise<GetTodosResponse> {
        return this.repository.getTodos(dto);
    };
};