import express from "express";
import { addTodo, getTodos, isTodo } from "./todo.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.post("/api/todo", (req, res) => {
    const todo = req.body;
    if (!todo || !isTodo(todo)) {
        return res.status(400).json({ message: "Invalid todo format" });
    }

    if (todo.title.length + todo.content.length > 120) {
        return res.status(400).json({ message: "Todo is too long" });
    }

    res.send(addTodo(todo));
});

app.get("/api/todos", (req, res) => {
    res.json(getTodos());
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});