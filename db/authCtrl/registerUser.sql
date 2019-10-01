insert into users (
  email,
  firstname,
  lastname, 
  hash,
  image
) values (
  ${email},
  ${firstName},
  ${lastName},
  ${hash},
  ${image}
)

returning *;