import { type Request, type Response } from "express";
import { TodoEntity } from "../../domain/entities/todo.entity.js";
import type { TodoRepository } from "../../domain/repositories/todo.repository.js";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";

export class TodoController {

    constructor(
        private readonly repository: TodoRepository,
    ) { }

    public createTodo = async (req: Request, res: Response) => {
        const createDto = CreateTodoDto.create(req.body);
        const { dto, error } = createDto;

        if (createDto.error) return res.status(400).json({ error });

        let newTodo;
        if (dto) newTodo = new TodoEntity({
            task: dto.task,
            title: dto.title,
            user: dto.user,
        });

        if(newTodo) await this.repository.createTodo(newTodo);

        return res.status(201).json({ message: 'New Todo!', newTodo });
    };

    public readTodos = async (req: Request, res: Response) => {
        const todos: TodoEntity[] = await this.repository.getTodos();

        if (todos.length === 0) return res.status(200).json([{ message: `The database has not any todo` }]);

        return res.status(200).json(todos);

    };

    public readTodoById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (typeof id !== 'string') return res.status(400).json({ error: `Not valid ID` });

        const todo = await this.repository.getTodoById(id);
        if (!todo) return res.status(404).json([{ error: `todo with id: ${id} not found` }]);

        return res.status(200).json(todo);

    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = req.params.id;

        const updateTodoDto = UpdateTodoDto.create({ ...req.body, id });
        const { dto, error } = updateTodoDto;

        if (error) return res.status(400).json({ error });

        let updatedTodo;
        if (dto) updatedTodo = await this.repository.updateTodo(dto);

        if (!updatedTodo) return res.status(404).json({ error: `todo with id: ${id} not found` });

        return res.status(200).json({ message: `Updated todo with id: ${id}`, todo: updatedTodo });
    };

    public deleteTodoById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (typeof id !== 'string') return res.status(400).json([{ error: `Not valid ID` }]);;

        const todos = await this.repository.deleteTodoById(id);
        if (!todos) return res.status(404).json([{ error: `todo with id: ${id} not found` }]);

        return res.status(200).json(todos);
    };

    public deleteAllTodos = async (req: Request, res: Response) => {
        await this.repository.deleteTodos();
        return res.sendStatus(204);
    };

}
