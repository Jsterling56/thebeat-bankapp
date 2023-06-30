const mysql = require('mysql');
const express = require('express');

const app = express();




const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'balance_db'
    },
    console.log(`Connected to the balance_db database.`)
  );

  db.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.error('Error executing query: ', error);
      return;
    }
    
    // Process the query results
    console.log('Query results: ', results);
  });

  db.on('error', (error) => {
    console.error('MySQL connection error: ', error);
  });
