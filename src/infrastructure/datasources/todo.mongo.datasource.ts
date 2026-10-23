import type { TodoDatasource } from "../../domain/datasources/todo.datasource.js";
import type { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import type { PaginationDto } from "../../domain/dtos/shared/pagination.dto.js";
import { TodoEntity } from "../../domain/entities/todo.entity.js";
import { CustomHTTPError } from "../../domain/errors/custom-http.error.js";
import type { GetTodosResponse } from "../../domain/interfaces/get-todos-response.interface.js";
import { TodoModel } from "../data/mongo/index.js";



export class TodoMongoDatasource implements TodoDatasource {

    async getTodos(dto: PaginationDto): Promise<GetTodosResponse> {

        const { limit, page } = dto;

        try {
            const [total, todos] = await Promise.all([
                TodoModel.countDocuments(),
                TodoModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .sort({ createdAt: -1 })
            ])

            return {
                todos: todos.map(todo => TodoEntity.fromObject(todo)),
                page,
                limit,
                total,
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1,
                totalPages: Math.ceil(total / limit)
            };

        }
        catch (error) {
            throw CustomHTTPError.InternalServerError('Error fetching todos');
        }

    };

    async getTodoById(id: string): Promise<TodoEntity> {

        const todo = await TodoModel.findOne({ id });

        if (!todo) throw CustomHTTPError.NotFoundError(`Todo with id ${id} not found`);

        return TodoEntity.fromObject(todo);
    };

    async createTodo(dto: CreateTodoDto): Promise<TodoEntity> {

        const { task, user, title } = dto.values;

        const todoEntity = new TodoEntity({
            task,
            title,
            user,
        });

        try {

            const todo = await TodoModel.create(todoEntity);

            return TodoEntity.fromObject(todo);

        } catch (error) {

            throw CustomHTTPError.InternalServerError('Error creating todo');

        }

    };

    async updateTodo(dto: UpdateTodoDto): Promise<TodoEntity> {
        const { id } = dto;

        try {
            const existingTodo = await this.getTodoById(id);

            if (!existingTodo) throw CustomHTTPError.NotFoundError(`Todo with id ${id} not found`);

            const todo = await TodoModel.findOneAndUpdate(
                { id },
                { ...dto.values, hasBeenEdited: true },
                { returnDocument: 'after' }
            );

            return TodoEntity.fromObject(todo);

        } catch (error) {

            throw CustomHTTPError.InternalServerError('Error updating todo');

        }
        
    };

    async deleteTodoById(id: string): Promise<TodoEntity> {
        const todo = await this.getTodoById(id);

        await TodoModel.deleteOne({ id });

        return TodoEntity.fromObject(todo);

    };

};