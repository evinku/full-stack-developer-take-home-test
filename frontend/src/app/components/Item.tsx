import React from 'react';

interface ItemProps {
    title: string;
    description: string;
    imageUrl: string;
}

const Item: React.FC<ItemProps> = ({ title, description, imageUrl }) => {
    return (
        <div>
            <img src={imageUrl} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default Item;