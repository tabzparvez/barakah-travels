import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/barakah_travels';

declare global {
  // ...existing code...
  var _mongoose: Promise<typeof mongoose> | undefined;
}

if (!global._mongoose) {
  global._mongoose = mongoose.connect(MONGODB_URI, {
    dbName: 'barakah_travels',
  });
}

export default global._mongoose;
