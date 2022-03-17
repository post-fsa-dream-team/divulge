//db starting point
const { pool } = require('../db');
const fs = require('fs');

const seedQuery = fs.readFileSync('seed.sql', { encoding: 'utf-8'});

console.log('Running Seed...');
pool.query(seedQuery, err => {
  if (err) throw err;
  console.log('Seed Completed');

  pool.end();
})
