import { type Request, type Response } from "express";
import type { TodoRepository } from "../../domain/repositories/todo.repository.js";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import { CreateTodo, DeleteById, GetAll, GetById, UpdateTodoById } from "../../domain/use-cases/index.js";
import { CustomHTTPError } from "../../domain/errors/custom-http.error.js";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto.js";

export class TodoController {

    constructor(
        private readonly repository: TodoRepository,
    ) { };

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomHTTPError) {
            return res.status(error.statusCode).json({ error: error.message });
        };
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    private isValidId(id: unknown): id is string {
        return typeof id === 'string' && id.length === 36;
    };

    public createTodo = (req: Request, res: Response) => {

        const createDto = CreateTodoDto.create(req.body);
        const { dto, error } = createDto;

        if (error) return res.status(400).json({ error });

        new CreateTodo(this.repository)
            .execute(dto!)
            .then(newTodo => res.status(201).json({ todo: newTodo, message: 'Todo created successfully' }))
            .catch(error => this.handleError(error, res));
    };

    public getTodos = (req: Request, res: Response) => {
        const paginationDto = PaginationDto.create(req.query);
        const { dto, error } = paginationDto;

        if (error) return res.status(400).json({ error });

        new GetAll(this.repository)
            .execute(dto!)
            .then(data => res.status(200).json({
                todos: data.todos,
                pagination: {
                    page: data.page,
                    limit: data.limit,
                    total: data.total,
                    hasNextPage: data.hasNextPage,
                    hasPrevPage: data.hasPrevPage,
                    totalPages: data.totalPages,
                    nextPage: data.hasNextPage ? '/api/todos?page=' + (data.page + 1) + '&limit=' + data.limit : null,
                    prevPage: data.hasPrevPage ? '/api/todos?page=' + (data.page - 1) + '&limit=' + data.limit : null,
                },
                message: 'Todos fetched successfully'
            }))
            .catch(error => this.handleError(error, res));

    };

    public readTodoById = (req: Request, res: Response) => {
        const id = req.params.id;

        if (!this.isValidId(id)) return res.status(400).json({ error: 'Not valid ID' });

        new GetById(this.repository)
            .execute(id)
            .then(todo => res.status(200).json({ todo, message: 'Todo fetched successfully' }))
            .catch(error => this.handleError(error, res));

    };

    public updateTodo = (req: Request, res: Response) => {
        const id = req.params.id;

        const updateTodoDto = UpdateTodoDto.create({ ...req.body, id });
        const { dto, error } = updateTodoDto;

        if (error) return res.status(400).json({ error });

        new UpdateTodoById(this.repository)
            .execute(dto!)
            .then(todo => res.status(200).json({ todo, message: 'Todo updated successfully' }))
            .catch(error => this.handleError(error, res));

    };

    public deleteTodoById = (req: Request, res: Response) => {
        const id = req.params.id;

        if (!this.isValidId(id)) return res.status(400).json({ error: 'Not valid ID' });

        new DeleteById(this.repository)
            .execute(id)
            .then(todo => res.status(200).json({ todo, message: 'Todo deleted successfully' }))
            .catch(error => this.handleError(error, res));
    };

}