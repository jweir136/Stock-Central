const http = require('http');
const Joi = require('joi')
const express = require('express')
let functions = require('./functions')
let connectToRDB = require('./aws_rdb')
let sqlConnectionPool = require('./generate_sql_connection_pool');
let alpacaSecrets = require('./secrets')
let marketData = require('./market_data.js')
const app = express();
app.use(express.json())

const port = process.env.PORT || 3000;
var rdb = connectToRDB.connectToRDB()
var mysql_pool = sqlConnectionPool.sqlConnectionPool


// base route
app.get('/', (req, res) => {
    res.send('zora')
})


// endpoint to get price information for specified ticker
app.get('/api/getQuote/:ticker', async (req, res) => {
    const ticker = req.params.ticker
    let test = await functions.tickerIsValid(ticker)
    console.log(test)
    res.send(test)
    // if (functions.tickerIsValid(ticker).length > 0) {
    //     marketData.getQuote(ticker)
    // }
    // else {
    //     res.status(400).send('Enter a valid stock ticker')
    // }
});

// endpoint to get company news for specified stock ticker
app.get('/api/getCompanyNews/:ticker', (req, res) => {
    const ticker = req.params.ticker
    if (tickerIsValid(ticker)) {
        marketData.getCompanyNews(ticker)
    }
    else {
        res.status(400).send('Enter a valid stock ticker')
    }
});

// gets all users
app.get('/api/users', (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        rdb.query('SELECT * FROM stock_central.users', function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            res.send(result)
        });
    });
});

// endpoint to get user by ID
app.get('/api/users/:id', (req, res, next) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let userID = undefined
        userID = parseInt(req.params.id);
        if (isNaN(userID)) {
            next()
            return
        }
        
        if (typeof userID !== 'undefined') {
            rdb.query("SELECT * FROM stock_central.users WHERE user_id = '" + userID + "'", function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                res.send(result)
            });
        }
        else {
            res.status(400).send('Must specify user ID in request params')
        }
    });
});

// endpoint to get user by username
app.get('/api/users/:username', (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let username = req.params.username;
        if (typeof username !== 'undefined') {
            rdb.query("SELECT * FROM stock_central.users WHERE username = '" + username + "'", function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                res.send(result)
            });
        }
        else {
            res.status(400).send('Must specify username in request params')
        }
    });
});

// endpoint to get user by name
// app.post('/api/users/:name', (req, res) => {
//     mysql_pool.getConnection(function (err, connection) {
//         if (err) {
//             connection.release()
//             console.log('Error getting connection from pool: ' + err)
//             throw err
//         }
//         let name = req.params.name;
//         let firstName = undefined
//         let lastName = undefined
//         if (typeof name !== 'undefined') {
//             let splitName = name.split(' ')
//             firstName = splitName[0]
//             lastName = splitName[1]
//         }
//         else {
//             res.status(400).send('Must provide first + last name separated by a single space in request params')
//         }
//         rdb.query("SELECT * FROM stock_central.users WHERE first_name = '" + firstName + "' AND last_name = '" + lastName + "'", function (error, result) {
//             if (error) {
//                 console.log(error);
//                 throw error;
//             }
//             res.send(result)
//         });
//     });
// });

// endpoint to create new user

// creates user
app.post('/api/users', (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let username = req.body.username
        let firstName = req.body.firstName
        let lastName = req.body.lastName
        let age = req.body.age
        let email = req.body.email
        rdb.query(`INSERT INTO stock_central.users (username, first_name, last_name, age, email) VALUES ('${username}', '${firstName}', '${lastName}', '${age}', '${email}')`,
            function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                res.status(200).send('zgm')
            });
    });
});


// -------------------------------------------------------------------------------------------------------------------------------------------------



app.listen(port, () => {
    console.log(`Express server listening on ${port}...`);
});






