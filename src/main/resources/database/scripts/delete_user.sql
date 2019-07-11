select * from jhi_user;

delete from jhi_user_authority where user_id = x;
delete from user_role_structure where user_id = x;
delete from extended_user where user_id = x;
delete from jhi_user where id = x;