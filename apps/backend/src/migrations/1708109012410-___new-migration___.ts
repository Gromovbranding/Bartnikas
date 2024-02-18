import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1708109012410 implements MigrationInterface {
  name = '__newMigration__1708109012410';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project_image_detail_translate" ("id" SERIAL NOT NULL, "image_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "projectImageDetailId" integer, "languageId" integer, CONSTRAINT "PK_4ca3b1deac15718e2e52240e642" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_press_release_translate" ("id" SERIAL NOT NULL, "title" text NOT NULL, "text" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "projectPressReleaseId" integer, "languageId" integer, CONSTRAINT "PK_6560dde4d63a7ae7624f419e50a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_collab_translate" ("id" SERIAL NOT NULL, "collab_with" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "projectCollabId" integer, "languageId" integer, CONSTRAINT "PK_38efe0e80968f8eb859a00c80c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_translate" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer, "languageId" integer, CONSTRAINT "PK_806b4a453a8b6fe2dcf275faea2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" DROP COLUMN "image_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release" DROP COLUMN "title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release" DROP COLUMN "text"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_collab" DROP COLUMN "collab_with"`,
    );
    await queryRunner.query(`ALTER TABLE "project_collab" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "project_collab" DROP COLUMN "description"`,
    );
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "project_image_detail_translate" ADD CONSTRAINT "FK_781ab3d13d970f2f666c869d031" FOREIGN KEY ("projectImageDetailId") REFERENCES "project_image_detail"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail_translate" ADD CONSTRAINT "FK_53da74dcdad902a9de89832bc89" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release_translate" ADD CONSTRAINT "FK_dc8ed23bebd693be85efc6c9d84" FOREIGN KEY ("projectPressReleaseId") REFERENCES "project_press_release"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release_translate" ADD CONSTRAINT "FK_359bed88b6dad4846156c98a4fd" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_collab_translate" ADD CONSTRAINT "FK_e6e6f948184f85e3dfff421ddb9" FOREIGN KEY ("projectCollabId") REFERENCES "project_collab"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_collab_translate" ADD CONSTRAINT "FK_7863f33c7ccb78c9a14e7395a79" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_translate" ADD CONSTRAINT "FK_364e52325e268374d5a16fcfda0" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_translate" ADD CONSTRAINT "FK_d24acc199f7daae17ce929c510d" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_translate" DROP CONSTRAINT "FK_d24acc199f7daae17ce929c510d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_translate" DROP CONSTRAINT "FK_364e52325e268374d5a16fcfda0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_collab_translate" DROP CONSTRAINT "FK_7863f33c7ccb78c9a14e7395a79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_collab_translate" DROP CONSTRAINT "FK_e6e6f948184f85e3dfff421ddb9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release_translate" DROP CONSTRAINT "FK_359bed88b6dad4846156c98a4fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release_translate" DROP CONSTRAINT "FK_dc8ed23bebd693be85efc6c9d84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail_translate" DROP CONSTRAINT "FK_53da74dcdad902a9de89832bc89"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail_translate" DROP CONSTRAINT "FK_781ab3d13d970f2f666c869d031"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD "description" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_collab" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_collab" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_collab" ADD "collab_with" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release" ADD "text" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" ADD "image_name" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "project_translate"`);
    await queryRunner.query(`DROP TABLE "project_collab_translate"`);
    await queryRunner.query(`DROP TABLE "project_press_release_translate"`);
    await queryRunner.query(`DROP TABLE "project_image_detail_translate"`);
  }
}
