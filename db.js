const mysql = require('mysql2');

const tableName = 'beers';

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL');
});

async function insertNewBeer(document) {
    const { name, type, rating, ratingCount } = document;
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO ${tableName} (name, type, rating, ratingCount) VALUES (?, ?, ?, ?)`;
        connection.query(
            sql,
            [name.trim(), type.trim(), rating, ratingCount],
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
}

async function findExactBeer(beerId) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM ${tableName} WHERE id = ?`;
        connection.query(sql, [beerId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

async function findMatchingBeers(beerName) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM ${tableName} WHERE name LIKE ?`;
        connection.query(sql, [`%${beerName}%`], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

async function updateBeerRating(beer) {
    const { id, rating, ratingCount } = beer;
    return new Promise((resolve, reject) => {
        const sql = `UPDATE ${tableName} SET rating = ?, ratingCount = ? WHERE id = ?`;
        connection.query(sql, [rating, ratingCount, id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

async function fetchAllBeers() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM ${tableName}`;
        connection.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

process.on('exit', () => {
    connection.end((err) => {
        if (err) console.error('Error closing MySQL connection:', err.stack);
        console.log('MySQL connection closed.');
    });
});

module.exports = {
    insertNewBeer,
    findExactBeer,
    findMatchingBeers,
    updateBeerRating,
    fetchAllBeers,
};
