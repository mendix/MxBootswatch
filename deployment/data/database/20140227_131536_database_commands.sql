CREATE TABLE "bootswatch$entity" (
	"id" BIGINT NOT NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", 
"entity_name", 
"table_name")
 VALUES ('235cb9fa-31c6-4be1-8bbd-b799d65001c6', 
'Bootswatch.Entity', 
'bootswatch$entity');
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.0.7', 
"lastsyncdate" = '20140227 13:15:08';
