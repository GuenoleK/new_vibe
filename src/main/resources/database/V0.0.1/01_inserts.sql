insert into structure (id, name, owner_id) values 
(0, 'admin_structure', 3);

insert into article (id, title, description, content, creation_date, edition_date, user_id, structure_id) values
(0, 'wtr10-2b_f', 'wtr10-2b_f description', 'It is the first content here', now(), now(), 3, 0);

insert into role (id, name) values
(0, 'ADMIN'),
(1, 'EDITOR'),
(2, 'VIEWER')

insert into user_role_structure (id, user_id, role_id, structure_id) values
(0, 3, 0, 0);

insert into article_media_type (id, code) values
(0, 'PDF'),
(1, 'AUDIO'),
(2, 'IMAGE');

insert into article_media (id, name, article_id, article_media_type_id, user_id) values
(0, 'wtr10-2b_f', 0, 0, 3);