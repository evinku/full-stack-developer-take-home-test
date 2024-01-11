"use client";
import React, { useState, useEffect } from 'react';
import ItemComponent from './components/Item';
import Modal from './components/Modal';
import { apiService } from './services/apiService';
import { Item } from './interfaces';

const Home: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiService.getItems()
      setItems(res.data)
    }

    fetchData()
      .catch(console.error);;
  }, [])

  const handleAddItem = async (newItem: Item) => {
    await apiService.createItem(newItem)
    const res = await apiService.getItems()
    setItems(res.data)
  };

  const handleDeleteItem = async (tokenId: string) => {
    await apiService.deleteItem(tokenId)
    const res = await apiService.getItems()
    setItems(res.data)
  };

  return (
    <div>
      <div className="sticky top-0 bg-white p-4 shadow-md">
        <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Mint New NFT
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items?.map((item) => (
          <ItemComponent onDelete={handleDeleteItem} key={item.tokenId} {...item} />
        ))}
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} onSubmit={handleAddItem} mintedItems={items.map(i => i.tokenId)} />}
    </div>
  );
};

export default Home;