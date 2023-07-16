DROP DATABASE IF EXISTS balance_db;
CREATE DATABASE balance_db;

USE balance_db;

CREATE TABLE balances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(255) NOT NULL,
  balance INT NOT NULL
);

INSERT INTO balances (user, balance) VALUES ('John', 100;
UPDATE balances SET balance = 150.75 WHERE user = 'John';
SELECT balance FROM balances WHERE user = 'John';
