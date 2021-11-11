import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getTodos() {
    return prisma.todo.findMany();
}

export async function getTodo(id) {
    return prisma.todo.findUnique({ where: { id } });
}

export async function updateTodo(id, { title, isDone }) {
    return prisma.todo.update({ where: { id }, data: {
        title, isDone
    }});
}

export async function createTodo({ title }) {
    return prisma.todo.create({
        data: { title, isDone: false },
    });
}

export async function deleteTodo(id) {
    return prisma.todo.delete({ where: { id }});
}