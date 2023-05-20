import { MigrationInterface, QueryRunner } from "typeorm";

export class default1684147844238 implements MigrationInterface {
    name = 'default1684147844238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teams" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(30) NOT NULL, CONSTRAINT "UQ_48c0c32e6247a2de155baeaf980" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "matches" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "idhost" integer, "idvisitor" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_matches" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "idhost" integer, "idvisitor" integer, CONSTRAINT "fk_host_id" FOREIGN KEY ("idhost") REFERENCES "teams" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "fk_visitor_id" FOREIGN KEY ("idvisitor") REFERENCES "teams" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_matches"("id", "date", "idhost", "idvisitor") SELECT "id", "date", "idhost", "idvisitor" FROM "matches"`);
        await queryRunner.query(`DROP TABLE "matches"`);
        await queryRunner.query(`ALTER TABLE "temporary_matches" RENAME TO "matches"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matches" RENAME TO "temporary_matches"`);
        await queryRunner.query(`CREATE TABLE "matches" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "idhost" integer, "idvisitor" integer)`);
        await queryRunner.query(`INSERT INTO "matches"("id", "date", "idhost", "idvisitor") SELECT "id", "date", "idhost", "idvisitor" FROM "temporary_matches"`);
        await queryRunner.query(`DROP TABLE "temporary_matches"`);
        await queryRunner.query(`DROP TABLE "matches"`);
        await queryRunner.query(`DROP TABLE "teams"`);
    }

}
