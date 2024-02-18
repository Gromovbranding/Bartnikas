import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1700652631350 implements MigrationInterface {
  name = '__newMigration__1700652631350';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "general_info" ("id" SERIAL NOT NULL, "email_gallery" character varying NOT NULL, "email_press" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0ca4333e7cb541037bccef1c186" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "general_info"`);
  }
}
