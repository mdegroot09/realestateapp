select 
  posts.datetime as postdatetime, 
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
where posts.id = ${id}
order by elementid asc;