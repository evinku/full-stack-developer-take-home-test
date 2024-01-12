import express, { Request, Response } from 'express';
import Item, { IItem } from '../models/Item';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const newItem: IItem = req.body;
    const createdItem = await Item.create(newItem);
    res.status(201).json(createdItem);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const items: IItem[] = await Item.find();
    res.json(items);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});

router.put('/:tokenId', async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.params;
    const updatedItem: IItem = req.body;
    const result = await Item.findOneAndUpdate({ tokenId: tokenId }, updatedItem, { new: true });
    if (!result) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(result);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:tokenId', async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.params;
    await Item.deleteOne({ tokenId });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
});

export default router;