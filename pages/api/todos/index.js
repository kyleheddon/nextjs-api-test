import { getTodos, createTodo } from "../../../lib/todos";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            const { title } = req.body;
            if (!title) {
                res.status(422).json({ error: `title is required, received "${title}"` });
                break;
            }
            const todo = await createTodo({ title });
            res.status(200).json({ todo });
            break;
        case "GET":
        default:
            const todos = await getTodos();
            res.status(200).json({ todos });
    }
}