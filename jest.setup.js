process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret-key-for-testing';
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test-db';