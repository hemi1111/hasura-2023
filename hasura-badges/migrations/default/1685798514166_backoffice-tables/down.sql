DROP FUNCTION IF EXISTS "update_requirements"(JSON, JSONB, INTEGER);
DROP FUNCTION IF EXISTS "get_unassigned_engineers";
DROP FUNCTION IF EXISTS "get_managers_without_relation"(INTEGER);
DROP VIEW IF EXISTS "engineering_teams";
DROP VIEW IF EXISTS "engineers_with_managers";

DROP VIEW IF EXISTS "valid_user_relations";
DROP VIEW IF EXISTS "engineering_teams";
DROP VIEW IF EXISTS "managers";
DROP VIEW IF EXISTS "engineers";
DROP VIEW IF EXISTS "valid_users";

DROP TABLE IF EXISTS "requirements_definitions";
DROP TABLE IF EXISTS "badges_definitions";
DROP TABLE IF EXISTS public.users_relations;
DROP TABLE IF EXISTS "users";

