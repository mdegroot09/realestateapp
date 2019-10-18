create table users (
  id serial primary KEY,
  firstname varchar(50),
  lastname varchar(50),
  email varchar (50),
  hash text,
  image text
);