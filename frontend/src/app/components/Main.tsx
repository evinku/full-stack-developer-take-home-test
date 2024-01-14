import React, { useState, useEffect } from 'react';
import ItemComponent from '../components/Item';
import AddModal from './AddModal';
import { itemApiService } from '../services/itemApiService';
import { Item } from '../interfaces';
import { useWeb3React } from '@web3-react/core';
import MetaMaskBtn from '../components/MetaMaskBtn';
import LoadingModal from './LoadingModal';

const Main: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { connector, hooks } = useWeb3React();
    const { useSelectedAccount } = hooks;
    const account = useSelectedAccount(connector);

    useEffect(() => {
        const fetchData = async () => {
            const res = await itemApiService.getItems();
            setItems(res.data);
        }

        fetchData().catch(console.error)
    }, []);

    const handleAddItem = async (newItem: Item) => {
        setIsLoading(true);
        try {
            await itemApiService.createItem(newItem);
            const res = await itemApiService.getItems();
            setItems(res.data);
        } catch (error) {
            console.error('Error adding item:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDeleteItem = async (tokenId: string) => {
        setIsLoading(true);
        try {
            await itemApiService.deleteItem(tokenId);
            const res = await itemApiService.getItems();
            setItems(res.data);
        } catch (error) {
            console.error('Error deleting item:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleEditItem = async (updatedItem: Item) => {
        setIsLoading(true);
        try {
            await itemApiService.updateItem(updatedItem.tokenId, updatedItem);
            const res = await itemApiService.getItems();
            setItems(res.data);
        } catch (error) {
            console.error('Error updating item:', error);
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div>
            {isLoading && <LoadingModal />}
            <div className="sticky top-0 z-10 bg-white p-4 shadow-md flex justify-end gap-2 m">
                <button
                    hidden={!account}
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Mint New NFT
                </button>
                <div>
                    <MetaMaskBtn />
                </div>
            </div>

            {account ? <div>
                <div className="flex justify-center px-2">
                    <div className="grid grid-cols-3 gap-2">
                        {items?.map((item) => (
                            <ItemComponent currentAccount={account} onDelete={handleDeleteItem} onEdit={handleEditItem} key={item.tokenId} {...item} />
                        ))}
                    </div>
                </div>
                {showAddModal && <AddModal onClose={() => setShowAddModal(false)} onSubmit={handleAddItem} mintedItems={items.map(i => i.tokenId)} currentAccount={account} />}
            </div> : <div className="flex justify-center items-center">
                <p className="text-2xl font-bold">Please connect a wallet first</p>
            </div>
            }
        </div>
    );
};

export default Main;