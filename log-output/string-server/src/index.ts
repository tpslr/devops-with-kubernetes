import express from "express";

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get("/status", (req, res) => {
    res.sendFile('/data/string.txt');
});


app.listen(port, () => {
    console.log(`Status server listening on http://0.0.0.0:${port}/status`);
});
