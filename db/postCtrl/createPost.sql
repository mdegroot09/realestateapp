insert into posts (
  title,
  draft,
  datetime,
  imagemain,
  text
) values (
  ${postTitle},
  ${draft},
  ${date},
  ${imageMain},
  ${text}
)

returning *;