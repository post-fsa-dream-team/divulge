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
const createTables = () => {
  const testTable1 = `CREATE TABLE IF NOT EXISTS
      students(
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(128) NOT NULL,
        student_age INT NOT NULL,
        student_class VARCHAR(128) NOT NULL,
        parent_contact VARCHAR(128) NOT NULL,
        admission_date VARCHAR(128) NOT NULL
      )`;
  pool.query(testTable1)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  const testTable2 = `CREATE TABLE IF NOT EXISTS
      posts(
        id SERIAL PRIMARY KEY,
        post_name VARCHAR(128) NOT NULL,
        post_age INT NOT NULL,
        post_class VARCHAR(128) NOT NULL,
        parent_contact VARCHAR(128) NOT NULL,
        admission_date VARCHAR(128) NOT NULL
      )`;
  pool.query(testTable2)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

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
