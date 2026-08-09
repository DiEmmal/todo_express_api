import { type Request, type Response } from "express";
import { Todo } from "./todo.entity.js";

const todos: Todo[] = [
    new Todo({task: 'Buy something'}),
    new Todo({task: 'Pay something'}),
    new Todo({task: 'Something else'}),
]

export class TodoController {
    public static getTodos = (req: Request, res: Response) => {

        res.status(200).json(todos);

    };

    public static getTodoById = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json({error: `Is not a valid ID`});

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(400).json({error: `todo with id: ${id} not found`});

        return res.status(200).json(todo);

    };

}