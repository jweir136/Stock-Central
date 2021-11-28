const express = require('express')
const Joi = require('joi')
let functions = require('./functions')
let connectToRDB = require('./aws_rdb')
let sqlConnectionPool = require('./generate_sql_connection_pool');
const app = express();

app.use(express.json())

const port = process.env.PORT || 3000;
var rdb = connectToRDB.connectToRDB()
var mysql_pool = sqlConnectionPool.sqlConnectionPool


// base route
app.get('/', (req, res) => {
    res.send('chimp')
})


// endpoint to get price information for specified ticker
app.get('/api/quote/:ticker', async (req, res) => {
    const ticker = req.params.ticker
    let priceData = await functions.getPriceData(ticker)
    try {
        if (priceData == 'undefined' || priceData == null) {
            res.status(400).send('Enter a valid stock ticker')
        }
        else {
            res.status(200).send(priceData)
        }
    }
    catch (e) {
        console.error(e)
        res.status(400).send('Enter a valid stock ticker')
    }
});

// endpoint to get company news for specified stock ticker
app.get('/api/companyNews/:ticker', async (req, res) => {
    const ticker = req.params.ticker
    let newsData = await functions.getNewsData(ticker)
    try {
        if (newsData == 'undefined' || newsData == null) {
            res.status(400).send('Enter a valid stock ticker')
        }
        else {
            res.status(200).send(newsData)
        }
    }
    catch (e) {
        console.error(e)
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
        if (typeof username !== 'undefined' && typeof username == 'string') {
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


// endpoint to create new user
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
        if (typeof username !== 'string' || typeof firstName !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof age !== 'number') {
            res.status(400).send('username, first/last name, and email must be strings. Age must be an int')
        }
        rdb.query(`INSERT INTO stock_central.users (username, first_name, last_name, age, email) VALUES ('${username}', '${firstName}', '${lastName}', '${age}', '${email}')`, function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            res.status(200).send('zgm')
        });
    });
});


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
// endpoint to get all posts 
app.get('/api/posts', (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        rdb.query(`SELECT * FROM posts`, function (error, result) {
            if (error) {
                console.error(error)
                throw error
            }
            res.status(200).send(result)
        });
    })
});
// endpoint to get post by ID
app.get('/api/post/:id', (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let postID = undefined
        try {
            postID = parseInt(req.params.id)
        }
        catch (e) {
            res.status(400).send(e)
        }
        
        rdb.query(`SELECT * FROM posts WHERE post_id = ${postID}`, function (error, result) {
            if (error) {
                console.error(error)
                throw error
            }
            res.status(200).send(result)
        });
    });
});


// endpoint to generate feed for logged in user
app.get('/api/posts/generateFeed/:userId', (req, res) => {
    let messagesInfo = {}
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let userID = undefined
        try {
            userID = parseInt(req.params.userId)
        }
        catch (e) {
            res.status(400).send(e)
        }

        let friendsList = []
        rdb.query(`SELECT fk_user_id_2 FROM friends WHERE fk_user_id_1 = ${userID};`, function (error1, friendsIDList) {
            if (error1) {
                console.error(error1)
                throw error1
            }
            friendsIDList.forEach(friend => {
                friendsList.push(friend['fk_user_id_2'])
            });
        });

        rdb.query(`SELECT * FROM friends JOIN posts ON friends.fk_user_id_2 = posts.fk_user_id WHERE fk_user_id_1 = ${userID} AND posts.created_at > (NOW() - INTERVAL 7 DAY) ORDER BY posts.num_likes DESC LIMIT 10;`,
           function (error2, messages) {
                if (error2) {
                    console.error(error2)
                    throw error2
                }
                messagesInfo = JSON.parse(JSON.stringify(messages))
                for (let i = 0; i < messagesInfo.length; i++) {
                    rdb.query(`SELECT username FROM users WHERE user_id = ${messagesInfo[i].fk_user_id_1}`, function (error3, usernameObj) {
                        if (error3) {
                            console.error(error3)
                            throw error3
                        }
                        console.log(usernameObj[0].username)
                        messagesInfo[i].username = usernameObj[0].username
                        // console.log(messagesInfo)
                    })
               }
               res.status(200).send(messagesInfo)
            });
    });
})





// ------------------------------------------------------------------------------------------------------------------------------------------------------------------


app.listen(port, () => {
    console.log(`Express server listening on ${port}...`);
});






