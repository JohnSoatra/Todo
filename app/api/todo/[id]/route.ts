import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/context/prisma";;

const PUT = async(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<boolean>> => {
    const { id } = params;
    const { todo, isCompleted }: Json & { isCompleted?: boolean } = await request.json();

    if (todo !== undefined) {
        try {
            await prismaClient.todo.update({
                where: {
                    id: id
                },
                data: {
                    todo: todo
                }
            });

            return NextResponse.json(true);
        } catch {
            return NextResponse.json(false);
        }
    }

    if (isCompleted !== undefined) {
        try {
            await prismaClient.todo.update({
                where: {
                    id: id
                },
                data: {
                    isCompleted: isCompleted
                }
            });

            return NextResponse.json(true);
        } catch {
            return NextResponse.json(false);
        }
    }

    return NextResponse.json(false);
}

const DELETE = async(_: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<boolean>> => {
    const { id } = params;

    try {
        await prismaClient.todo.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json(true);
    } catch {
        return NextResponse.json(false);
    }
}

export {
    PUT,
    DELETE
}