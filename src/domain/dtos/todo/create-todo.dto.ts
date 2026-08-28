export class CreateTodoDto {
    private constructor(
        public readonly task: string,
        public readonly title: string,
        public readonly user: string,
    ) { }

    get values() {
        return {
            task: this.task,
            title: this.title,
            user: this.user,
        }
    }

    static create(props: { [key: string]: any }): { error?: string, dto?: CreateTodoDto } {

        const { title, task, user } = props;

        if (!user || typeof user !== 'string') return { error: 'Invalid user property' };
        if (user === '') return { error: 'User property cannot be empty' };

        if (!title || typeof title !== 'string') return { error: 'Invalid title property' };
        if (title === '') return { error: 'Title property cannot be empty' };

        if (!task || typeof task !== 'string') return { error: 'Invalid task property' };
        if (task === '') return { error: 'Task property cannot be empty' };

        return { dto: new CreateTodoDto(task, title, user) };

    };

};