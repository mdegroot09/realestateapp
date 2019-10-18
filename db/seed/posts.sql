create table posts (
  id serial primary KEY,
  title varchar(50),
  draft BOOLEAN default true,
  datetime varchar(20),
  imagemain varchar(10000),
  text varchar(10000)
);