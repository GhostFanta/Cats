# Chatroom/Server

> Backend for the chatroom project.

## Dependencies

- Base: express
- DB: mongodb
- Load balancing: nginx
- ORM: mongoose
- Authentication: express-jwt, passport
- Socket: socket.io

## Requirements:

- node >= v10.17.0
- mongoDB >= 4.2.2
- npm >= 6.11.3

## Setup:

Setup

```
npm install
```

Run in local debug mode:
```
npm run dev
```

Run in docker mode(Pre-install of docker required):
```
docker-compose up --build
```
