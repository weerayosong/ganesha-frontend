import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local",
    );
}

// สร้าง Interface เพื่อกำหนดโครงสร้าง Cache ให้ชัดเจน
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// ประกาศ global variable ชื่อใหม่เพื่อไม่ให้ชื่อซ้ำกับ import mongoose ด้านบน
declare global {
    var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

async function connectMongo() {
    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
        };

        // ใช้ mongooseInstance เป็น parameter name เพื่อไม่ให้งง
        cached!.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongooseInstance) => {
                return mongooseInstance;
            });
    }

    try {
        cached!.conn = await cached!.promise;
    } catch (e) {
        cached!.promise = null;
        throw e;
    }

    return cached!.conn;
}

export default connectMongo;
