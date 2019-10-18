create table comments (
  id serial primary KEY,
  user_id int,
  text varchar(10000),
  datetime varchar(20),
  post_id int,
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);