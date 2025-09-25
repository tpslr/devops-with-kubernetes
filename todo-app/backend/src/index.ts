import express from "express";
import { addTodo, getTodos, isTodo } from "./todo.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.post("/api/todo", async (req, res) => {
    const todo = req.body;
    if (!todo || !isTodo(todo)) {
        console.log(`(${req.ip}) Rejected invalid todo format`);
        return res.status(400).json({ message: "Invalid todo format" });
    }

    if (todo.title.length + todo.content.length > 120) {
        console.log(`(${req.ip}) Rejected todo exceeding 120 characters: ${todo.title}, ${todo.content}`);
        return res.status(400).json({ message: "Todo is too long" });
    }

    console.log(`(${req.ip}) Adding todo: ${todo.title}, ${todo.content}`);

    res.send(await addTodo(todo));
});

app.get("/api/todos", async (req, res) => {
    res.json(await getTodos());
});

app.get("/", (_req, res) => {
    res.send("OK");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});