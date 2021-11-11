import { getTodos, createTodo } from "../../../lib/todos";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            const { title } = JSON.parse(req.body);
            const todo = await createTodo({ title });
            res.status(200).json(todo);
            break;
        case "GET":
        default:
            const todos = await getTodos();
            res.status(200).json(todos);
    }
}