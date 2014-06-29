CREATE TABLE "bootswatch$trainee" (
	"id" BIGINT NOT NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", 
"entity_name", 
"table_name")
 VALUES ('23d07368-37a9-4f19-8169-392486c40d8b', 
'Bootswatch.Trainee', 
'bootswatch$trainee');
CREATE TABLE "bootswatch$schduledcourse" (
	"id" BIGINT NOT NULL,
	"numberofregistrations" INT NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", 
"entity_name", 
"table_name")
 VALUES ('f6eedd6c-26e9-4f6f-b449-b1dbc6fa2ff6', 
'Bootswatch.SchduledCourse', 
'bootswatch$schduledcourse');
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('cef18cbd-5f2e-4166-8b98-e8927c1dcf85', 
'f6eedd6c-26e9-4f6f-b449-b1dbc6fa2ff6', 
'NumberOfRegistrations', 
'numberofregistrations', 
3, 
200, 
'0', 
false);
CREATE TABLE "bootswatch$registration" (
	"id" BIGINT NOT NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", 
"entity_name", 
"table_name")
 VALUES ('141dc2a2-e9b1-4bf8-91f6-98421ecd30ba', 
'Bootswatch.Registration', 
'bootswatch$registration');
CREATE TABLE "bootswatch$registration_trainee" (
	"bootswatch$registrationid" BIGINT NOT NULL,
	"bootswatch$traineeid" BIGINT NOT NULL,
	PRIMARY KEY("bootswatch$registrationid","bootswatch$traineeid"));
CREATE INDEX "idx_bootswatch$registration_trainee_bootswatch$trainee_bootswatch$registration" ON "bootswatch$registration_trainee"
	("bootswatch$traineeid","bootswatch$registrationid");
INSERT INTO "mendixsystem$association" ("id", 
"association_name", 
"table_name", 
"parent_entity_id", 
"child_entity_id", 
"parent_column_name", 
"child_column_name", 
"index_name")
 VALUES ('0d6d4b98-bfe8-4775-ad8c-32ec7902e1cb', 
'Bootswatch.Registration_Trainee', 
'bootswatch$registration_trainee', 
'141dc2a2-e9b1-4bf8-91f6-98421ecd30ba', 
'23d07368-37a9-4f19-8169-392486c40d8b', 
'bootswatch$registrationid', 
'bootswatch$traineeid', 
'idx_bootswatch$registration_trainee_bootswatch$trainee_bootswatch$registration');
CREATE TABLE "bootswatch$registration_schduledcourse" (
	"bootswatch$registrationid" BIGINT NOT NULL,
	"bootswatch$schduledcourseid" BIGINT NOT NULL,
	PRIMARY KEY("bootswatch$registrationid","bootswatch$schduledcourseid"));
CREATE INDEX "idx_bootswatch$registration_schduledcourse_bootswatch$schduledcourse_bootswatch$registration" ON "bootswatch$registration_schduledcourse"
	("bootswatch$schduledcourseid","bootswatch$registrationid");
INSERT INTO "mendixsystem$association" ("id", 
"association_name", 
"table_name", 
"parent_entity_id", 
"child_entity_id", 
"parent_column_name", 
"child_column_name", 
"index_name")
 VALUES ('d1fbb881-0d95-47f8-ab64-3f13c0ead2e8', 
'Bootswatch.Registration_SchduledCourse', 
'bootswatch$registration_schduledcourse', 
'141dc2a2-e9b1-4bf8-91f6-98421ecd30ba', 
'f6eedd6c-26e9-4f6f-b449-b1dbc6fa2ff6', 
'bootswatch$registrationid', 
'bootswatch$schduledcourseid', 
'idx_bootswatch$registration_schduledcourse_bootswatch$schduledcourse_bootswatch$registration');
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.0.7', 
"lastsyncdate" = '20140219 11:47:26';
