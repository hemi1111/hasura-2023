CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "roles" JSONB NOT NULL DEFAULT '{}',
  "is_deleted" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "modified_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE VIEW "valid_users" AS
SELECT *
FROM users
WHERE is_deleted = false;


CREATE VIEW "engineers" AS
SELECT id, name, is_deleted
FROM users
WHERE roles @> '["engineer"]'::jsonb
AND is_deleted = false;

CREATE VIEW "managers" AS
SELECT id, name, is_deleted
FROM users
WHERE roles @> '["manager"]'::jsonb
AND is_deleted = false;


CREATE TABLE public.users_relations (
  manager integer NOT NULL REFERENCES public.users(id),
  engineer integer NOT NULL REFERENCES public.users(id),
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "created_by" INTEGER REFERENCES "users"("id") ON DELETE RESTRICT,
  -- "modified_at" TIMESTAMP NOT NULL DEFAULT now(),
  -- "modified_by" INTEGER REFERENCES "users"("id") ON DELETE RESTRICT,
  PRIMARY KEY (manager, engineer)
);

CREATE VIEW "valid_user_relations" AS
SELECT manager, engineer
FROM public.users_relations ur
JOIN public.users u ON ur.created_by = u.id
WHERE u.is_deleted = false;

CREATE VIEW "engineering_teams" AS
SELECT 
    u.id AS manager_id, 
    u.name AS manager_name,
    json_agg(json_build_object('id', ur.engineer, 'name', e.name, 'created_at', ur.created_at)) AS items
FROM "users" u
JOIN "users_relations" ur ON u.id = ur.manager
JOIN "users" e ON ur.engineer = e.id
WHERE u.roles @> '["manager"]'::jsonb
GROUP BY u.id, u.name;

CREATE TABLE "badges_definitions" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "created_by" INTEGER REFERENCES "users"("id") ON DELETE RESTRICT,
  "modified_at" TIMESTAMP NOT NULL DEFAULT now(),
  "modified_by" INTEGER REFERENCES "users"("id") ON DELETE RESTRICT
);

CREATE TABLE "requirements_definitions" (
  "id" SERIAL PRIMARY KEY,
  "badge_id" INTEGER REFERENCES "badges_definitions"("id") ON DELETE RESTRICT,
  "title" JSONB,
  "description" JSONB,
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "created_by" INTEGER REFERENCES "users"("id") ON DELETE RESTRICT,
  "modified_at" TIMESTAMP NOT NULL DEFAULT now(),
  "modified_by" INTEGER REFERENCES "users"("id") ON DELETE RESTRICT
);

CREATE VIEW "engineers_with_managers" AS
SELECT 
    e.id AS id,
    e.name AS name,
    CASE 
        WHEN COUNT(m.id) = 0 THEN '[]'::json
        ELSE json_agg(json_build_object('id', m.id, 'name', m.name))
    END AS managers
FROM "users" e
LEFT JOIN "valid_user_relations" ur ON e.id = ur.engineer
LEFT JOIN "users" m ON ur.manager = m.id
WHERE e.roles @> '["engineer"]'::jsonb
AND e.is_deleted = false
GROUP BY e.id, e.name;