ALTER TABLE "bootswatch$themepackage"
	ADD "defaulttheme" BOOLEAN NULL;
UPDATE "bootswatch$themepackage"
 SET "defaulttheme" = false;
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('00b7773b-49fc-4e25-9855-c8f8c20c8dde', 
'24621500-4833-4ac2-9e3e-1ff4a5cfb282', 
'Defaulttheme', 
'defaulttheme', 
10, 
200, 
'false', 
false);
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.0.7', 
"lastsyncdate" = '20140204 11:40:45';
