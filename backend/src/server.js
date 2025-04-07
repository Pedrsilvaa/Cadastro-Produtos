
import { app } from './app.js';
import 'dotenv/config';

const API_PORT = process.env.API_PORT;

app.listen(API_PORT, (error) => {
    if(error) {
        console.error('server wasn\'t started');
        return error;
    }
    console.log('server is started');
});
