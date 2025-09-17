import express from "express";

const randomString = Math.random().toString(36).substring(2, 15);

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function logInfinitely() {
    while (true) {
        console.log(`${new Date().toISOString()}: ${randomString}`);
        await sleep(5000);
    }
}
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get("/status", (req, res) => {
    res.json({
        timestamp: new Date().toISOString(),
        randomString
    });
});


app.listen(port, () => {
    console.log(`Status server listening on http://0.0.0.0:${port}/status`);
});

logInfinitely();