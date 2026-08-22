export class UpdateTodoDto {
    private constructor(
        public readonly id: string,
        public readonly task?: string,
        public readonly title?: string,
        public readonly completed?: boolean,
    ) { }

    get values() {
        let obj: { [key: string]: any } = {};

        if (this.task) obj.task = this.task;
        if (this.title) obj.title = this.title;
        if (this.completed === true) obj.completedAt = new Date();
        if (this.completed === false) obj.completedAt = null;

        return obj;
    }

    static create(props: { [key: string]: any }): { error?: string, dto?: UpdateTodoDto } {

        const { title, task, id, completed } = props;

        if (!id || typeof id !== 'string') return { error: 'Invalid ID property' };

        return { dto: new UpdateTodoDto(id, task, title, completed) };

    };

};