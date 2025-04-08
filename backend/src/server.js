
import { app } from './app.js';
import { connectDB } from './config/database.js';
import 'dotenv/config';

connectDB();

const API_PORT = process.env.API_PORT;

app.listen(API_PORT, (error) => {
    if(error) {
        console.error('server wasn\'t started:\n', error);
        process.exit(1);
    }
    
    console.log('server is started');
});
