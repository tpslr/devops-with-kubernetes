import express from "express";
import { readFile } from "fs/promises";

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get("/status", async (req, res, next) => {
    const data = await readFile("/data/string.txt", "utf-8");
    const pong = await readFile("/ping-pong/pingpong.txt", "utf-8");
    res.status(200).type("text/plain").send(data + "\nPing / Pongs " + pong);
});


app.listen(port, () => {
    console.log(`Status server listening on http://0.0.0.0:${port}/status`);
});
