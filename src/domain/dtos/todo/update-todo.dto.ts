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

        if (!id || typeof id !== 'string') return { error: 'Not valid id' };
        if(id.length < 24) return { error: 'Not valid id' };

        if(title === '') return { error: 'Not valid title' };
        if(task === '') return { error: 'Not valid task' };

        return { dto: new UpdateTodoDto(id, task, title, completed) };

    };

};