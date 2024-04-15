import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

if(process.env['NODE_ENV'] !== 'production') {
    if(global.prismaClient === undefined) {
        global.prismaClient = new PrismaClient();
    }

    prismaClient = global.prismaClient;
} else {
    prismaClient = new PrismaClient();
}

export default prismaClient;