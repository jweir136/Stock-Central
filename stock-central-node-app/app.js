const express = require('express')
const cors = require('cors');
const Joi = require('joi')
let functions = require('./functions')
let connectToRDB = require('./aws_rdb')
let sqlConnectionPool = require('./generate_sql_connection_pool');
const app = express();
app.use(cors({
    origin: '*'
}));

// "proxyConfig": "proxy.conf.json"

app.use(express.json())

const port = process.env.PORT || 3000;
var rdb = connectToRDB.connectToRDB()
var mysql_pool = sqlConnectionPool.sqlConnectionPool


app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

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

// endpoint to get user information by user ID
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

app.get('/api/users/:username', (req, res, next) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let username = req.params.username;
        if (typeof username == 'undefined' || typeof username !== 'string' || username.includes('@') == true) {
            next()
            return
        }
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
// endpoint to get user by email
app.get('/api/users/:email', (req, res, next) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let email = ''
        email = req.params.email;
        // if () {
        //     next()
        //     return
        // }
        if (typeof email !== 'undefined' || email !== '') {
            rdb.query("SELECT * FROM stock_central.users WHERE email = '" + email + "'", function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                res.status(200).send(result)
            });
        }
        else {
            res.status(400).send('Must specify email in request params')
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
        rdb.query(`INSERT IGNORE INTO stock_central.users (username, first_name, last_name, age, email) VALUES ('${username}', '${firstName}', '${lastName}', ${age}, '${email}')`, function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            res.status(200).send(result)
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

app.post('/api/createPost', (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let messageContent = req.body.messageContent
        let userID = req.body.id

        if (typeof messageContent !== 'string' || typeof userID !== 'number') {
            res.status(400).send('User ID needs to be an int and messageContent needs to be a string')
        }
        rdb.query(`INSERT INTO posts (fk_user_id, message_content) VALUES ('${userID}', '${messageContent}')`, function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            res.status(201).send('post successfully created!')
        });
    });
});


// endpoint to like a post by its post ID
app.patch('/api/likePost/:postId', (req, res) => {
    let postID = req.params.postId
    if (isNaN(postID)) {
        res.status(400).send('post ID must be an int')
    }
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        rdb.query(`UPDATE posts SET num_likes = num_likes + 1 WHERE post_id = ${postID}`, function (error, result) {
            if (error) {
                console.error(error)
                throw error
            }
            res.status(200).send('Number of likes increased successfully!')
        });
    });
});


// endpoint to unlike a post by its post ID
app.patch('/api/unlikePost/:postId', (req, res) => {
    let postID = req.params.postId
    if (isNaN(postID)) {
        res.status(400).send('post ID must be an int')
    }
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        rdb.query(`UPDATE posts SET num_likes = num_likes - 1 WHERE post_id = ${postID}`, function (error, result) {
            if (error) {
                console.error(error)
                throw error
            }
            res.status(200).send('Number of likes decremented successfully!')
        });
    });
});


app.post('/api/createPost', (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let userID = req.body.id
        let messageContent = req.body.messageContent
        let postID = -1


        if (typeof messageContent !== 'string' || typeof userID !== 'number') {
            res.status(400).send('User ID needs to be an int and messageContent needs to be a string')
        }
        rdb.query(`INSERT INTO posts (fk_user_id, message_content) VALUES ('${userID}', '${messageContent}')`, function (error, result) {
            if (error) {
                console.error(error);
                throw error;
            }
            res.status(201).send(result)
        });
        postID = getPostID(userID, messageContent)
        rdb.query(`INSERT INTO likes (fk_user_id, fk_post_id) VALUES (${userID}, ${postID})`, function (error, result) {
            if (error) {
                console.error(error)
                throw error
            }
            res.status(201).send(result)
        })
    });
});


function getPostID(userID, messageContent) {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        rdb.query(`SELECT post_id FROM posts WHERE fk_user_id = ${userID} AND message_content = '${messageContent}'`, function (error, result) {
            if (error) {
                console.error(error)
                throw error
            }
            return result
        })
    })
}

// endpoint to like a post by its post ID
app.patch('/api/likePost/:postId/:userID', (req, res) => {
    let userID = req.params.userID
    let postID = req.params.postId
    if (isNaN(postID) || isNaN(userID)) {
        res.status(400).send('post and user ID must be an int')
    }
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        rdb.query(`UPDATE likes SET num_likes = num_likes + 1 WHERE fk_post_id = ${postID} AND fk_user_id = ${userID}`, function (error, result) {
            if (error) {
                console.error(error)
                throw error
            }
            res.status(200).send(result)
        });
    });
});


