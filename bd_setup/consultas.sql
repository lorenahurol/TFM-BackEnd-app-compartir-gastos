
use expenses_sharing;

-- BUSQUEDA DE USUARIOS -------------------------------------------------------------------
-- Buscar usuario por id
SELECT * FROM expenses_sharing.users WHERE id = 23;
-- Buscar usuario por username
SELECT * FROM expenses_sharing.users WHERE username = 'rdoylym';
-- Buscar usuario por email
SELECT * FROM expenses_sharing.users WHERE mail = 'rdoylym@fema.gov';
-- ----------------------------------------------------------------------------------------

-- BUSQUEDA DE CATEGORIAS DE GRUPO --------------------------------------------------------
-- Buscar todas las categorias
SELECT * FROM expenses_sharing.group_categories;
-- Buscar la categoria por id
SELECT * FROM expenses_sharing.group_categories WHERE id = 5;
-- Buscar la categoria por descripcion
SELECT * FROM expenses_sharing.group_categories WHERE description = 'Viaje';
-- ----------------------------------------------------------------------------------------

-- BUSQUEDA DE GRUPOS  --------------------------------------------------------------------
-- Buscar todos los grupos
SELECT * FROM expenses_sharing.groups_app;
-- Buscar grupo por id
SELECT * FROM expenses_sharing.groups_app WHERE ID = 7;
-- Buscar todos los grupos de la categoria X
SELECT * FROM expenses_sharing.groups_app WHERE category_id = 1;
-- Buscar todos los grupos de un usuario_admin (o creador)
SELECT * FROM expenses_sharing.groups_app WHERE creator_user_id = 1;
-- Buscar todos los grupos de un usuario_admin (o creador) y activos
SELECT * FROM expenses_sharing.groups_app WHERE creator_user_id = 1 AND active = 1;
-- Buscar todos los grupos de un usuario_admin (o creador) y NO activos
SELECT * FROM expenses_sharing.groups_app WHERE creator_user_id = 1 AND active = 0;

-- Buscar todos los miembros de un grupo
SELECT user_id, users.username, users.mail, creator_user_id FROM expenses_sharing.group_members 
INNER JOIN users on user_id = users.id
INNER JOIN groups_app on group_id = groups_app.id
WHERE group_id = 11;

-- Buscar todos los grupos donde esta un usuario
SELECT  group_id, groups_app.description, group_categories.description as category   FROM expenses_sharing.group_members 
INNER JOIN groups_app on group_id = groups_app.id
INNER JOIN group_categories on category_id = group_categories.id
WHERE user_id = 1;
-- ----------------------------------------------------------------------------------------

-- BUSQUEDA DE GASTOS  --------------------------------------------------------------------
-- Buscar todos los gastos de un grupo ordenados por fecha
SELECT  *   FROM expenses_sharing.expenses
WHERE group_id = 11
ORDER BY date asc;
-- Buscar todos los gastos de un grupo ordenados por fecha y que esten activos
SELECT  *   FROM expenses_sharing.expenses
WHERE group_id = 11 and active = 1
ORDER BY date asc;
-- Buscar todos los gastos de un grupo ordenados por fecha y que esten NO activos
SELECT  *   FROM expenses_sharing.expenses
WHERE group_id = 11 and active = 0
ORDER BY date asc;
-- Buscar todos los gastos de un usuario en un grupo ordenados por fecha y que esten activos
SELECT  *   FROM expenses_sharing.expenses
WHERE group_id = 11 and active = 1 and payer_user_id = 2
ORDER BY date asc;
-- Buscar todos los gastos de un usuario en un grupo ordenados por fecha y que esten NO activos
SELECT  *   FROM expenses_sharing.expenses
WHERE group_id = 11 and active = 0 and payer_user_id = 2
ORDER BY date asc;
-- ------------------------------------------------------------------------------------------

-- BUSQUEDA DE INVITACIONES -----------------------------------------------------------------
-- Buscar todas las invitaciones
SELECT * FROM expenses_sharing.invitations;
-- Buscar invitacion por id
SELECT * FROM expenses_sharing.invitations
WHERE  id = 13;
-- Buscar todas las invitaciones de un grupo
SELECT * FROM expenses_sharing.invitations
WHERE  group_id = 1;
-- Buscar todas las invitaciones de un grupo que esten activas
SELECT * FROM expenses_sharing.invitations
WHERE  group_id = 1 and active = 1;
-- Buscar todas las invitaciones de un grupo que esten activas y sin aceptar
SELECT * FROM expenses_sharing.invitations
WHERE  group_id = 1 and active = 1 and accepted = 0;
-- Buscar todas las invitaciones de un usuario
SELECT * FROM expenses_sharing.invitations
WHERE  user_id = 1;
-- Buscar todas las invitaciones de un usuario que esten activas y sin aceptar
SELECT * FROM expenses_sharing.invitations
WHERE  user_id = 13 and active = 1 and accepted = 0;
-- Buscar todas las invitaciones de un usuario que esten  aceptadas
SELECT * FROM expenses_sharing.invitations
WHERE  user_id = 13 and accepted = 1;
-- ------------------------------------------------------------------------------------------