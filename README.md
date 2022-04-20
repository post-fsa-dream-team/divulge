# Divulge

A publishing platform built with Vanilla JavaScript, CSS, Express, Node, SQL, and PostgreSQL

## Starting point

### Local Environment

1, Connect to your database

```bash
psql
create database divulge
\c divulge
```

In another terminal

```bash
npm run create
npm run seed
```

2, Add ```secrets.js``` in ```app``` folder

```js
const secrets = {
APIHOST: 'api-host-here',
APIKEY :'api-key-here'
}

export default secrets;
```

3, Start the file locally

```bash
npm install
npm run start-dev
```

### Production Environment

