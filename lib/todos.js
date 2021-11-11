import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getTodos() {
    return prisma.todo.findMany();
}

export async function createTodo({ title }) {
    return prisma.todo.create({
        data: { title, isDone: false },
    });
}