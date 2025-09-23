import postgres from "postgres";

const sql = postgres({
    host: process.env.PG_HOST || "localhost",
    port: Number(process.env.PG_PORT || 5432),
    database: process.env.PG_DATABASE || "pingpong",
    username: process.env.PG_USER || "postgres",
    password: process.env.PG_PASSWORD || undefined,
});

export { sql };