import { type Request, type Response } from "express";
import type { TodoRepository } from "../../domain/repositories/todo.repository.js";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import { CreateTodo, DeleteById, GetAll, GetById, UpdateTodoById } from "../../domain/use-cases/index.js";

export class TodoController {

    constructor(
        private readonly repository: TodoRepository,
    ) { };

    public createTodo = async (req: Request, res: Response) => {

        const createDto = CreateTodoDto.create(req.body);
        const { dto, error } = createDto;

        if (createDto.error) return res.status(400).json({ error });

        new CreateTodo(this.repository)
            .execute(dto!)
            .then(newTodo => res.status(201).json({ message: 'New Todo!', newTodo }))
            .catch(error => res.status(404).json({ error }));
    };

    public readTodos = async (req: Request, res: Response) => {

        new GetAll(this.repository)
            .execute()
            .then(todos => res.status(200).json({ todos }))
            .catch(error => res.status(404).json({ error }));

    };

    public readTodoById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (typeof id !== 'string') return res.status(400).json({ error: `Not valid ID` });

        new GetById(this.repository)
            .execute(id)
            .then(todo => res.status(200).json({ todo }))
            .catch(error => res.status(404).json({ error }));

    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = req.params.id;

        const updateTodoDto = UpdateTodoDto.create({ ...req.body, id });
        const { dto, error } = updateTodoDto;

        if (error) return res.status(400).json({ error });

        new UpdateTodoById(this.repository)
            .execute(dto!)
            .then(todo => res.status(200).json({ todo }))
            .catch(error => res.status(404).json({ error }));

    };

    public deleteTodoById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (typeof id !== 'string') return res.status(400).json([{ error: `Not valid ID` }]);;

        new DeleteById(this.repository)
            .execute(id)
            .then(todo => res.status(200).json({ todo }))
            .catch(error => res.status(404).json({ error }));
    };

}
