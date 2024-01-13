import React, { useState } from 'react';
import EditModal from './EditModal';
import { Item } from '../interfaces';

interface ItemProps {
    title: string;
    description: string;
    imageUrl: string;
    tokenId: string;
    owner: string;
    currentAccount: string;
    onDelete: (id: string) => Promise<void>;
    onEdit: (item: Item) => Promise<void>;
}

const Item: React.FC<ItemProps> = ({ title, description, imageUrl, owner, tokenId, currentAccount, onDelete, onEdit }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <div className="relative mb-5 border border-gray-300 rounded shadow-md p-2">
            <img src={imageUrl} alt={title} className="w-full rounded" />
            <div className="absolute top-0 right-0">
                <button hidden={!(owner === currentAccount)} className="text-white bg-red-500 hover:bg-red-700 p-1 rounded mr-1 mt-1" onClick={() => onDelete(tokenId)}>X</button>
                <button hidden={!(owner === currentAccount)} className="text-white bg-blue-500 hover:bg-blue-700 p-1 rounded mr-1 mt-1" onClick={() => setShowEditModal(true)}>Edit</button>
            </div>
            <div className="mt-4 space-y-2 text-gray-800">
                <p className="break-words font-semibold text-lg">
                    <span className="text-gray-600">Title:</span> {title}
                </p>
                <p className="break-words font-medium">
                    <span className="text-gray-600">Owner:</span> {owner}
                </p>
                <p className="break-words font-medium">
                    <span className="text-gray-600">Token ID:</span> {tokenId}
                </p>
                <p className="break-words font-medium">
                    <span className="text-gray-600">Description:</span> {description}
                </p>
            </div>
            {showEditModal && (
                <EditModal
                    item={{ title, description, imageUrl, tokenId, owner }}
                    onClose={() => setShowEditModal(false)}
                    onSubmit={(updatedItem) => {
                        onEdit(updatedItem);
                        setShowEditModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default Item;