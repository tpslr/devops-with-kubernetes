import express from "express";
import { existsSync } from "fs";
import { writeFile, readFile, } from "fs/promises";
import { sql } from "./db.js";

const app = express();

await sql`CREATE TABLE IF NOT EXISTS pings (id SERIAL PRIMARY KEY)`;

async function getPingCount() {
    const [counter]: [{ count: number }?] = await sql`SELECT COUNT(*) AS count FROM pings`
    return counter?.count ?? 0;
}

app.get("/", async (_req, res) => {
    const count = await getPingCount();

    await sql`INSERT INTO pings DEFAULT VALUES`;

    res.send(`pong ${count}`);
});


app.get("/pings", async (_req, res) => {
    res.send(await getPingCount());
});


const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});