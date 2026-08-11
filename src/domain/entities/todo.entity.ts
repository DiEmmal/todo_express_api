import { randomUUID } from 'crypto';

export interface CreateTodo {
    task: string;
    user: string;
    timestamp?: Date;
};

export interface UpdateTodo {
    task: string;
    timestamp: Date;
    id: string;
};

export class Todo {
    task: string;
    timestamp: Date;
    user: string;
    id: string;

    constructor(options: CreateTodo) {
        this.task = options.task;
        this.timestamp = options.timestamp ?? new Date();
        this.user = options.user;
        this.id = randomUUID();
    };

    static fromObject(obj: any): Todo {

        const { task, id, timestamp, user } = obj;

        const newTodo = new Todo({ task, timestamp, user })
        newTodo.id = id;

        return newTodo;
    };

};