// endpoint to unlike a post by its post ID
app.patch('/api/unlikePost/:postId/userId', (req, res) => {
    let userID = req.params.userId
    let postID = req.params.postId
    if (isNaN(postID) && isNaN(userID)) {
        res.status(400).send('post and user ID must be an int')
    }
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        rdb.query(`UPDATE likes SET num_likes = num_likes - 1 WHERE fk_post_id = ${postID} AND fk_user_id = ${userID}`, function (error, result) {
            if (error) {
                console.error(error)
                throw error
            }
            res.status(200).send('Number of likes decremented successfully!')
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
        let userID = -1
        try {
            userID = parseInt(req.params.userId)
        }
        catch (e) {
            res.status(400).send(e)
        }

        // let friendsList = []
        // rdb.query(`SELECT fk_user_id_2 FROM friends WHERE fk_user_id_1 = ${userID};`, function (error1, friendsIDList) {
        //     if (error1) {
        //         console.error(error1)
        //         throw error1
        //     }
        //     friendsIDList.forEach(friend => {
        //         friendsList.push(friend['fk_user_id_2'])
        //     });
        // });
        if (userID != 1) {
            rdb.query(`SELECT * FROM friends JOIN posts ON friends.fk_user_id_2 = posts.fk_user_id JOIN likes ON likes.fk_post_id = posts.post_id WHERE friends.fk_user_id_1 = ${userID} AND posts.created_at > (NOW() - INTERVAL 7 DAY) AND likes.num_likes > 10 LIMIT 10;`,
                function (error2, messages) {
                    if (error2) {
                        console.error(error2)
                        throw error2
                    }
                    messagesInfo = JSON.parse(JSON.stringify(messages))
                    res.status(200).send(messagesInfo)
                });
        }
    });
});


// endpoint to get username from user id (helper for generate feed stuff)
app.get('/api/getUsernames/:id', (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let userID = undefined
        try {
            userID = parseInt(req.params.id)
        }
        catch (e) {
            res.status(400).send(e)
        }
        rdb.query(`SELECT username FROM users WHERE user_id = ${userID}`, function (error3, usernameObj) {
            if (error3) {
                console.error(error3)
                throw error3
            }
            if (usernameObj.length == 0) {
                res.status(404).send(`user with user ID of ${userID} was not found`)
            }
            res.status(200).send(usernameObj)
        });
    });
});





// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
// WATCHLIST ENDPOINTS

// endpoint to get the watchlist items for a user by his ID
app.get('/api/getWatchlistItems/:id', (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let userID = parseInt(req.params.id)
        if (isNaN(userID)) {
            res.status(400).send('USER ID must be an int')
        }
        rdb.query(`SELECT * FROM watchlist WHERE fk_user_id = ${userID}`, function (error, result) {
            if (error) {
                console.error(error)
                throw error
            }
            res.status(200).send(result)
        })
    })
})


app.post('/api/addToWatchlist', (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let userID = req.body.id
        let ticker = req.body.ticker
        if (userID === 'undefined' && ticker === 'undefined') {
            res.status(400).send('a user id and ticker symbol need to be specified')
        }
        rdb.query(`INSERT INTO watchlist (fk_user_id, ticker) VALUES (${userID}, '${ticker}')`, function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            res.status(201).send(result)
        })
    })
})

app.delete('/api/removeFromWatchlist', (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let userID = req.body.id
        let ticker = req.body.ticker
        if (userID === 'undefined' && ticker === 'undefined') {
            res.status(400).send('a user id and ticker symbol need to be specified')
        }
        rdb.query(`DELETE FROM watchlist WHERE fk_user_id = ${userID} AND ticker = '${ticker}';)`, function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            res.status(200).send(result)
        })
    })
})



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
// FRIENDS table endpoints

app.post('/api/addFriend', (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let userID_1 = -1
        let userID_2 = -1
        try {
            userID_1 = parseInt(req.body.id)
            userID_2 = parseInt(req.body.id2)
        }
        catch (e) {
            console.error(e)
            res.status(400).send(e)
         }
        
        rdb.query(`INSERT IGNORE INTO friends (fk_user_id_1, fk_user_id_2) VALUES (${userID_1}, ${userID_2})`, function (error, result) {
            if (error) {
                console.error(error)
                throw error
            } 
            res.status(201).send(result)
        })
    })
})


app.delete('/api/deleteFriend', (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            console.log('Error getting connection from pool: ' + err)
            throw err
        }
        let userID_1 = -1
        let userID_2 = -1
        try {
            userID_1 = parseInt(req.body.id)
            userID_2 = parseInt(req.body.id2)
        }
        catch (e) {
            console.error(e)
            res.status(400).send(e)
        }
        rdb.query(`DELETE FROM friends WHERE fk_user_id_1 = ${userID_1} AND fk_user_id_2 = ${userID_2}`, function (error, result) {
            if (error) {
                console.error(error)
                throw error
            }
            res.status(200).send(result)
        })
    })
})



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------




app.listen(port, () => {
    console.log(`Express server listening on ${port}...`);
});







