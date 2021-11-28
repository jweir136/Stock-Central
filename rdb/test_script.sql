SELECT * FROM posts;

INSERT INTO posts (fk_user_id, message_content, ticker) VALUES (2, 'test second message', 'PINS');
UPDATE posts SET num_likes = 12 WHERE posts.fk_user_id = 2;
INSERT INTO friends (fk_user_id_1, fk_user_id_2) VALUES (1, 2);
SELECT * FROM friends;

SELECT fk_user_id_2 FROM friends WHERE fk_user_id_1 = 1;

SELECT * FROM friends JOIN posts ON friends.fk_user_id_2 = posts.fk_user_id WHERE fk_user_id_1 = 1 AND posts.created_at > (NOW() - INTERVAL 7 DAY) ORDER BY posts.num_likes DESC LIMIT 10;

SELECT * FROM users;