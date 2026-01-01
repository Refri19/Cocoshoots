// lib/mongodb.ts
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { throwDeprecation } from 'process';
import { MongoClientOptions } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
const authOptions: MongoClientOptions = {
  serverApi: { version: '1' },
  strict: true,
  useNewUrlParser: true, // Add any additional options here
};
// Global interface to prevent multiple connections in development
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}
let client:MongoClient;
if (process.env.NODE_ENV === 'development') {
  let globalWithMongoose = global as typeof global & { mongoose: MongooseCache };
  if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = { conn: null, promise: null };
  }
  client = new MongoClient(MONGODB_URI!, authOptions);
  client.connect();
}
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;