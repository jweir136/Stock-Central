const http = require('http');

const express = require('express')
const app = express();

const hostname = '127.0.0.1';

const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'stock-central.cpbbumloza64.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'stockcentral',
    port: '3306',
    database: 'stock_central'
});
connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected!');
});

app.get('/', (req, res) => {
    res.send('zora')
})


