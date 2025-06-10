import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Validation } from '../../../../../utils/validation';

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

export async function GET(request: Request, { params }: Segments) {
    const { id } = await params;

    const validation = fnValidation.validate(new URLSearchParams({ id }));
    if (validation.error && Object.keys(validation.error).length > 0) {
        console.error(id)
        return NextResponse.json(validation, { status: 400 });
    }

    const todo = await prisma.todo.findUnique({
        where: {
            id
        }
    });

    return NextResponse.json({
        message: 'GET',
        todo
    })


}