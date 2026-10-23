import { getUUID } from "../../config/index.js";
import { CustomHTTPError } from "../errors/custom-http.error.js";

export interface CreateTodo {
    title: string;
    task: string;
    user: string;
    createdAt?: Date;
    completedAt?: Date | null;
    id?: string;
    hasBeenEdited?: boolean;
};

export class TodoEntity {
    title: string;
    task: string;
    readonly createdAt: Date;
    completedAt: Date | null;
    user: string;
    readonly id: string;
    hasBeenEdited: boolean = false;


    constructor(options: CreateTodo) {
        this.task = options.task;
        this.createdAt = options.createdAt ? options.createdAt : new Date();
        this.user = options.user;
        this.id = options.id ? options.id : getUUID();
        this.title = options.title;
        this.completedAt = options.completedAt ? options.completedAt : null;
        this.hasBeenEdited = options.hasBeenEdited ? options.hasBeenEdited : false;
    };

    static fromObject(obj: any): TodoEntity {

        const { task, id, createdAt, completedAt, user, title, hasBeenEdited } = obj;

        const newTodo = new TodoEntity({ task, user, title, id, createdAt, completedAt, hasBeenEdited });

        if (
            !task
            || !user
            || !title
            || !id
            || !createdAt
        ) throw CustomHTTPError.InternalServerError("Error fetching data from the database");

        return newTodo;
    };

};