import { randomUUID } from "crypto";
import type { UUID } from "crypto";

const todos = new Map<UUID, Todo>();


type Todo = {
    id: UUID;
    title: string;
    content: string;
    color: string;
}


function getTodos(): Todo[] {
    return Array.from(todos.values());
}

function addTodo(todo: Omit<Todo, "id">): Todo {
    const id = randomUUID();

    const fullTodo = { id, ...todo };

    todos.set(id, fullTodo);

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