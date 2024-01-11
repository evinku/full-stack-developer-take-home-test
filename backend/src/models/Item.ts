import mongoose, { Document } from 'mongoose';

export interface IItem extends Document {
  title: string;
  description: string;
  imageUrl: string;
  owner: string;
  tokenId: number
}

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  owner: { type: String, required: true },
  tokenId: { type: String, required: true }
});

export default mongoose.model<IItem>('Item', itemSchema);