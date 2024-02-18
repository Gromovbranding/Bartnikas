import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1700609039026 implements MigrationInterface {
  name = '__newMigration__1700609039026';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "greeting_index" ADD "posterId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" ADD CONSTRAINT "UQ_a1289835c114ebeabcf3ae7d269" UNIQUE ("posterId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" ADD CONSTRAINT "FK_a1289835c114ebeabcf3ae7d269" FOREIGN KEY ("posterId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "greeting_index" DROP CONSTRAINT "FK_a1289835c114ebeabcf3ae7d269"`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" DROP CONSTRAINT "UQ_a1289835c114ebeabcf3ae7d269"`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" DROP COLUMN "posterId"`,
    );
  }
}
