'use client';
import {Todo} from "@/generated/prisma";
import {FC, useCallback} from "react";
import {todoStyles} from "./styles";
import {IoCheckboxOutline, IoSquareOutline, IoTrashOutline} from "react-icons/io5";
import {TodoUpdate} from "@todos/helpers/todos.helpers";
import * as api from '@todos/helpers/todos.helpers';
import {useRouter} from "next/navigation";

interface Props {
    todo: Todo;
    toggleTodo: TodoUpdate ;
}

export const TodoItems:FC<Props> = ({todo, toggleTodo}) => {

    const router = useRouter();

    const deleteTodo = useCallback(async (id: string) => {
         await api.deleteTodo(id);
         router.refresh();
    },[router])

    return (
        <div className={ todo.completed ? todoStyles['todoDone'] : todoStyles['todoPending'] }>
            <div className="flex flex-col sm:flex-row justify-start imtes-center gap-4">
                <div
                onClick={() => toggleTodo(todo.id, (!todo.completed))}
                className={`flex-auto flex p-2 rounded-b-md cursor-pointer 
                ${ todo.completed 
                    ? 'bg-blue-100 hover:bg-blue-100/60' 
                    : 'bg-red-100 hover:bg-red-100/60' } 
                    justify-center items-center`}>
                    {todo.completed
                        ? <IoCheckboxOutline size={30}/>
                        : <IoSquareOutline size={30}/>
                    }
                </div>
                <div className="text-center sm:text-left flex justify-center items-center"> {todo.description}</div>
            </div>
            <button className="p-2 bg-red-100 rounded-lg hover:bg-red-200/20 transition-all transition-duration-100" onClick={() => deleteTodo(todo.id)}>
                <IoTrashOutline size={30} color={'red'} className="text-red-500" />
            </button>
        </div>
    );
};
