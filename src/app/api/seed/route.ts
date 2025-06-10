import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {

    await prisma.todo.deleteMany() // delete all

    await prisma.todo.createMany({
        data: [
            { description: 'Piedra del alma', completed: true },
            { description: 'Piedra del tiempo', completed: false },
            { description: 'Piedra del espacio', completed: false },
            { description: 'Piedra del poder', completed: false },
            { description: 'Piedra del realidad', completed: false },
        ]
    });

    return NextResponse.json({
        message: 'Seed Executed',
        methods: request.method
    })
};
