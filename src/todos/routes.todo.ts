import { Router } from "express";
import { TodoController } from "./controller.todo.js";

export class TodoRoutes {

    static get Routes() {

        const router = Router();

        router.get('/', TodoController.getTodos);
        router.get('/:id', TodoController.getTodoById);

        return router;
    }

};