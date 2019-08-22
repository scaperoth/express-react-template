# express-react-template
Boilerplate full-stack MERN app with authentication using passport and JWTs.

## Configuration

- add your own `mongoURI` in `config/keys`.
- add your own secret key in `config/keys` that will be used by passport and JWT.

```javascript
module.exports = {
  mongoURI: "YOUR_MONGO_URI_HERE",
  secretOrKey: "secret"
};
```

## Quick Start

```javascript

// Install dependencies for server & client
yarn && yarn client-install

// Run client & server with concurrently
yarn dev

// Server runs on http://localhost:5000 and client on http://localhost:3000
```

References:

- [React](https://reactjs.org) and [React Router](https://reacttraining.com/react-router/) for frontend
- [Express](http://expressjs.com/) and [Node](https://nodejs.org/en/) for the backend
- [MongoDB](https://www.mongodb.com/) for the database
- [Redux](https://redux.js.org/basics/usagewithreact) for state management between React components

> special thanks to [rishipr's project, mern-auth](https://github.com/rishipr/mern-auth)
