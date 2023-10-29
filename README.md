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

Then paste the following values in the .env file (Usually the environment variables should be private and NOT uploaded. But since this a challenge I'm leaving them here to facilitate the review)
```bash
PORT=5000
DATABASE_URI=postgres://postgres:docker@127.0.0.1:5432/pinflag_challenge
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=docker
DATABASE_NAME=pinflag_challenge
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
```

### 3. Install dependencies

```bash
npm install --force
```

### 4. Create Postgres database using docker

```bash
docker pull postgres && docker run --name pinflag_challenge_db -e POSTGRES_DB=pinflag_challenge -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

### 5. Run migrations

```bash
npx sequelize-cli db:migrate
```

## Usage

### Start the server

```bash
npm start
```

### Run on development mode

```bash
npm run dev
```

### Run tests

```bash
npm test
```

## API Documentation

SwaggerUI documentation available at http://localhost:5000/docs

## Assumptions