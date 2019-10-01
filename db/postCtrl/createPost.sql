insert into posts (
  title,
  family,
  makeup,
  food, 
  datetime,
  imagemain,
  text
) values (
  ${postTitle},
  ${family},
  ${makeup},
  ${food},
  ${date},
  ${imageMain},
  ${text}
)

returning *;