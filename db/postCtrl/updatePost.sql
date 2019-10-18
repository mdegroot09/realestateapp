update posts
set draft = ${draft},
  title = ${postTitle}, 
  imagemain = ${imageMain},
  text = ${text}
where id = ${id};