# Tokenize Images Monorepo

Link to [test assignment](https://docs.google.com/document/d/1L3H-N4eOeUPrRlsghFcRK-2WrlbNWcFHZFTBfhx1TJk/edit#heading=h.zf0icanurg2q) for reference.

This application focuses on tokenizing images from [Picsum Photos](https://picsum.photos/). The range for tokenization is from 0-1000, where each image number represents a unique `tokenId`. These tokenIds are exclusive and can exist only once in the database.

## Features

- **Mint NFTs**: Users can mint non-fungible tokens (NFTs) based on the images. Each tokenId is associated with a unique image from Picsum Photos.
- **Wallet Association**: Users need to connect their [MetaMask wallet](https://metamask.io/) to mint NFTs, view existing NFTs, and manage their created NFTs.
- **Exclusive Modification Rights**: Only the creators of the NFTs have the rights to update or delete their created NFTs.

## Tech Stack

- **Frontend**: React with Next.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB

## Getting Started

To get started with this project, refer to the specific setup instructions located in the `frontend` and `backend` directories of this monorepo. Each directory contains detailed steps for installation, configuration, and running the application locally.

- For frontend setup, see `frontend/README.md`.
- For backend setup, see `backend/README.md`

## Additional Note

This application is a theoretical and prototypical tool for tokenizing images and managing NFTs. It is not built on a blockchain and does not offer the full security and decentralization features of blockchain technology. The MongoDB database used here is for demonstration and prototyping purposes only and does not replace a blockchain. Users looking to implement a full-scale NFT platform should consider additional security checks, decentralization, and blockchain integration.

## Deployment URLs

- **Frontend URL**: [https://frontend-eight-alpha-28.vercel.app](https://frontend-eight-alpha-28.vercel.app)
- **Backend URL**: [https://sea-lion-app-qnjr5.ondigitalocean.app](https://sea-lion-app-qnjr5.ondigitalocean.app)