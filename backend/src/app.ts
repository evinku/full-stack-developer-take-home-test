import express from 'express';
import cors from 'cors';
import itemsRouter from './routes/items';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/items', itemsRouter);

export default app;