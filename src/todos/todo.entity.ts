interface CreateTodo {
    task: string;
    timestamp?: Date;
}

let globalTodoID: number = 1;

export class Todo {
    task: string;
    id: number;
    timestamp: Date;

    constructor(options: CreateTodo) {
        this.task = options.task;
        this.timestamp = options.timestamp ?? new Date();
        this.id = globalTodoID++;
    };
}