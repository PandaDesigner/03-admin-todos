'use client';
import {Todo} from "@/generated/prisma";
import {FC, useCallback} from "react";
import {TodoItems} from "./TodoItems";
//import * as api from '@todos/helpers/todos.helpers';
import {useRouter} from "next/navigation";
import {toggleTodo} from "@todos/actions/todo.actions"; // Importing the updateTodo function


interface Props {
    todos?: Array<Todo>
}


const TodosGrid:FC<Props> = ({ todos= [] }) => {

    const router = useRouter();
/*
    const toggleTodo = useCallback(async (id: string, completed: boolean) => {
        const updatedTodo = await api.updateTodo(id, completed);
        router.refresh();
        return updatedTodo;
    },[router])
  */

    return (
        <>
            <span className="text-4xl font-roboto">Todo Grid</span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {todos.map(todo => (
                    <TodoItems key={todo.id} todo={todo} toggleTodo={toggleTodo} />
                ))
                }
            </div>
        </>
    );
};

export default TodosGrid;
