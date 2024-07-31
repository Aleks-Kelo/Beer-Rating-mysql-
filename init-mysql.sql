-- Create the database
CREATE DATABASE IF NOT EXISTS mydatabase;

-- Use the newly created database
USE mydatabase;

-- Create the 'beers' table
CREATE TABLE IF NOT EXISTS beers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    rating DECIMAL(3, 2) NOT NULL,
    ratingCount INT NOT NULL
);

-- Insert data into the 'beers' table
INSERT INTO beers (name, type, rating, ratingCount) VALUES
    ('Ipa', 'Pale ale', 4, 3),
    ('Heineken', 'Lager', 3, 2),
    ('Budweiser', 'Lager', 4, 6),
    ('Corona', 'Pale Lager', 2, 1);
