import React, { useState } from 'react';
import { Item } from '../interfaces';

interface EditModalProps {
    item: Item;
    onClose: () => void;
    onSubmit: (updatedItem: Item) => void;
}

const EditModal: React.FC<EditModalProps> = ({ item, onClose, onSubmit }) => {
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) {
            alert("Please fill in all fields.");
            return;
        }

        onSubmit({ ...item, title, description, tokenId: item.tokenId });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Edit NFT</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="border p-2 w-full mb-4"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className="border p-2 w-full mb-4"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="flex justify-center items-center mb-4">
                        <img
                            src={`https://picsum.photos/id/${item.tokenId}/200`}
                            alt={'Preview Image'}
                        />
                    </div>

                    <div className="flex justify-center items-center mb-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Save Changes
                        </button>
                        <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
