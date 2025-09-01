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

logInfinitely();