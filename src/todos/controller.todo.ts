import { type Request, type Response } from "express";
import { Todo } from "./todo.entity.js";

const todos: Todo[] = [
    new Todo({ task: 'Buy something', user: 'DiEmmal' }),
    new Todo({ task: 'Pay something', user: 'DiEmmal' }),
    new Todo({ task: 'Something else', user: 'DiEmmal' }),
]

export class TodoController {

    constructor() { }

    public static createTodo = (req: Request, res: Response) => {
        const { task, user } = req.body;

        if(!task) return res.status(400).json({error: 'Missing task'});
        if(!user) return res.status(400).json({error: 'Missing user'});

        const newTodo = new Todo({task, user});

        todos.push(newTodo);

        return res.status(200).json(newTodo);
    };

    public static readTodos = (req: Request, res: Response) => {

        res.status(200).json(todos);

    };

    public static readTodoById = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: `Not valid ID` });

        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `todo with id: ${id} not found` });

        return res.status(200).json(todo);

    };

    public static updateTodo = (req: Request, res: Response) => {

    };

    public static deleteTodoById = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: `Not valid ID` });;

        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) return res.status(404).json({ error: `Todo with id: ${id} not found` });

        todos.splice(todoIndex, 1);

        return res.status(200).json(todos);
    };

    public static deleteAllTodos = (req: Request, res: Response) => {
        todos.splice(0, todos.length);
        return res.status(200).json({ message: `All todos has been deleted` });
    };

}