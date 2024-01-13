import request from 'supertest';
import app from '../src/app';
import Item, { IItem } from '../src/models/Item';

jest.mock('../src/models/Item');
const mockedItem = Item as jest.Mocked<typeof Item>;

describe('Item routes', () => {
  test('POST / - create a new item', async () => {
    const mockItem = { title: 'Test Item', tokenId: '1',};
    mockedItem.create.mockResolvedValue(mockItem as any);
    const response = await request(app).post('/items').send(mockItem);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(mockItem);
  });

  test('GET / - get all items', async () => {
    const mockItems = [{ title: 'Test Item 1', tokenId: '1' }, { title: 'Test Item 2', tokenId: '2' }];
    mockedItem.find.mockResolvedValue(mockItems as IItem[]);
    const response = await request(app).get('/items');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockItems);
  });

  test('PUT /:tokenId - update an item', async () => {
    const tokenId = '1';
    const updatedItem = { title: 'Updated Item', tokenId };
    mockedItem.findOneAndUpdate.mockResolvedValue(updatedItem as IItem);

    const response = await request(app).put(`/items/${tokenId}`).send(updatedItem);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(updatedItem);
  });

  test('DELETE /:tokenId - delete an item', async () => {
    const tokenId = '1';
    mockedItem.deleteOne.mockResolvedValue({ deletedCount: 1 } as any);

    const response = await request(app).delete(`/items/${tokenId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Item deleted' });
  });
});
