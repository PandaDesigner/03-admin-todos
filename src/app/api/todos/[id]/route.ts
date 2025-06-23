import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Validation } from '../../../../../utils/validation';
import * as yup from 'yup';
import {Todo} from "@/generated/prisma";

interface Segments {
    params: {
        id: string
    }
}

const isInvalidUUID = (uuid: string): boolean => {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(uuid);
};

const fnValidation = new Validation(new Map([
    ['id', (value: string) => isInvalidUUID(value)],
]));

const getTodo = async (id:string):Promise<Todo | null> => {

    const todo = await prisma.todo.findUnique({
        where: {
            id
        }
    });
    return todo;
}

export async function GET(_request: Request, { params }: Segments) {
    const { id } = await params;

    const validation = fnValidation.validate(new URLSearchParams({ id }));
    if (validation.error && Object.keys(validation.error).length > 0) {
        console.error(id)
        return NextResponse.json(validation, { status: 400 });
    }


    return NextResponse.json({
        message: 'GET',
        todo: await getTodo(id)
    })
}

const putSchema = yup.object({
    description: yup.string().optional(),
    completed: yup.boolean().optional()
});

export async function PUT(request: Request, { params }: Segments) {
    const { id } = await params;

    const fiendTodo = await getTodo(id)

    const validation = fnValidation.validate(new URLSearchParams({ id }));
    if (validation.error && Object.keys(validation.error).length > 0) {
        console.error(id)
        return NextResponse.json(validation, { status: 400 });
    }

    if (!fiendTodo) {
        return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
    }
    try {
        const {description , completed} = await putSchema.validate ( await request.json () );

        const updatedTodo = await prisma.todo.update ( {
            where : {
                id
            } ,
            data : {
                description : description || fiendTodo.description ,
                completed : completed !== undefined ? completed : fiendTodo.completed
            }
        } );

        return NextResponse.json({
            message: request.method,
            todo: updatedTodo
        });
    } catch (error) {
        return NextResponse.json({
            error
        },
            { status: 400})
    }

}