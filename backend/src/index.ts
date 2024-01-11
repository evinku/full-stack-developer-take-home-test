import itemsRouter from './routes/items';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/items', itemsRouter);

const PORT: string | number = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
