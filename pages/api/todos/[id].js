import { deleteTodo, getTodo, updateTodo } from '../../../lib/todos';
const ErrorCodeNotFound = 'P2025';

export default async function(req, res) {
    const {
        method,
        body: { title, isDone }
    } = req;
    const id = parseInt(req.query.id);
    let todo;
    switch (method) {
        case "PUT":
            try {
                await updateTodo(id, { title, isDone });
            } catch (e) {
                send404IfNotFoundError(e, res);
                break;
            }
            todo = await getTodo(id);
            res.status(200).json({ todo });
            break;
        case "GET":
            todo = await getTodo(id);
            if (todo) {
                res.status(200).json({ todo });
            } else {
                send404(res);
            }
            break;
        case "DELETE":
            try {
                await deleteTodo(id);
            } catch (e) {
                send404IfNotFoundError(e, res);
                break;
            }
            res.status(200).json({});
            break;
        default:
            send404(res);

    }
}

function send404IfNotFoundError(e, res) {
    if (e.code === ErrorCodeNotFound) {
        send404(res);
        return;
    }
    throw e;
}

function send404(res) {
    res.status(404).json({ error: 'Not found' });
}