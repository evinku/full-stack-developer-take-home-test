import React, { useState } from 'react';
import EditModal from './EditModal';
import { Item } from '../interfaces';
import '../itemStyles.css';

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
        <div className="item-container">
            <div className="relative">
                <img src={imageUrl} alt={title} className="image-style" />
                <div className="button-container">
                    <button hidden={!(owner === currentAccount)} className="button-style" onClick={() => onDelete(tokenId)}>X</button>
                    <button hidden={!(owner === currentAccount)} className="button-style edit" onClick={() => setShowEditModal(true)}>Edit</button>
                </div>
            </div>
            <p><b>Title:</b> {title}</p>
            <p><b>Owner:</b> {owner}</p>
            <p><b>Token ID:</b> {tokenId}</p>
            <p><b>Description:</b> {description}</p>
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