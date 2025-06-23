import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Validation } from '../../../../utils/validation';
import * as yup from 'yup';

const fnValidation = new Validation(new Map([
    ['take', (value) => !isNaN(Number(value)) && Number(value) > 0],
    ['skip', (value) => !isNaN(Number(value)) && Number(value) > 0]
]));

export async function GET(request: Request) {

    const { searchParams } = new URL ( request.url );
    const take = searchParams.get('take') ?? '10';
    const skip = searchParams.get('skip') ?? '0';

    const validation = fnValidation.validate(searchParams);

    if (validation.error && Object.keys(validation.error).length > 0) {
        return NextResponse.json(validation, { status: 400 });
    }

    const todos = await prisma.todo.findMany({
        orderBy: {
            description: 'asc'
        },
        take: Number(take),
        skip: Number(skip)
    });
    return NextResponse.json(todos);
}


const postSchema = yup.object({
    description: yup.string().required(),
    completed: yup.boolean().optional().default(false)
})

export async function POST(request: Request) {

    try {
        const {description, completed} = await postSchema.validate(await request.json());
        const todo = await prisma.todo.create({
            data: {
                description,
                completed
            }
        });

        return NextResponse.json(todo);

    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }

}

