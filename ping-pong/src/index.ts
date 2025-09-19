import express from "express";
import { existsSync } from "fs";
import { writeFile, readFile, } from "fs/promises";

const app = express();

app.get("/pingpong", async (_req, res) => {
    const counter = Number(await readFile("/ping-pong/pingpong.txt", "utf-8"));

    res.send(`pong ${counter}`);
    
    await writeFile("/ping-pong/pingpong.txt", (counter + 1).toString());
});


app.get("/pings", async (_req, res) => {
    res.sendFile("/ping-pong/pingpong.txt");
});

if (!existsSync("/ping-pong/pingpong.txt")) {
    await writeFile("/ping-pong/pingpong.txt", "0");
}


const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});