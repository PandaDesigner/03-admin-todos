export const dynamic = 'force-dynamic'; // This page will always be revalidated on each request
export const revalidate = 0; // Disable static generation for this page
import prisma from "@/lib/prisma";
import TodosGrid from "../../../../todos/components/TodosGrid";
import {NewTodo} from "@todos/components/NewTodo";

export const metadata = {
    title: 'List Todos',
    description: 'List of Todos from the database',
};

export default async function RestTodosPages() {

    const todos = await prisma.todo.findMany({orderBy:{ description: 'asc'}});

    return (
            <>
                <div className="w-full px-4 mx-6 mb-6">
                <NewTodo/>
                </div>
                {/** TODO: Formulario para agregar */}
                <TodosGrid todos={todos}/>
            </>
    );
}
