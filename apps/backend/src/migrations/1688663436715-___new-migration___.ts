import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1688663436715 implements MigrationInterface {
  name = '__newMigration__1688663436715';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "file" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "awards" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "awardsAvatarId" integer, CONSTRAINT "REL_b8164895e78366992592d5cb65" UNIQUE ("awardsAvatarId"), CONSTRAINT "PK_bc3f6adc548ff46c76c03e06377" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."awards_degree_group_type_enum" AS ENUM('Gold', 'Silver', 'Bronze')`,
    );
    await queryRunner.query(
      `CREATE TABLE "awards_degree_group" ("id" SERIAL NOT NULL, "type" "public"."awards_degree_group_type_enum" NOT NULL DEFAULT 'Gold', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "degreeId" integer, CONSTRAINT "PK_44290ed34102e55d2e41f72b1ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "awards_degree" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "awardsId" integer, CONSTRAINT "PK_f08a45c06f3aeb1bd325b2a9ad4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "blog" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "text" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "imageId" integer, CONSTRAINT "REL_674c1ac620e366d9cfd953cf70" UNIQUE ("imageId"), CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "comment" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "greeting_index" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "videoId" integer, CONSTRAINT "REL_2720c425fb37e97cb016d2fb90" UNIQUE ("videoId"), CONSTRAINT "PK_9366af15660f2a2146758dd122e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "media_cv" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "imageId" integer, CONSTRAINT "REL_f7aea8339250a9b28de36bbf5d" UNIQUE ("imageId"), CONSTRAINT "PK_f476147fff1bfb46bee1bdeee9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "media_exhibition" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "awards" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "imageId" integer, CONSTRAINT "REL_24ebadf7a5d3e88064de0cf1ee" UNIQUE ("imageId"), CONSTRAINT "PK_e1ade224b2adf0363bab3265bb0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "index_slider" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "imageId" integer, CONSTRAINT "REL_82c16279f399ba761224605aeb" UNIQUE ("imageId"), CONSTRAINT "PK_a0bbdf8dae9bb3864c1e9abd25c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "media_kit" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "pdfId" integer, "imageId" integer, CONSTRAINT "REL_c0b83c40ca2c5d6920330ec5cb" UNIQUE ("pdfId"), CONSTRAINT "REL_a084b628ff866990d288e19dee" UNIQUE ("imageId"), CONSTRAINT "PK_0bf74621c5694997efad8191d94" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "media_publication" ("id" SERIAL NOT NULL, "program" character varying NOT NULL, "subtitle" character varying NOT NULL, "url" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "imageId" integer, CONSTRAINT "REL_4db35a03a41073e623c312b91c" UNIQUE ("imageId"), CONSTRAINT "PK_c9de402f13413c92ab4f450f844" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_image_sizes_unit_enum" AS ENUM('cm')`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_image_sizes" ("id" SERIAL NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "unit" "public"."project_image_sizes_unit_enum" NOT NULL DEFAULT 'cm', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3388e36836d8d0645bf4f73077" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "text" text NOT NULL, "is_hot" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "imageId" integer, CONSTRAINT "REL_b1e5a455558381ffcf46be9eee" UNIQUE ("imageId"), CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_press_release" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "projectCollabId" integer, "fileId" integer, CONSTRAINT "REL_046684ab08714d8fd7a26ba0b9" UNIQUE ("fileId"), CONSTRAINT "PK_c8a4db162c94e4c2738456a12dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_collab" ("id" SERIAL NOT NULL, "collab_with" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "videoId" integer, CONSTRAINT "REL_1884d8fe63f16c46f47bd5180c" UNIQUE ("videoId"), CONSTRAINT "PK_31744e3ca3c096e23257175bcb5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "group" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "collabId" integer, CONSTRAINT "REL_cae9877a9936969bf1cb43fb15" UNIQUE ("collabId"), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_image_detail" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "image_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "imageId" integer, "projectId" integer, CONSTRAINT "REL_391cb13d3f03711d74025258e4" UNIQUE ("imageId"), CONSTRAINT "PK_8834f2472d3b5296ddb1f7b4c3f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "testimonials" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "additional_info" character varying NOT NULL, "url" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fileId" integer, CONSTRAINT "REL_4b2df3b14d775bbfd70539120a" UNIQUE ("fileId"), CONSTRAINT "PK_63b03c608bd258f115a0a4a1060" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "video_collection" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "videoId" integer, "projectId" integer, CONSTRAINT "REL_845a8181aafc508c1ae082b6e6" UNIQUE ("videoId"), CONSTRAINT "REL_69720e404548083698a9e13fb8" UNIQUE ("projectId"), CONSTRAINT "PK_ba42ef4c14cd644d3bbb9673bdd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "media_presentation" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "pdfId" integer, "imageId" integer, CONSTRAINT "REL_6decf189ba3dfc8cfc3d462930" UNIQUE ("pdfId"), CONSTRAINT "REL_b2109a5a86559f3bf56f55eea5" UNIQUE ("imageId"), CONSTRAINT "PK_5588d8c3c74a53a6a687df25cb4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "awards_degree_group_images_file" ("awardsDegreeGroupId" integer NOT NULL, "fileId" integer NOT NULL, CONSTRAINT "PK_6f6fd912b285852b22b59587afc" PRIMARY KEY ("awardsDegreeGroupId", "fileId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_726c4e8a306cd0e23dae66a56a" ON "awards_degree_group_images_file" ("awardsDegreeGroupId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_74a538605e622c156b737c3969" ON "awards_degree_group_images_file" ("fileId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "project_image_detail_sizes_project_image_sizes" ("projectImageDetailId" integer NOT NULL, "projectImageSizesId" integer NOT NULL, CONSTRAINT "PK_95f53058cb3ceaaed8426fc88d5" PRIMARY KEY ("projectImageDetailId", "projectImageSizesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_158df933876bc7cc4c110f38bb" ON "project_image_detail_sizes_project_image_sizes" ("projectImageDetailId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8fc5098c695dd684ca9a7c5e7e" ON "project_image_detail_sizes_project_image_sizes" ("projectImageSizesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "awards" ADD CONSTRAINT "FK_b8164895e78366992592d5cb65c" FOREIGN KEY ("awardsAvatarId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_degree_group" ADD CONSTRAINT "FK_c926e3a560c0a64ab7f518e8967" FOREIGN KEY ("degreeId") REFERENCES "awards_degree"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_degree" ADD CONSTRAINT "FK_ced4df8aaeb9705bb4ef94c40fa" FOREIGN KEY ("awardsId") REFERENCES "awards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD CONSTRAINT "FK_674c1ac620e366d9cfd953cf703" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" ADD CONSTRAINT "FK_2720c425fb37e97cb016d2fb90f" FOREIGN KEY ("videoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_cv" ADD CONSTRAINT "FK_f7aea8339250a9b28de36bbf5d8" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_exhibition" ADD CONSTRAINT "FK_24ebadf7a5d3e88064de0cf1ee2" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "index_slider" ADD CONSTRAINT "FK_82c16279f399ba761224605aeb6" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_kit" ADD CONSTRAINT "FK_c0b83c40ca2c5d6920330ec5cbc" FOREIGN KEY ("pdfId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_kit" ADD CONSTRAINT "FK_a084b628ff866990d288e19dee3" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_publication" ADD CONSTRAINT "FK_4db35a03a41073e623c312b91c1" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_b1e5a455558381ffcf46be9eeee" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release" ADD CONSTRAINT "FK_57111945a86778e49cfcbb25844" FOREIGN KEY ("projectCollabId") REFERENCES "project_collab"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release" ADD CONSTRAINT "FK_046684ab08714d8fd7a26ba0b92" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_collab" ADD CONSTRAINT "FK_1884d8fe63f16c46f47bd5180c4" FOREIGN KEY ("videoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_cae9877a9936969bf1cb43fb159" FOREIGN KEY ("collabId") REFERENCES "project_collab"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" ADD CONSTRAINT "FK_391cb13d3f03711d74025258e46" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" ADD CONSTRAINT "FK_8ef923966e6bdeaa64fb3b0894e" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "testimonials" ADD CONSTRAINT "FK_4b2df3b14d775bbfd70539120aa" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" ADD CONSTRAINT "FK_845a8181aafc508c1ae082b6e68" FOREIGN KEY ("videoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" ADD CONSTRAINT "FK_69720e404548083698a9e13fb8d" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation" ADD CONSTRAINT "FK_6decf189ba3dfc8cfc3d4629302" FOREIGN KEY ("pdfId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation" ADD CONSTRAINT "FK_b2109a5a86559f3bf56f55eea5a" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_degree_group_images_file" ADD CONSTRAINT "FK_726c4e8a306cd0e23dae66a56ae" FOREIGN KEY ("awardsDegreeGroupId") REFERENCES "awards_degree_group"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_degree_group_images_file" ADD CONSTRAINT "FK_74a538605e622c156b737c39695" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail_sizes_project_image_sizes" ADD CONSTRAINT "FK_158df933876bc7cc4c110f38bba" FOREIGN KEY ("projectImageDetailId") REFERENCES "project_image_detail"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail_sizes_project_image_sizes" ADD CONSTRAINT "FK_8fc5098c695dd684ca9a7c5e7e9" FOREIGN KEY ("projectImageSizesId") REFERENCES "project_image_sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_image_detail_sizes_project_image_sizes" DROP CONSTRAINT "FK_8fc5098c695dd684ca9a7c5e7e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail_sizes_project_image_sizes" DROP CONSTRAINT "FK_158df933876bc7cc4c110f38bba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_degree_group_images_file" DROP CONSTRAINT "FK_74a538605e622c156b737c39695"`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_degree_group_images_file" DROP CONSTRAINT "FK_726c4e8a306cd0e23dae66a56ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation" DROP CONSTRAINT "FK_b2109a5a86559f3bf56f55eea5a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation" DROP CONSTRAINT "FK_6decf189ba3dfc8cfc3d4629302"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" DROP CONSTRAINT "FK_69720e404548083698a9e13fb8d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" DROP CONSTRAINT "FK_845a8181aafc508c1ae082b6e68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "testimonials" DROP CONSTRAINT "FK_4b2df3b14d775bbfd70539120aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" DROP CONSTRAINT "FK_8ef923966e6bdeaa64fb3b0894e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" DROP CONSTRAINT "FK_391cb13d3f03711d74025258e46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_cae9877a9936969bf1cb43fb159"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_collab" DROP CONSTRAINT "FK_1884d8fe63f16c46f47bd5180c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release" DROP CONSTRAINT "FK_046684ab08714d8fd7a26ba0b92"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release" DROP CONSTRAINT "FK_57111945a86778e49cfcbb25844"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_b1e5a455558381ffcf46be9eeee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_publication" DROP CONSTRAINT "FK_4db35a03a41073e623c312b91c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_kit" DROP CONSTRAINT "FK_a084b628ff866990d288e19dee3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_kit" DROP CONSTRAINT "FK_c0b83c40ca2c5d6920330ec5cbc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "index_slider" DROP CONSTRAINT "FK_82c16279f399ba761224605aeb6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_exhibition" DROP CONSTRAINT "FK_24ebadf7a5d3e88064de0cf1ee2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_cv" DROP CONSTRAINT "FK_f7aea8339250a9b28de36bbf5d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" DROP CONSTRAINT "FK_2720c425fb37e97cb016d2fb90f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" DROP CONSTRAINT "FK_674c1ac620e366d9cfd953cf703"`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_degree" DROP CONSTRAINT "FK_ced4df8aaeb9705bb4ef94c40fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards_degree_group" DROP CONSTRAINT "FK_c926e3a560c0a64ab7f518e8967"`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards" DROP CONSTRAINT "FK_b8164895e78366992592d5cb65c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8fc5098c695dd684ca9a7c5e7e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_158df933876bc7cc4c110f38bb"`,
    );
    await queryRunner.query(
      `DROP TABLE "project_image_detail_sizes_project_image_sizes"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_74a538605e622c156b737c3969"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_726c4e8a306cd0e23dae66a56a"`,
    );
    await queryRunner.query(`DROP TABLE "awards_degree_group_images_file"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "media_presentation"`);
    await queryRunner.query(`DROP TABLE "video_collection"`);
    await queryRunner.query(`DROP TABLE "testimonials"`);
    await queryRunner.query(`DROP TABLE "project_image_detail"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TABLE "project_collab"`);
    await queryRunner.query(`DROP TABLE "project_press_release"`);
    await queryRunner.query(`DROP TABLE "news"`);
    await queryRunner.query(`DROP TABLE "project_image_sizes"`);
    await queryRunner.query(
      `DROP TYPE "public"."project_image_sizes_unit_enum"`,
    );
    await queryRunner.query(`DROP TABLE "media_publication"`);
    await queryRunner.query(`DROP TABLE "media_kit"`);
    await queryRunner.query(`DROP TABLE "index_slider"`);
    await queryRunner.query(`DROP TABLE "media_exhibition"`);
    await queryRunner.query(`DROP TABLE "media_cv"`);
    await queryRunner.query(`DROP TABLE "greeting_index"`);
    await queryRunner.query(`DROP TABLE "contacts"`);
    await queryRunner.query(`DROP TABLE "blog"`);
    await queryRunner.query(`DROP TABLE "awards_degree"`);
    await queryRunner.query(`DROP TABLE "awards_degree_group"`);
    await queryRunner.query(
      `DROP TYPE "public"."awards_degree_group_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "awards"`);
    await queryRunner.query(`DROP TABLE "file"`);
  }
}
