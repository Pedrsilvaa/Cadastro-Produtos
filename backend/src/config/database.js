
import mongoose from 'mongoose';
import 'dotenv/config';

const DATABASE_URL = process.env.DATABASE_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('database connected');
    }
    catch(error) {
        console.error('database connection error:\n', error);
        process.exit(1);
    }
};

export { connectDB };
