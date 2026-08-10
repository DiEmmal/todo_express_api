interface CreateTodo {
    task: string;
    user: string;
    timestamp?: Date;
}

let globalTodoID: number = 1;

export class Todo {
    task: string;
    id: number;
    timestamp: Date;
    user: string;

    constructor(options: CreateTodo) {
        this.task = options.task;
        this.timestamp = options.timestamp ?? new Date();
        this.id = globalTodoID++;
        this.user = options.user;
    };
}