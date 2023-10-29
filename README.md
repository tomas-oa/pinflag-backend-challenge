# PINFLAG NODE JS CHALLENGE

## Installation

### 1. Clone the repository

```bash
git clone git@github.com:tomas-oa/pinflag-backend-challenge.git
```

### 2. Create a .env file

Use the .env.example file as a guide to create your own .env file
```bash
cp .env.example .env
```

Then paste the following values in the .env file
```bash
PORT=5000
DATABASE_URI=postgres://postgres:docker@127.0.0.1:5432/pinflag_challenge
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=docker
DATABASE_NAME=pinflag_challenge
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
```

### 3. Run docker-compose

Give excecution permissions to the script
```bash
chmod +x ./run-compose.sh
```

Run the script
```bash
./run-compose.sh
```

### 4. Run migrations

```bash
docker-compose exec app npx sequelize-cli db:migrate
```

## Usage

### Start the server

```bash
docker-compose exec app npm start
```

### Run on development mode

```bash
docker-compose exec app npm run dev
```

### Run tests

```bash
docker-compose exec app npm test
```

## API Documentation

SwaggerUI documentation available at http://localhost:5000/docs


## Assumptions