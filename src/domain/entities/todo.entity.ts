import { randomUUID } from 'crypto';

export interface CreateTodo {
    title: string;
    task: string;
    user: string;
    createdAt?: Date;
    completedAt?: Date | null;
    id?: string;
};

export class TodoEntity {
    title: string;
    task: string;
    readonly createdAt: Date;
    completedAt: Date | null;
    user: string;
    readonly id: string;


    constructor(options: CreateTodo) {
        this.task = options.task;
        this.createdAt = options.createdAt ? options.createdAt : new Date();
        this.user = options.user;
        this.id = options.id ? options.id : randomUUID();
        this.title = options.title;
        this.completedAt = options.completedAt ? options.completedAt : null;
    };

    static fromObject(obj: any): TodoEntity {

        const { task, id, createdAt, completedAt, user, title } = obj;

        const newTodo = new TodoEntity({ task, user, title, id, createdAt, completedAt });

        return newTodo;
    };

};