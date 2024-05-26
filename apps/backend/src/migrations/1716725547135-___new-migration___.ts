import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1716725547135 implements MigrationInterface {
  name = '__newMigration__1716725547135';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "photoportal_order" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "uuid" character varying NOT NULL, "amount" character varying NOT NULL, "currency" character varying NOT NULL, "invoice_id" character varying NOT NULL, "actually_paid" character varying NOT NULL DEFAULT '0', "status" character varying NOT NULL DEFAULT 'created', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fd112b5422d118f7cc1d179ed45" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "photoportal_order"`);
  }
}
