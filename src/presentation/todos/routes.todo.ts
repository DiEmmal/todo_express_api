import { Router } from "express";
import { TodoController } from "./controller.todo.js";
import { TodoMongoRepository } from "../../infrastructure/repositories/todo.mongo.repository.js";
import { TodoMongoDatasource } from "../../infrastructure/datasources/todo.mongo.datasource.js";

export class TodoRoutes {

    static get Routes() {

        const router = Router();
        const todoDatasource = new TodoMongoDatasource();
        const TodoRepository = new TodoMongoRepository(todoDatasource);
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
        router.delete('/:id', todoController.deleteTodoById);

        return router;
    };

};