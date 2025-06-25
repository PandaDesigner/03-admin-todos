'use client';
import {Todo} from "@/generated/prisma";
import {FC, startTransition, useOptimistic} from "react";
import {todoStyles} from "./styles";
import {IoCheckboxOutline, IoSquareOutline, IoTrashOutline} from "react-icons/io5";
import {TodoUpdate} from "@todos/helpers/todos.helpers";
import {deleteTodo} from "@todos/actions/todo.actions";

interface Props {
    todo: Todo;
    toggleTodo: TodoUpdate ;
}

export const TodoItems:FC<Props> = ({todo, toggleTodo}) => {

    const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
        todo,
        (state, newCompletedValue: boolean) => ({
            ...state,
            completed: newCompletedValue
        })
    )

    const onToggleTodo = async () => {
        try {
            startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed)); // Optimistically update the UI
            await toggleTodo(todoOptimistic.id, !todoOptimistic.completed);
        } catch (e) {
            console.error('Error updating todo:', e);
            toggleTodoOptimistic(!todoOptimistic.completed); // Revert optimistic update on error
        }
    }


    return (
        <div className={ todoOptimistic.completed ? todoStyles['todoDone'] : todoStyles['todoPending'] }>
            <div className="flex flex-col sm:flex-row justify-start imtes-center gap-4">
                <div
                onClick={() => onToggleTodo()}
                className={`flex-auto flex p-2 rounded-b-md cursor-pointer 
                ${ todoOptimistic.completed 
                    ? 'bg-blue-100 hover:bg-blue-100/60' 
                    : 'bg-red-100 hover:bg-red-100/60' } 
                    justify-center items-center`}>
                    {todoOptimistic.completed
                        ? <IoCheckboxOutline size={30}/>
                        : <IoSquareOutline size={30}/>
                    }
                </div>
                <div className="text-center sm:text-left flex justify-center items-center"> {todoOptimistic.description}</div>
            </div>
            <button className="p-2 bg-red-100 rounded-lg hover:bg-red-200/20 transition-all transition-duration-100" onClick={() => deleteTodo(todoOptimistic.id)}>
                <IoTrashOutline size={30} color={'red'} className="text-red-500" />
            </button>
        </div>
    );
};
