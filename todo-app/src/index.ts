import express from "express";


const app = express();
const port = Number(process.env.PORT) || 3000;


const server = app.listen(port, () => {
    console.log(`Server started in port ${port}`);
});


app.get("/", (req, res) => {
    res.send("Hello, World!");
});

const shutdown = (signal: string) => {
    console.log(`Received ${signal}, shutting down...`);
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
};

['SIGINT', 'SIGTERM'].forEach(sig => process.on(sig, () => shutdown(sig)));
