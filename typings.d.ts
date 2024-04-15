type Todo = {
    id: string;
    todo: string;
    isCompleted: boolean;
    createdAt: Date;
}

type Json = {
    [key: string]: string|undefined
}

type Action = 'Add'|'Edit'|null;

type Status = 'success'|'fail';

type PostStatus = {
    status: Status,
    id?: newTodo.id
}

type GetStatus = {
    status: Status,
    todos?: Todo[]
}