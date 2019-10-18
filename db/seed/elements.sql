create table elements (
  id serial primary KEY,
  type varchar(20),
  text varchar(10000),
  url varchar (10000),
  url2 varchar(10000),
  quote varchar(10000),
  person varchar(250),
  post_id int,
  FOREIGN KEY (post_id) REFERENCES posts(id)
);