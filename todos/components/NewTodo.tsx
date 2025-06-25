'use client';

import {IoTrashOutline} from "react-icons/io5";
import {FormEvent, useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import {addTodo, deleteTodosCompleted} from "@todos/actions/todo.actions";

export const NewTodo = () => {
    const [inputValue, setInputValue] = useState('');
    const router = useRouter()

    const onSubmit = useCallback(async (e: FormEvent ) => {
        e.preventDefault();
        if(inputValue.trim().length === 0) return;
        await addTodo(inputValue)
        setInputValue('')
    },[inputValue])

    const deletedCompleted = useCallback(async () => {
        await deleteTodosCompleted();
        router.refresh();
    },[router])

    return (
        <form onSubmit={onSubmit} className='flex w-full'>
            <input type="text"
                   className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all bg-white"
                   placeholder="¿Qué necesita ser hecho?"
                   value={inputValue}
                   onChange={e => setInputValue(e.target.value)}
            />

            <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 px-8 text-white hover:bg-sky-700 transition-all">
                Crear Todo
            </button>

            <span className='flex flex-1'></span>

            <button
                onClick={ () => deletedCompleted() }
                type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all gap-2 text-red-500">
                <IoTrashOutline size={20} />
                Delete Todo Completed
            </button>


        </form>
    )
}