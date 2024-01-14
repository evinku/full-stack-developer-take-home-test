import MockAdapter from 'axios-mock-adapter';
import { itemApiService, axiosInstance } from '../src/app/services/itemApiService';
import { Item } from '../src/app/interfaces';

describe('itemApiService', () => {
    let mock: MockAdapter;

    beforeEach(() => {
        process.env.NEXT_PUBLIC_API_URL = 'http://mock-api-url.com';
        axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
        mock = new MockAdapter(axiosInstance);
    });

    afterEach(() => {
        mock.restore();
        delete process.env.NEXT_PUBLIC_API_URL;
    });

    const exampleItem = { tokenId: '1', imageUrl: 'imageUrl', title: 'title', description: 'description', owner: 'owner' }

    it('getItems should fetch items', async () => {
        const items: Item[] = [exampleItem, { ...exampleItem, tokenId: '2' }];
        mock.onGet('/items').reply(200, items);

        const response = await itemApiService.getItems();
        expect(response.data).toEqual(items);
    });

    it('createItem should add a new item', async () => {
        const newItem: Item = { ...exampleItem, tokenId: '3' };
        mock.onPost('/items', newItem).reply(201, newItem);

        const response = await itemApiService.createItem(newItem);
        expect(response.data).toEqual(newItem);
    });

    it('updateItem should update an item', async () => {
        const updatedItem: Item = exampleItem;
        mock.onPut(`/items/${updatedItem.tokenId}`).reply(200, updatedItem);

        const response = await itemApiService.updateItem(updatedItem.tokenId, updatedItem);
        expect(response.data).toEqual(updatedItem);
    });

    it('deleteItem should delete an item', async () => {
        const tokenId = '1';
        mock.onDelete(`/items/${tokenId}`).reply(200);

        const response = await itemApiService.deleteItem(tokenId);
        expect(response.status).toBe(200);
    });

    it('getItems should handle network error', async () => {
        mock.onGet('/items').networkError();

        await expect(itemApiService.getItems()).rejects.toThrow('Network Error');
    });
});
