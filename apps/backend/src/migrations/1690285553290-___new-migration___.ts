import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1690285553290 implements MigrationInterface {
  name = '__newMigration__1690285553290';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bio_testimonial" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "job" character varying NOT NULL, "testimonial" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "photoId" integer, CONSTRAINT "REL_257199ed17cd5f79912337f845" UNIQUE ("photoId"), CONSTRAINT "PK_af6e80f90322f735754e486a885" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bio" ("id" SERIAL NOT NULL, "description" text NOT NULL, "sub_description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "awatarId" integer, CONSTRAINT "REL_a9eeceb6d7c3117f76737bd062" UNIQUE ("awatarId"), CONSTRAINT "PK_bcc0586d9cf13e3da6ce13d1783" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "delivery_static" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "sub_title" character varying NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_700c73ed495dd564914fd3d34c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "terms_static" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b3e6d29c8d6c26aa9bf2916ef58" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio_testimonial" ADD CONSTRAINT "FK_257199ed17cd5f79912337f845f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio" ADD CONSTRAINT "FK_a9eeceb6d7c3117f76737bd0626" FOREIGN KEY ("awatarId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bio" DROP CONSTRAINT "FK_a9eeceb6d7c3117f76737bd0626"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio_testimonial" DROP CONSTRAINT "FK_257199ed17cd5f79912337f845f"`,
    );
    await queryRunner.query(`DROP TABLE "terms_static"`);
    await queryRunner.query(`DROP TABLE "delivery_static"`);
    await queryRunner.query(`DROP TABLE "bio"`);
    await queryRunner.query(`DROP TABLE "bio_testimonial"`);
  }
}
