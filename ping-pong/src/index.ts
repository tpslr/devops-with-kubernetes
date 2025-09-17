import express from "express";

const app = express();
let counter = 0;

app.get("/pingpong", (_req, res) => {
    res.send(`pong ${counter}`);
    counter += 1;
});


const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});