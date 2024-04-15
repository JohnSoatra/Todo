import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/context/prisma";
import Vars from "@/constants/vars";

const GET = async(): Promise<NextResponse<GetStatus>> => {
    try {
        const todos = await prismaClient.todo.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({
            status: 'success',
            todos: todos
        });
    } catch {
        return NextResponse.json({
            status: 'fail'
        });
    }
}

const POST = async(request: NextRequest): Promise<NextResponse<PostStatus>> => {
    const { todo }: Json = await request.json();

    if (todo !== undefined) {
        if (todo.length > Vars.MaxTodoCharacterLength) {
            return NextResponse.json({
                status: 'fail'
            });
        }

        try {
            const allLength = await prismaClient.todo.count();

            if (allLength >= Vars.MaxAllTodoLength) {
                return NextResponse.json({
                    status: 'fail'
                }); 
            }

            const newTodo = await prismaClient.todo.create({
                data: {
                    todo: todo
                }
            });

            return NextResponse.json({
                status: 'success',
                id: newTodo.id
            });
        } catch {
            return NextResponse.json({
                status: 'fail'
            });
        }
    }

    return NextResponse.json({
        status: 'fail'
    });
}



export {
    GET,
    POST
}