-- select 
--   posts.datetime as postdatetime, 
--   comments.datetime as commentdatetime, 
--   posts.id as postid, 
--   comments.id as commentid, 
--   comments.text as commenttext, 
--   posts.text as posttext, 
--   posts.imagemain, 
--   posts.title, 
--   posts.draft,
--   users.firstname,
--   users.lastname
-- from posts
-- left join comments on comments.post_id = posts.id
-- left join users on comments.user_id = users.id
-- order by posts.datetime desc, comments.datetime asc;

select 
  posts.datetime as postdatetime, 
  posts.id as postid, 
  posts.text as posttext, 
  posts.imagemain, 
  posts.title, 
  posts.draft,
  elements.id as elementid,
  elements.type as elementtype,
  elements.text as elementtext,
  elements.url as elementurl,
  elements.url2 as elementurl2,
  elements.quote as elementquote,
  elements.person as elementperson
from posts
left join elements on elements.post_id = posts.ID
order by posts.datetime desc, elementid asc;