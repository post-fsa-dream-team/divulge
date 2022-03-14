// // setting up the node-postgres driver
// const pg = require('pg');
// const postgresUrl = 'postgres://localhost/divulge';
// const client = new pg.Client(postgresUrl);

// // connecting to the `postgres` server
// client.connect(err => {
//   if (err) {
//     console.error('connection error', err.stack)
//   } else {
//     console.log('connected')
//   }
// })

// // make the client available as a Node module
// module.exports = client;

const pg = require('pg');

const config = {
  database: 'divulge',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});

/*first solution: https://dev.to/ogwurujohnson/-persisting-a-node-api-with-postgresql-without-the-help-of-orms-like-sequelize-5dc5 */
const createTables = async () => {
  const testTable1 = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(128) NOT NULL,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        password VARCHAR NOT NULL,
        birth_date DATE NOT NULL,
        location VARCHAR(128) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        last_login TIMESTAMP NOT NULL DEFAULT now()
      )`;
  try {
    const res = await pool.query(testTable1);
    if (res) console.log('USERRRRSSSSS', res)
    else throw new Error;
  } catch (error) {
    console.log(error)
  }
  const testTable2 = `CREATE TABLE IF NOT EXISTS
      posts(
        id SERIAL PRIMARY KEY,
        title VARCHAR(350),
        image_url TEXT,
        content TEXT,
        category VARCHAR(128) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        user_id SERIAL,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )`;
  try {
    const res = await pool.query(testTable2);
    if (res) console.log('POOOOSSSTTSSS', res)
    else throw new Error;
  } catch (error) {
    console.log(error)
  }
};

/*second solution https://stackoverflow.com/questions/58645460/how-to-create-a-table-with-postgresql-in-nodejs-without-an-orm */
// db.query(“CREATE TABLE TABLE_NAME(id SERIAL PRIMARY KEY, xzy VARCHAR(40) NOT NULL,
// abc VARCHAR(40) NOT NULL)”, (err, res) => {
// console.log(err, res);
// db.end();
// });

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


//export pool and createTables to be accessible  from an where within the application
module.exports = {
  createTables,
  pool,
};

require('make-runnable');
