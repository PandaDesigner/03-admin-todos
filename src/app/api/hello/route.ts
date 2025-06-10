import { NextResponse } from 'next/server'

export async function GET(request: Request) {

    return NextResponse.json({
        hola: 'mundo',
        methods: request.method
    })
}

export async function POST(request: Request) {

    return NextResponse.json({
        hola: 'mundo',
        methods: request.method
    })
}