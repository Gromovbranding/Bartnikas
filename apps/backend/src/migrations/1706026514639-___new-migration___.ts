import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1706026514639 implements MigrationInterface {
  name = '__newMigration__1706026514639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" DROP CONSTRAINT "FK_8ef923966e6bdeaa64fb3b0894e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" ADD CONSTRAINT "FK_8ef923966e6bdeaa64fb3b0894e" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" DROP CONSTRAINT "FK_8ef923966e6bdeaa64fb3b0894e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" ADD CONSTRAINT "FK_8ef923966e6bdeaa64fb3b0894e" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
