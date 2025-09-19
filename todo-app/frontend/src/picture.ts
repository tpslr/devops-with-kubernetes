import { writeFile, readFile } from "fs/promises";
import { existsSync } from "fs";

let imageCache: {
    buffer: Buffer;
    timestamp: number;
} | null = null;

const IMAGE_CACHE_DURATION = Number(process.env.IMAGE_CACHE_DURATION) || 10 * 60 * 1000; // default to 10 minutes

async function getPicture(): Promise<Buffer> {
    // check local cache
    if (imageCache && (Date.now() - imageCache.timestamp < IMAGE_CACHE_DURATION)) {
        return imageCache.buffer;
    }

    // check filesystem cache
    if (!existsSync("/image-cache/timestamp.txt") || !existsSync("/image-cache/image.webp")) 
        return downloadPicture();

    const timestampStr = await readFile("/image-cache/timestamp.txt", "utf-8");
    const timestamp = Number(timestampStr);
    if (Date.now() - timestamp < IMAGE_CACHE_DURATION) {
        const buffer = await readFile("/image-cache/image.webp");
        imageCache = {
            buffer: Buffer.from(buffer),
            timestamp
        };
        return imageCache.buffer;
    }


    // download new picture
    return downloadPicture();
}

async function downloadPicture(): Promise<Buffer> {
    const response = await fetch("https://picsum.photos/1200/300.webp");

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    await cachePicture(buffer);

    return buffer;
}


async function cachePicture(buffer: Buffer) {
    await writeFile("/image-cache/image.webp", buffer);
    await writeFile("/image-cache/timestamp.txt", Date.now().toString());
    imageCache = {
        buffer,
        timestamp: Date.now()
    };
}


export { getPicture };