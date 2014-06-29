ALTER TABLE "bootswatch$dropdownacti" RENAME TO "fd34585ee69a40f5a6787833b41d31b3";
ALTER TABLE "bootswatch$entity" RENAME TO "f5a67f4a20564dc188dbd96d97b0911c";
ALTER TABLE "bootswatch$registration" RENAME TO "515c1b0d8d14486ea9acaca505017096";
DROP INDEX "idx_bootswatch$registration_trainee_bootswatch$trainee_bootswatch$registration";
ALTER TABLE "bootswatch$registration_trainee" RENAME TO "caddb8e2462241e9902ca54f4c1421d0";
DROP INDEX "idx_bootswatch$registration_schduledcourse_bootswatch$schduledcourse_bootswatch$registration";
ALTER TABLE "bootswatch$registration_schduledcourse" RENAME TO "06a08bedd1054556ae4b2ab24d3f24da";
ALTER TABLE "bootswatch$schduledcourse" RENAME TO "be05537397b1462ba6c5acb7ccabe3c7";
ALTER TABLE "bootswatch$trainee" RENAME TO "7a2d74aaa3fa43369b5aa515c984ba71";
DELETE FROM "mendixsystem$entity" 
 WHERE "id" = '7f2d4795-ab88-42af-8bdd-8d93c6a41230';
DELETE FROM "mendixsystem$sequence" 
 WHERE "attribute_id" IN (SELECT "id"
 FROM "mendixsystem$attribute"
 WHERE "entity_id" = '7f2d4795-ab88-42af-8bdd-8d93c6a41230');
DELETE FROM "mendixsystem$attribute" 
 WHERE "entity_id" = '7f2d4795-ab88-42af-8bdd-8d93c6a41230';
DELETE FROM "mendixsystem$entity" 
 WHERE "id" = '235cb9fa-31c6-4be1-8bbd-b799d65001c6';
DELETE FROM "mendixsystem$sequence" 
 WHERE "attribute_id" IN (SELECT "id"
 FROM "mendixsystem$attribute"
 WHERE "entity_id" = '235cb9fa-31c6-4be1-8bbd-b799d65001c6');
DELETE FROM "mendixsystem$attribute" 
 WHERE "entity_id" = '235cb9fa-31c6-4be1-8bbd-b799d65001c6';
DELETE FROM "mendixsystem$entity" 
 WHERE "id" = '141dc2a2-e9b1-4bf8-91f6-98421ecd30ba';
DELETE FROM "mendixsystem$sequence" 
 WHERE "attribute_id" IN (SELECT "id"
 FROM "mendixsystem$attribute"
 WHERE "entity_id" = '141dc2a2-e9b1-4bf8-91f6-98421ecd30ba');
DELETE FROM "mendixsystem$attribute" 
 WHERE "entity_id" = '141dc2a2-e9b1-4bf8-91f6-98421ecd30ba';
DELETE FROM "mendixsystem$association" 
 WHERE "id" = '0d6d4b98-bfe8-4775-ad8c-32ec7902e1cb';
DELETE FROM "mendixsystem$association" 
 WHERE "id" = 'd1fbb881-0d95-47f8-ab64-3f13c0ead2e8';
DELETE FROM "mendixsystem$entity" 
 WHERE "id" = 'f6eedd6c-26e9-4f6f-b449-b1dbc6fa2ff6';
DELETE FROM "mendixsystem$sequence" 
 WHERE "attribute_id" IN (SELECT "id"
 FROM "mendixsystem$attribute"
 WHERE "entity_id" = 'f6eedd6c-26e9-4f6f-b449-b1dbc6fa2ff6');
DELETE FROM "mendixsystem$attribute" 
 WHERE "entity_id" = 'f6eedd6c-26e9-4f6f-b449-b1dbc6fa2ff6';
DELETE FROM "mendixsystem$entity" 
 WHERE "id" = '23d07368-37a9-4f19-8169-392486c40d8b';
DELETE FROM "mendixsystem$sequence" 
 WHERE "attribute_id" IN (SELECT "id"
 FROM "mendixsystem$attribute"
 WHERE "entity_id" = '23d07368-37a9-4f19-8169-392486c40d8b');
DELETE FROM "mendixsystem$attribute" 
 WHERE "entity_id" = '23d07368-37a9-4f19-8169-392486c40d8b';
DROP TABLE "fd34585ee69a40f5a6787833b41d31b3";
DROP TABLE "f5a67f4a20564dc188dbd96d97b0911c";
DROP TABLE "515c1b0d8d14486ea9acaca505017096";
DROP TABLE "caddb8e2462241e9902ca54f4c1421d0";
DROP TABLE "06a08bedd1054556ae4b2ab24d3f24da";
DROP TABLE "be05537397b1462ba6c5acb7ccabe3c7";
DROP TABLE "7a2d74aaa3fa43369b5aa515c984ba71";
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.0.7', 
"lastsyncdate" = '20140227 13:24:00';
