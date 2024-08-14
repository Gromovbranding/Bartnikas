import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1723669878252 implements MigrationInterface {
  name = '__newMigration__1723669878252';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."awards_degree_group_type_enum" RENAME TO "awards_degree_group_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."awards_degree_group_type_enum" AS ENUM('Gold', 'Silver', 'Bronze', 'People''s choice Awards', 'Honorable mention', 'Remarkable artwork', '1 place', '2 place', '3 place')`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_degree_group" ALTER COLUMN "type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_degree_group" ALTER COLUMN "type" TYPE "public"."awards_degree_group_type_enum" USING "type"::"text"::"public"."awards_degree_group_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_degree_group" ALTER COLUMN "type" SET DEFAULT 'Gold'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."awards_degree_group_type_enum_old"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."awards_degree_group_type_enum_old" AS ENUM('Gold', 'Silver', 'Bronze')`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_degree_group" ALTER COLUMN "type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_degree_group" ALTER COLUMN "type" TYPE "public"."awards_degree_group_type_enum_old" USING "type"::"text"::"public"."awards_degree_group_type_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_degree_group" ALTER COLUMN "type" SET DEFAULT 'Gold'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."awards_degree_group_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."awards_degree_group_type_enum_old" RENAME TO "awards_degree_group_type_enum"`,
    );
  }
}
