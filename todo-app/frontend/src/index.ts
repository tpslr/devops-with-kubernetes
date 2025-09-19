import express from "express";
import { getPicture } from "./picture.js";


const app = express();
const port = Number(process.env.PORT) || 3000;


const server = app.listen(port, () => {
    console.log(`Server started in port ${port}`);
});


app.get("/picture", async (req, res, next) => {
    try {
        const picture = await getPicture();
        res.type("image/webp").send(picture);
    } catch (error) {
        next(error);
    }
});

app.get("/stop", (_req, res) => {
    res.send("Shutting down...");
    process.exit(0);
});

app.use(express.static("static"));

const shutdown = (signal: string) => {
    console.log(`Received ${signal}, shutting down...`);
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
};

['SIGINT', 'SIGTERM'].forEach(sig => process.on(sig, () => shutdown(sig)));
