ALTER TABLE "system$image"
	ADD "submetaobjectname" VARCHAR_IGNORECASE(255) NULL;
UPDATE "system$image"
 SET "submetaobjectname" = 'System.Image';
CREATE INDEX "idx_system$image_submetaobjectname" ON "system$image"
	("submetaobjectname","id");
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('272f49fe-6a64-3ede-a32d-344a34e57b9f', 
'37827192-315d-4ab6-85b8-f626f866ea76', 
'submetaobjectname', 
'submetaobjectname', 
30, 
255, 
'System.Image', 
false);
INSERT INTO "mendixsystem$index" ("id", 
"table_id", 
"index_name")
 VALUES ('00a9ec1c-4fab-368f-83d4-ffa8ff501c8c', 
'37827192-315d-4ab6-85b8-f626f866ea76', 
'idx_system$image_submetaobjectname');
INSERT INTO "mendixsystem$index_column" ("index_id", 
"column_id", 
"sort_order", 
"ordinal")
 VALUES ('00a9ec1c-4fab-368f-83d4-ffa8ff501c8c', 
'272f49fe-6a64-3ede-a32d-344a34e57b9f', 
false, 
0);
CREATE TABLE "bootswatch$theme" (
	"id" BIGINT NOT NULL,
	"themename" VARCHAR_IGNORECASE(200) NULL,
	"previewurl" VARCHAR_IGNORECASE(200) NULL,
	"tagline" VARCHAR_IGNORECASE(200) NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", 
"entity_name", 
"table_name", 
"superentity_id")
 VALUES ('f7d0955d-57ab-42f6-b0ac-71f5cede00b9', 
'Bootswatch.Theme', 
'bootswatch$theme', 
'37827192-315d-4ab6-85b8-f626f866ea76');
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('42accae7-5370-48a0-9daa-57dac0fe4e07', 
'f7d0955d-57ab-42f6-b0ac-71f5cede00b9', 
'ThemeName', 
'themename', 
30, 
200, 
'', 
false);
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('c3bd0f87-accf-45a2-9da5-ccb9a418131b', 
'f7d0955d-57ab-42f6-b0ac-71f5cede00b9', 
'PreviewUrl', 
'previewurl', 
30, 
200, 
'', 
false);
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('efe819e3-fda7-4e30-b5e6-93c21008ec45', 
'f7d0955d-57ab-42f6-b0ac-71f5cede00b9', 
'TagLine', 
'tagline', 
30, 
200, 
'', 
false);
CREATE TABLE "bootswatch$themepackage" (
	"id" BIGINT NOT NULL,
	"minified" BOOLEAN NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", 
"entity_name", 
"table_name", 
"superentity_id")
 VALUES ('24621500-4833-4ac2-9e3e-1ff4a5cfb282', 
'Bootswatch.ThemePackage', 
'bootswatch$themepackage', 
'170ce49d-f29c-4fac-99a6-b55e8a3aeb39');
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('03d757a6-db45-4919-9c48-2a35a65d0e7e', 
'24621500-4833-4ac2-9e3e-1ff4a5cfb282', 
'Minified', 
'minified', 
10, 
200, 
'false', 
false);
CREATE TABLE "bootswatch$themepackage_theme" (
	"bootswatch$themepackageid" BIGINT NOT NULL,
	"bootswatch$themeid" BIGINT NOT NULL,
	PRIMARY KEY("bootswatch$themepackageid","bootswatch$themeid"));
CREATE INDEX "idx_bootswatch$themepackage_theme_bootswatch$theme_bootswatch$themepackage" ON "bootswatch$themepackage_theme"
	("bootswatch$themeid","bootswatch$themepackageid");
INSERT INTO "mendixsystem$association" ("id", 
"association_name", 
"table_name", 
"parent_entity_id", 
"child_entity_id", 
"parent_column_name", 
"child_column_name", 
"index_name")
 VALUES ('bef1d001-c5f7-4990-a9d1-c41779685143', 
'Bootswatch.ThemePackage_Theme', 
'bootswatch$themepackage_theme', 
'24621500-4833-4ac2-9e3e-1ff4a5cfb282', 
'f7d0955d-57ab-42f6-b0ac-71f5cede00b9', 
'bootswatch$themepackageid', 
'bootswatch$themeid', 
'idx_bootswatch$themepackage_theme_bootswatch$theme_bootswatch$themepackage');
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.0.7', 
"lastsyncdate" = '20140204 09:22:49';
