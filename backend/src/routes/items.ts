import express, { Request, Response } from 'express';
import Item, { IItem } from '../models/Item';

const router = express.Router();

// Create a new item
router.post('/', async (req: Request, res: Response) => {
  try {
    const newItem: IItem = req.body;
    const createdItem = await Item.create(newItem);
    res.status(201).json(createdItem);
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
});

// Read all items
router.get('/', async (req: Request, res: Response) => {
  try {
    const items: IItem[] = await Item.find();
    res.json(items);
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});

// Update an item by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedItem: IItem = req.body;
    const result = await Item.findByIdAndUpdate(id, updatedItem, { new: true });
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item by ID
router.delete('/:tokenId', async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.params;
    await Item.deleteOne({ tokenId });
    res.json({ message: 'Item deleted' });
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;