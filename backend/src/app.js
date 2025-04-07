
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { routes } from './router.js';

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ 
    extended: false 
}));
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true,
    maxAge: 600
}));
app.use('/api',routes);

export { app };
