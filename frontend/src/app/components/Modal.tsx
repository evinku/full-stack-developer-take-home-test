import React, { useState } from 'react';
import { Item } from '../interfaces';

interface ModalProps {
    onClose: () => void;
    onSubmit: (newItem: Item) => void;
    mintedItems: string[]
}

const Modal: React.FC<ModalProps> = ({ onClose, onSubmit, mintedItems }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tokenId, setTokenId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !tokenId) {
            alert("Please fill in all fields.");
            return;
        }

        onSubmit({
            title,
            description,
            imageUrl: `https://picsum.photos/id/${tokenId}/200`,
            tokenId,
            owner: 'dasd'
        });
        onClose();
    };

    function validateTokenId(value: string) {
        const number = parseInt(value, 10);
        if (number < 0 || number > 1000) {
            alert("Token ID must be between 0 and 1000.");
            setTokenId('');
        } else {
            setTokenId(String(number));
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Mint New NFT</h2>
                <form onSubmit={handleSubmit}>

                    <input
                        className="border p-2 w-full mb-4"
                        type="number"
                        placeholder="TokenId"
                        value={tokenId}
                        onChange={(e) => validateTokenId(e.target.value)}
                    />

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
                        {tokenId ? <img
                            src={`https://picsum.photos/id/${tokenId}/200`}
                            alt={'Preview Image'}
                        /> : <div>Please enter a token ID between 0 - 1000 </div>}
                    </div>

                    <div className="flex justify-center items-center mb-4">
                        <button
                            disabled={mintedItems.includes(tokenId)}
                            type="submit"
                            className={`font-bold py-2 px-4 rounded text-white ${mintedItems.includes(tokenId) ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'
                                }`}
                        >
                            Mint
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

export default Modal;
