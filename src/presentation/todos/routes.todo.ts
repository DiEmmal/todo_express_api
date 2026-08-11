import { Router } from "express";
import { TodoController } from "./controller.todo.js";
import { MongoTodoRepository } from "../../infrastructure/repositories/todo.mongo.repository.js";

export class TodoRoutes {

    static get Routes() {

        const router = Router();
        const TodoRepository = new MongoTodoRepository();
        const todoController = new TodoController(TodoRepository);

        //* CRUD
        // Create
        router.post('/', todoController.createTodo);
        // Read
        router.get('/', todoController.readTodos);
        router.get('/:id', todoController.readTodoById);
        // Update
        router.put('/:id', todoController.updateTodo);
        // Delete
        router.delete('/', todoController.deleteAllTodos);
        router.delete('/:id', todoController.deleteTodoById);

        return router;
    };

};