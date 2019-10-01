update users 
set email = ${email},
firstname = ${firstName},
lastname = ${lastName},
hash = ${hash},
image = ${image}
where id = ${id}

returning *;