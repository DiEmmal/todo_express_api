import { Router } from "express";
import { TodoController } from "./controller.todo.js";

export class TodoRoutes {

    static get Routes() {

        const router = Router();

        //* CRUD
        // Create
        router.post('/', TodoController.createTodo);
        // Read
        router.get('/', TodoController.readTodos);
        router.get('/:id', TodoController.readTodoById);
        // Update
        router.put('/', TodoController.updateTodo);
        // Delete
        router.delete('/', TodoController.deleteAllTodos);
        router.delete('/:id', TodoController.deleteTodoById);

        return router;
    };

};