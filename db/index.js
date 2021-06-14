// inside db/index.js
const { Client } = require('pg'); // imports the pg module

// supply the db name and location of the database
const client = new Client('postgres://localhost:5432/juicebox-dev');

// let's start building some helper functions that we might use throughout our application:
async function getAllUsers() {
    const { rows } = await client.query(
      `SELECT id, username 
      FROM users;
    `);
  
    return rows;
  }
  
// So Empty
// Well, now every time our seed file runs, we have an empty database. 
// Let's build a function in db/index.js that we can use in db/seed.js:

async function createUser({ username, password }) {
    try {
        const { rows } = await client.query(`
            INSERT INTO users(username, password)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            ;
        `, [username, password]);

        return rows;
    } catch (error) {
        throw error;
    }
}
// VALUES($1, $2) are placeholders


  // and export them
  module.exports = {
    client,
    getAllUsers,
    createUser,
  }

