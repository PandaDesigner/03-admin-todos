import { Todo } from '@/generated/prisma';

export interface TodoUpdate {
    ( id: string, complete: boolean ): Promise<Todo | void>;
}

export interface CreateTodo {
    (description: string, completed?: boolean): Promise<Todo | void>;
}

// @ts-ignore
export const updateTodo:TodoUpdate = async ( id: string, completed: boolean ):Promise<Todo> => {
    const body =  { completed };
    const dbTodo = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json());

    console.log({dbTodo})

    return dbTodo;
}

// @ts-ignore
export const createTodo:CreateTodo = async ( description: string, completed = false ):Promise<Todo> => {
    const body =  { description, completed };
    const dbTodo = await fetch(`/api/todos`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json());

    console.log({dbTodo})

    return dbTodo;
}


export const deleteTodosCompleted = async ():Promise<void> => {
    await fetch(`/api/todos`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const deleteTodo = async (id: string):Promise<void> => {
    await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}
