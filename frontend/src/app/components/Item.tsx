import React from 'react';

interface ItemProps {
    title: string;
    description: string;
    imageUrl: string;
    tokenId: string
    owner: string
    onDelete: (id: string) => Promise<void>;
}

const Item: React.FC<ItemProps> = ({ title, description, imageUrl, owner, tokenId,  onDelete }) => {
    const deleteButtonStyle: React.CSSProperties = {
        position: 'absolute',
        top: '0',
        right: '0',
        backgroundColor: 'red',
        color: 'white',
        cursor: 'pointer',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '0 0 0 5px', // Rounded corner only in the bottom left
    };

    const itemContainerStyle: React.CSSProperties = {
        position: 'relative',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const imageStyle: React.CSSProperties = {
        width: '100%',
        borderRadius: '5px',
    };

    return (
        <div style={itemContainerStyle}>
            <div style={{ position: 'relative' }}>
                <img src={imageUrl} alt={title} style={imageStyle} />
                <button style={deleteButtonStyle} onClick={() => onDelete(tokenId)}>X</button>
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
            <p><b>Owner:</b> {owner}</p>
            <p><b>Token ID:</b> {tokenId}</p>
        </div>
    );
};

export default Item;