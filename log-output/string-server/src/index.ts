import express from "express";
import { readFile } from "fs/promises";

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get("/status", async (req, res, next) => {

    const information = await readFile("/config/information.txt", "utf-8");
    const message = process.env.MESSAGE || "no message set";

    const data = await readFile("/data/string.txt", "utf-8");

    const pingsReq = await fetch("http://ping-pong-svc:2345/pings");
    const pingsCount = await pingsReq.text();

    res.status(200).type("text/plain").send(
        `file content: ${information}\n` +
        `message: ${message}\n` +
        `${data}\n` +
        `Ping / Pongs: ${pingsCount}`
    );
});


app.listen(port, () => {
    console.log(`Status server listening on http://0.0.0.0:${port}/status`);
});
