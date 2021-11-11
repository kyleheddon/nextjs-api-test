import { useState } from 'react';
import Head from "next/head";
import Layout, { siteTitle } from '../../components/layout';
import { getTodos } from "../../lib/todos";

export default function Todos({ todos }) {
    const [title, setTitle] = useState("");
    const [newTodos, setNewTodos] = useState([]);
    const submitTodo = async () => {
        const result = await fetch("/api/todos", {
            method: "POST", 
            body: JSON.stringify({title})
        });
        const todo = await result.json();
        setNewTodos([...newTodos, todo]);
        setTitle('');
    };
    return (
        <Layout>
            <Head>
                <title>Todos</title>
            </Head>
            <ul>
                {[...todos, ...newTodos].map(todo => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>

            <form onSubmit={(e) => {
                e.preventDefault();
                submitTodo();
            }}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(event) => { setTitle(event.target.value) }}
                />
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