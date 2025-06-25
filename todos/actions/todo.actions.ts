'use server';
import prisma from "@lib/prisma";
import {Todo} from "@/generated/prisma";
import {revalidatePath} from "next/cache";


export const sleep = async (sec: number = 0) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, sec * 1000);
    })
};

export const toggleTodo = async (id: string, completed: boolean):Promise<Todo> => {


    const todo = await  prisma.todo.findFirst({
        where: {id}
    })

    if (!todo) {
        throw new Error('Todo not found');
    }

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { completed }
    });
    revalidatePath('/dashboard/server-todos')
    return updatedTodo;

}

export const addTodo = async (description: string) => {
    try {
        const todo:Todo = await prisma.todo.create({data: {description}});
        revalidatePath('/dashboard/server-todos');
        return todo;
    } catch (error) {
        return {
            message: 'Error creating todo',
        }
    }
}

export const deleteTodo = async (id: string) => {
    try {
        await prisma.todo.delete({where: {id}});
        revalidatePath('/dashboard/server-todos');
    } catch (error) {
        return {
            message: 'Error deleting todo',
        }
    }
}

export const deleteTodosCompleted = async () => {
    try {
        await prisma.todo.deleteMany({where: {completed: true}});
        revalidatePath('/dashboard/server-todos');
    } catch (error) {
        return {
            message: 'Error deleting completed todos',
        }
    }
}