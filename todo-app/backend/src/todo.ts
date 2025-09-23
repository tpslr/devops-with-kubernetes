import { randomUUID } from "crypto";
import type { UUID } from "crypto";
import { sql } from "./db.js";


await sql`CREATE TABLE IF NOT EXISTS todos (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    color TEXT NOT NULL
)`;

type Todo = {
    id: UUID;
    title: string;
    content: string;
    color: string;
}


async function getTodos(): Promise<Todo[]> {
    return await sql<Todo[]>`SELECT * FROM todos`;
}

async function addTodo(todo: Omit<Todo, "id">): Promise<Todo> {
    const id = randomUUID();

    const fullTodo = { id, ...todo };

    await sql`INSERT INTO todos ${sql(fullTodo, "id", "title", "content", "color")}`;

    return fullTodo;
}

function isTodo(todo: any): todo is Omit<Todo, "id"> {
    return typeof todo === "object"
        && typeof todo.title === "string"
        && typeof todo.content === "string"
        && typeof todo.color === "string";
}


export type { Todo };

export { getTodos, addTodo, isTodo };