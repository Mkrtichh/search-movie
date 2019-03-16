CREATE TABLE IF NOT EXISTS "search_store"(
    "id" SERIAL primary key,
    "name" text  NULL,
    "count" integer default  0,
    "createdAt" timestamptz,
    "updatedAt" timestamptz
);
