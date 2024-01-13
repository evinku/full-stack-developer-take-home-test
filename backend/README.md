# Backend (Express.js & MongoDB)

## Quick Start

### Environment Setup
```
# Copy .env.example to .env
cp .env.example .env
```

### MongoDB Setup with Docker
```
# Start MongoDB container
docker run -d -p 27017:27017 --name=mongo mongo:latest
```

###  Start the Local Backend
```
# Install dependencies and start the application
npm install
npm run start
```

### Docker

Alternatively, you can start the local backend and MongoDB using Docker Compose:

```
# Build and start services with Docker Compose
docker-compose build
docker-compose up
```

## Testing

```
# Execute tests
npm run test
```

## Deployment

You can build a Docker image from the Dockerfile and deploy it on any Docker-supported system:

```
# Build the Docker image
docker build -t your-app-name .
```

When starting the Docker image, provide the necessary environment variables:

- MONGODB_URI: The URI for your MongoDB instance.
- PORT: The port number on which the app will run (e.g. 5000).
To run the Docker image:

```
# Run the Docker container
docker run -d -p 5000:5000 -e MONGODB_URI=your_mongodb_uri -e PORT=5000 your-app-name
```

Replace your-app-name with the name you wish to give to your app, and your_mongodb_uri with your actual MongoDB URI.

The deployed mongoDB is currently set up via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

The dockerized backend is deployed via [DigitalOcean](https://cloud.digitalocean.com)

See also the deploy script in **scripts/deploy.sh** for an example to push the Dockerimage to the DigitalOcean Container Registry.

## API Routes

The API provides the following endpoints:

### 1. Create a New Item (POST)

- **Endpoint**: `/items`
- **Method**: `POST`
- **Description**: Creates a new item in the database.
- **Request Body**:
  - `title` (String, required): Title of the item.
  - `description` (String, required): Description of the item.
  - `imageUrl` (String, required): URL of the item's image.
  - `owner` (String, required): Owner identifier of the item.
  - `tokenId` (String, required, unique): Unique token ID of the item.
- **Response**: Returns the created item.

### 2. Retrieve All Items (GET)

- **Endpoint**: `/items`
- **Method**: `GET`
- **Description**: Retrieves all items from the database.
- **Response**: Returns an array of items.

### 3. Update an Item (PUT)

- **Endpoint**: `/items/:tokenId`
- **Method**: `PUT`
- **Description**: Updates an existing item based on its `tokenId`.
- **URL Parameters**:
  - `tokenId` (String): The unique token ID of the item to update.
- **Request Body**: Fields to be updated (similar to POST body).
- **Response**: Returns the updated item. If the item is not found, returns a `404` error.

### 4. Delete an Item (DELETE)

- **Endpoint**: `/items/:tokenId`
- **Method**: `DELETE`
- **Description**: Deletes an item based on its `tokenId`.
- **URL Parameters**:
  - `tokenId` (String): The unique token ID of the item to delete.
- **Response**: Confirmation message. If the item is not found, returns a `404` error.