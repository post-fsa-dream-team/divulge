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

// /*first solution: https://dev.to/ogwurujohnson/-persisting-a-node-api-with-postgresql-without-the-help-of-orms-like-sequelize-5dc5
const createTables = () => {
  const testTable1 = `CREATE TABLE IF NOT EXISTS
      users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(128) NOT NULL,
        email VARCHAR(320) NOT NULL,
        password VARCHAR(128) NOT NULL,
        first_name VARCHAR(400) NOT NULL,
        last_name VARCHAR(400) NOT NULL,
        birth_date DATE NOT NULL,
        location VARCHAR(128) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        last_login TIMESTAMP NOT NULL DEFAULT now()
      )`;
  pool.query(testTable1)
    .then((res) => {
      console.log(res)
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  const testTable2 = `CREATE TABLE IF NOT EXISTS
      posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(260) NOT NULL,
        image_url TEXT NOT NULL,
        text TEXT NOT NULL,
        category VARCHAR(128) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now())`


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

const createFk = () => {
  pool.query(`ALTER TABLE posts ADD CONSTRAINT constraint_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

//
// PRIMARY KEY (id),
// FOREIGN KEY (user_id) REFERENCES users(id)

// pool.query(
//   `CREATE TABLE IF NOT EXISTS posts (id SERIAL PRIMARY KEY,title VARCHAR(260) NOT NULL,image_url TEXT NOT NULL,text TEXT NOT NULL,category VARCHAR(128) NOT NULL,created_at TIMESTAMP NOT NULL DEFAULT now()`, (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

// pool.query(
//   `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY,username VARCHAR(128) NOT NULL,email VARCHAR(320) NOT NULL,password VARCHAR(128) NOT NULL,first_name VARCHAR(400) NOT NULL,last_name VARCHAR(400) NOT NULL,birth_date DATE NOT NULL,location VARCHAR(128) NOT NULL,created_at TIMESTAMP NOT NULL DEFAULT now(),last_login TIMESTAMP NOT NULL DEFAULT now())`, (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

//USER COLS
// id SERIAL PRIMARY KEY,
// username VARCHAR(128) NOT NULL,
// email VARCHAR(128) NOT NULL,
// password VARCHAR(128) NOT NULL,
// firstName VARCHAR(128) NOT NULL,
// lastName VARCHAR(128) NOT NULL,
// birthDate DATE NOT NULL,
// location VARCHAR(128) NOT NULL
// createdAt TIMESTAMP NOT NULL DEFAULT now(),
// lastLogin TIMESTAMP NOT NULL DEFAULT now(),



/*second solution https://stackoverflow.com/questions/58645460/how-to-create-a-table-with-postgresql-in-nodejs-without-an-orm */
// pool.query(`CREATE TABLE IF NOT EXISTS
//        students(
//         id SERIAL PRIMARY KEY,
//         student_name VARCHAR(128) NOT NULL,
//         student_age INT NOT NULL,
//         student_class VARCHAR(128) NOT NULL,
//         parent_contact VARCHAR(128) NOT NULL,
//         admission_date VARCHAR(128) NOT NULL
//        )`, (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

// pool.query(`CREATE TABLE IF NOT EXISTS
//        subjects(
//         id SERIAL PRIMARY KEY,
//         subject_name VARCHAR(128) NOT NULL,
//         subject_age INT NOT NULL,
//         subject_class VARCHAR(128) NOT NULL
//        )`, (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


//export pool and createTables to be accessible  from an where within the application
module.exports = {
  createTables,
  createFk,
  pool,
};

require('make-runnable');
