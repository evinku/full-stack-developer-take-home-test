import React, { useState, useEffect } from 'react';
import ItemComponent from '../components/Item';
import Modal from '../components/Modal';
import { apiService } from '../services/apiService';
import { Item } from '../interfaces';
import { useWeb3React } from '@web3-react/core';
import MetaMaskBtn from '../components/MetaMaskBtn';

const Main: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const { connector, hooks } = useWeb3React();
    const { useSelectedAccount } = hooks;
    const account = useSelectedAccount(connector);

    useEffect(() => {
        const fetchData = async () => {
            const res = await apiService.getItems();
            setItems(res.data);
        }

        fetchData().catch(console.error);
    }, []);

    const handleAddItem = async (newItem: Item) => {
        await apiService.createItem(newItem);
        const res = await apiService.getItems();
        setItems(res.data);
    };

    const handleDeleteItem = async (tokenId: string) => {
        await apiService.deleteItem(tokenId);
        const res = await apiService.getItems();
        setItems(res.data);
    };

    const handleEditItem = async (updatedItem: Item) => {
        try {
            await apiService.updateItem(updatedItem.tokenId, updatedItem);
            const res = await apiService.getItems();
            setItems(res.data);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <div className="sticky top-0 z-10 bg-white p-4 shadow-md flex justify-end gap-2 m">
                <button
                    hidden={!account}
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Mint New NFT
                </button>
                <div>
                    <MetaMaskBtn />
                </div>
            </div>

            {account ? <div>
                <div className="flex justify-center w-full">
                    <div className="grid grid-cols-3 gap-2">
                        {items?.map((item) => (
                            <ItemComponent currentAccount={account} onDelete={handleDeleteItem} onEdit={handleEditItem} key={item.tokenId} {...item} />
                        ))}
                    </div>
                </div>
                {showModal && <Modal onClose={() => setShowModal(false)} onSubmit={handleAddItem} mintedItems={items.map(i => i.tokenId)} currentAccount={account} />}
            </div> : <div className="flex justify-center items-center">
                <p className="text-2xl font-bold">Please connect a wallet first</p>
            </div>
            }
        </div>
    );
};

export default Main;