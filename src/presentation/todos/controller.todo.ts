import { type Request, type Response } from "express";
import type { TodoRepository } from "../../domain/repositories/todo.repository.js";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import { CreateTodo, DeleteById, GetAll, GetById, UpdateTodoById } from "../../domain/use-cases/index.js";
import { CustomHTTPError } from "../../domain/errors/custom-http.error.js";

export class TodoController {

    constructor(
        private readonly repository: TodoRepository,
    ) { };

    private handleError(error: any, res: Response) {
        if (error instanceof CustomHTTPError) {
            return res.status(error.statusCode).json({ error: error.message });
        };
        return res.status(500).json({ error });
    };

    public createTodo = async (req: Request, res: Response) => {

        const createDto = CreateTodoDto.create(req.body);
        const { dto, error } = createDto;

        if (createDto.error) return res.status(400).json({ error });

        new CreateTodo(this.repository)
            .execute(dto!)
            .then(newTodo => res.status(201).json({ message: 'New Todo!', newTodo }))
            .catch(error => this.handleError(error, res));
    };

    public readTodos = async (req: Request, res: Response) => {

        new GetAll(this.repository)
            .execute()
            .then(todos => res.status(200).json({ todos }))
            .catch(error => this.handleError(error, res));

    };

    public readTodoById = async (req: Request, res: Response) => {
        const id = req.params.id;

        if (typeof id !== 'string') return res.status(400).json([{ error: `Not valid ID` }]);;

        if(id.length !== 24) return res.status(400).json([{ error: `Not valid ID` }]);;

        new GetById(this.repository)
            .execute(id)
            .then(todo => res.status(200).json({ todo }))
            .catch(error => this.handleError(error, res));

    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = req.params.id;

        const updateTodoDto = UpdateTodoDto.create({ ...req.body, id });
        const { dto, error } = updateTodoDto;

        if (error) return res.status(400).json({ error });

        new UpdateTodoById(this.repository)
            .execute(dto!)
            .then(todo => res.status(200).json({ todo }))
            .catch(error => this.handleError(error, res));

    };

    public deleteTodoById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (typeof id !== 'string') return res.status(400).json([{ error: `Not valid ID` }]);;

        if(id.length !== 24) return res.status(400).json([{ error: `Not valid ID` }]);;

        new DeleteById(this.repository)
            .execute(id)
            .then(todo => res.status(200).json({ todo }))
            .catch(error => this.handleError(error, res));
    };

}
