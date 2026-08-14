import { type Request, type Response } from "express";
import { Todo } from "../../domain/entities/todo.entity.js";
import type { TodoRepository } from "../../domain/repositories/todo.repository.js";

export class TodoController {

    constructor(
        private readonly repository: TodoRepository,
    ) { }

    public createTodo = async (req: Request, res: Response) => {
        const { task, user } = req.body;

        if (!task) return res.status(400).json({ error: 'Missing task' });
        if (!user) return res.status(400).json({ error: 'Missing user' });

        const newTodo = new Todo({ task: `${task}`, user: `${user}` });

        await this.repository.createTodo(newTodo);

        return res.status(201).json({ message: 'New Todo!', newTodo });
    };

    public readTodos = async (req: Request, res: Response) => {
        const todos: Todo[] = await this.repository.getTodos();

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
        const { task } = req.body;
        if (typeof id !== 'string') return res.status(400).json({ error: `Not valid ID` });
        if (!task) return res.status(400).json({ error: `Missing task` });

        const updatedTodo = await this.repository.updateTodo({ id, task, timestamp: new Date() });
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
