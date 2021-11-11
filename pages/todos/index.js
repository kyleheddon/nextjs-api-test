import { useState } from 'react';
import Head from "next/head";
import Layout from '../../components/layout';
import { getTodos } from "../../lib/todos";
import stylesheet from './index.module.css';
import { put, post } from '../../lib/util/browser/fetch';

export default function Todos({ todos: todosProp }) {
    const [title, setTitle] = useState("");
    const [todos, setTodos] = useState(todosProp);
    const [error, setError] = useState();

    const submitTodo = async () => {
        try {
            const { todo } = await (await post("/api/todos", { title }));
            setTodos([...todos, todo]);
        } catch (error) {
            setError(error);
            return;
        }
        setTitle('');
    };

    const deleteTodo = async (id) => {
        const result = await fetch(`/api/todos/${id}`, {
            method: "DELETE", 
        });

        if (result.error) {
            setError(error);
            return;
        }
        setTodos(todos.filter(t => t.id !== id));
    };

    const updateTodo = async ({ id, isDone }) => {
        try {
            await put(`/api/todos/${id}`, { isDone: !isDone });
        } catch (error) {
            setError(error);
            toggleIsDone(id);
        }
    };

    const toggleIsDone = (todoId) => {
        setTodos(todos.map((todo) => {
            return todo.id === todoId
                ? { ...todo, isDone: !todo.isDone }
                : todo;
        }));
    }

    return (
        <Layout>
            <Head>
                <title>Todos</title>
            </Head>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <a onClick={(e) => {
                            e.preventDefault();
                            deleteTodo(todo.id);
                        }}>
                            <span className={stylesheet.delete}>❌</span>
                        </a>
                        {todo.title}
                        <input
                            type="checkbox"
                            checked={todo.isDone}
                            className={stylesheet.checkbox}
                            onChange={() => {
                                toggleIsDone(todo.id);
                                updateTodo(todo);
                            }}
                        />
                    </li>
                ))}
            </ul>

            <form onSubmit={(e) => {
                e.preventDefault();
                submitTodo();
            }}>
                {error && (
                    <div className={stylesheet.error}>{error}</div>
                )}
                <label>
                    <strong>New todo </strong>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(event) => {
                            setTitle(event.target.value);
                            setError(null);
                        }}
                    />
                </label>
            </form>
        </Layout>
    );
}


export async function getStaticProps({}) {
    const todos = await getTodos()
    return {
      props: {
        todos
      }
    }
  }