insert into comments (
  user_id,
  text,
  datetime,
  post_id
) values (
  ${user_id},
  ${text},
  ${date},
  ${post_id}
)

returning *;