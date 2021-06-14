// inside db/index.js
const { Client } = require('pg'); // imports the pg module

// supply the db name and location of the database
const client = new Client('postgres://localhost:5432/juicebox-dev');

// let's start building some helper functions that we might use throughout our application:
// So Empty
// Well, now every time our seed file runs, we have an empty database. 
// Let's build a function in db/index.js that we can use in db/seed.js:

async function createUser({ 
    username,
    password,
    name,
    location,
}) {
    try {
        const { rows: [ user ] } = await client.query(`
            INSERT INTO users(username, password, name, location)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            ;
        `, [username, password, name, location]);

        return user;
    } catch (error) {
        throw error;
    }
}
// VALUES($1, $2) are placeholders

async function getAllUsers() {
    const { rows } = await client.query(
      `SELECT id, username, name, location, active
      FROM users;
    `);
  
    return rows;
  }

// updateUser
// Now we want to write a method that will allow us to change a user 
// should they want to update their profile.
async function updateUser(id, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
  
    // return early if this is called without fields
    if (setString.length === 0) {
      return;
    }
  
    try {
      const { rows: [ user ] } = await client.query(`
        UPDATE users
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
      `, Object.values(fields));
  
      return user;
    } catch (error) {
      throw error;
    }
  }

// createPost
async function createPost({
    authorId,
    title,
    content
  }) {
    try {
  
    } catch (error) {
      throw error;
    }
  }

// updatePost
async function updatePost(id, {
    title,
    content,
    active
  }) {
    try {
  
    } catch (error) {
      throw error;
    }
  }

// getAllPosts
async function getAllPosts() {
    try {
  
    } catch (error) {
      throw error;
    }
  }

// getPostsByUser
async function getPostsByUser(userId) {
    try {
      const { rows } = client.query(`
        SELECT * FROM posts
        WHERE "authorId"=${ userId };
      `);
  
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async function getUserById(userId) {
    // first get the user (NOTE: Remember the query returns 
      // (1) an object that contains 
      // (2) a `rows` array that (in this case) will contain 
      // (3) one object, which is our user.
    // if it doesn't exist (if there are no `rows` or `rows.length`), return null
  
    // if it does:
    // delete the 'password' key from the returned object
    // get their posts (use getPostsByUser)
    // then add the posts to the user object with key 'posts'
    // return the user object
  }




  // and export them
  module.exports = {
    client,
    getAllUsers,
    createUser,
    updateUser,
    createPost,
    updatePost,
    getAllPosts,
    getPostsByUser,
    getUserById,
  }

