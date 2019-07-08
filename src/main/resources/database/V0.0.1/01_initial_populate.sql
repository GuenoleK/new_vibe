-- UNIQUE INDEXES
------- STRUCTURE
CREATE UNIQUE INDEX UK_STRUCTURE_NAME ON STRUCTURE (name);
------- STRUCTURE
CREATE UNIQUE INDEX UK_ARTICLE_TITLE ON ARTICLE (title);
-- ARTICLE
CREATE UNIQUE INDEX UK_ARTICLE_TITLE_STRUCTURE_ID ON ARTICLE (title, structure_id);
-- ARTICLE MEDIA
CREATE UNIQUE INDEX UK_ARTICLE_ID_ARTICLE_MEDIA_NAME ON ARTICLE_MEDIA (article_id, name);


insert into structure (id, name, owner_id) values 
(0, 'Praise and Worship Team', 3),
(1, 'Chorale', 3),
(2, 'CCR', 3);

insert into structure_user (user_id, structure_id) values
(3, 0),
(3, 1),
(3, 2);

insert into role (id, name) values
(0, 'ADMIN'),
(1, 'EDITOR'),
(2, 'VIEWER'),
(3, 'MANAGER');

select * from user_role_structure

-- DROP UNIQUE INDEXES AND UNIQUE CONSTRAINTS
alter table user_role_structure drop constraint ux_user_role_structure_user_id;
alter table user_role_structure drop constraint ux_user_role_structure_role_id;
alter table user_role_structure drop constraint ux_user_role_structure_structure_id;

-- TODO: AJOUTER UNE CLÉ UNIQUE SUR LE TRIPLET USERID/ROLEID/STRUCTUREID
-- UN UTILISATEUR A UN ROLE PAR STRUCTURR

insert into user_role_structure (id, user_id, role_id, structure_id) values
(0, 3, 0, 0),
(1, 3, 0, 1),
(2, 3, 0, 2);

insert into article_media_type (id, code) values
(0, 'PDF'),
(1, 'AUDIO'),
(2, 'IMAGE');

insert into extended_user (id, user_id, current_structure_id) values
(3, 3, 0);
