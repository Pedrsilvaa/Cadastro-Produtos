
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { routes } from './router.js';
import 'dotenv/config';

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(morgan('dev'));

app.use(express.urlencoded({ 
    extended: false 
}));

app.use(express.json());

app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true,
    maxAge: 600
}));

app.use('/api', routes);

export { app };
