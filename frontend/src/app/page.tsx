"use client";
import React, { useState, useEffect } from 'react';
import ItemComponent from './components/Item';
import Modal from './components/Modal';
import { apiService } from './services/apiService';

interface Item {
  title: string;
  description: string;
  imageUrl: string;
}

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

  const extractIdFromUrl = (url: string): number => {
    const idPattern = /\/id\/(\d+)\//;
    const match = url?.match(idPattern);
    return match ? parseInt(match[1]) : 1;
  };

  return (
    <div>
      <div className="sticky top-0 bg-white p-4 shadow-md">
        <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Describe Image
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items?.map((item, index) => (
          <ItemComponent key={index} {...item} />
        ))}
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} onSubmit={handleAddItem} lastImageId={extractIdFromUrl(items?.slice(-1)[0]?.imageUrl)} />}
    </div>
  );
};

export default Home;