import { MigrationInterface, QueryRunner } from 'typeorm';

export class __newMigration__1708611390544 implements MigrationInterface {
  name = '__newMigration__1708611390544';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" DROP CONSTRAINT "FK_391cb13d3f03711d74025258e46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio" DROP CONSTRAINT "FK_a9eeceb6d7c3117f76737bd0626"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_b1e5a455558381ffcf46be9eeee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" DROP CONSTRAINT "FK_674c1ac620e366d9cfd953cf703"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_exhibition" DROP CONSTRAINT "FK_24ebadf7a5d3e88064de0cf1ee2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation" DROP CONSTRAINT "FK_b2109a5a86559f3bf56f55eea5a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation" DROP CONSTRAINT "FK_6decf189ba3dfc8cfc3d4629302"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_publication" DROP CONSTRAINT "FK_4db35a03a41073e623c312b91c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio_testimonial" DROP CONSTRAINT "FK_257199ed17cd5f79912337f845f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards" DROP CONSTRAINT "FK_b8164895e78366992592d5cb65c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" DROP CONSTRAINT "FK_a1289835c114ebeabcf3ae7d269"`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" DROP CONSTRAINT "FK_2720c425fb37e97cb016d2fb90f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release" DROP CONSTRAINT "FK_046684ab08714d8fd7a26ba0b92"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_collab" DROP CONSTRAINT "FK_1884d8fe63f16c46f47bd5180c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" DROP CONSTRAINT "FK_845a8181aafc508c1ae082b6e68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_kit" DROP CONSTRAINT "FK_a084b628ff866990d288e19dee3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_kit" DROP CONSTRAINT "FK_c0b83c40ca2c5d6920330ec5cbc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_cv" DROP CONSTRAINT "FK_d8448743bd10cf96e0d280f0fc8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_cv" DROP CONSTRAINT "FK_f7aea8339250a9b28de36bbf5d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "footer_contact" DROP CONSTRAINT "FK_bf8473fd03f661a59ccb5020577"`,
    );
    await queryRunner.query(
      `ALTER TABLE "index_slider" DROP CONSTRAINT "FK_82c16279f399ba761224605aeb6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" ADD CONSTRAINT "FK_391cb13d3f03711d74025258e46" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio" ADD CONSTRAINT "FK_a9eeceb6d7c3117f76737bd0626" FOREIGN KEY ("awatarId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_b1e5a455558381ffcf46be9eeee" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD CONSTRAINT "FK_674c1ac620e366d9cfd953cf703" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_exhibition" ADD CONSTRAINT "FK_24ebadf7a5d3e88064de0cf1ee2" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation" ADD CONSTRAINT "FK_6decf189ba3dfc8cfc3d4629302" FOREIGN KEY ("pdfId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation" ADD CONSTRAINT "FK_b2109a5a86559f3bf56f55eea5a" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_publication" ADD CONSTRAINT "FK_4db35a03a41073e623c312b91c1" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio_testimonial" ADD CONSTRAINT "FK_257199ed17cd5f79912337f845f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards" ADD CONSTRAINT "FK_b8164895e78366992592d5cb65c" FOREIGN KEY ("awardsAvatarId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" ADD CONSTRAINT "FK_2720c425fb37e97cb016d2fb90f" FOREIGN KEY ("videoId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" ADD CONSTRAINT "FK_a1289835c114ebeabcf3ae7d269" FOREIGN KEY ("posterId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release" ADD CONSTRAINT "FK_046684ab08714d8fd7a26ba0b92" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_collab" ADD CONSTRAINT "FK_1884d8fe63f16c46f47bd5180c4" FOREIGN KEY ("videoId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" ADD CONSTRAINT "FK_845a8181aafc508c1ae082b6e68" FOREIGN KEY ("videoId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_kit" ADD CONSTRAINT "FK_c0b83c40ca2c5d6920330ec5cbc" FOREIGN KEY ("pdfId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_kit" ADD CONSTRAINT "FK_a084b628ff866990d288e19dee3" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_cv" ADD CONSTRAINT "FK_f7aea8339250a9b28de36bbf5d8" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_cv" ADD CONSTRAINT "FK_d8448743bd10cf96e0d280f0fc8" FOREIGN KEY ("pdfId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "footer_contact" ADD CONSTRAINT "FK_bf8473fd03f661a59ccb5020577" FOREIGN KEY ("logoId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "index_slider" ADD CONSTRAINT "FK_82c16279f399ba761224605aeb6" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "index_slider" DROP CONSTRAINT "FK_82c16279f399ba761224605aeb6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "footer_contact" DROP CONSTRAINT "FK_bf8473fd03f661a59ccb5020577"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_cv" DROP CONSTRAINT "FK_d8448743bd10cf96e0d280f0fc8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_cv" DROP CONSTRAINT "FK_f7aea8339250a9b28de36bbf5d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_kit" DROP CONSTRAINT "FK_a084b628ff866990d288e19dee3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_kit" DROP CONSTRAINT "FK_c0b83c40ca2c5d6920330ec5cbc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" DROP CONSTRAINT "FK_845a8181aafc508c1ae082b6e68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_collab" DROP CONSTRAINT "FK_1884d8fe63f16c46f47bd5180c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release" DROP CONSTRAINT "FK_046684ab08714d8fd7a26ba0b92"`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" DROP CONSTRAINT "FK_a1289835c114ebeabcf3ae7d269"`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" DROP CONSTRAINT "FK_2720c425fb37e97cb016d2fb90f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards" DROP CONSTRAINT "FK_b8164895e78366992592d5cb65c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio_testimonial" DROP CONSTRAINT "FK_257199ed17cd5f79912337f845f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_publication" DROP CONSTRAINT "FK_4db35a03a41073e623c312b91c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation" DROP CONSTRAINT "FK_b2109a5a86559f3bf56f55eea5a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation" DROP CONSTRAINT "FK_6decf189ba3dfc8cfc3d4629302"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_exhibition" DROP CONSTRAINT "FK_24ebadf7a5d3e88064de0cf1ee2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" DROP CONSTRAINT "FK_674c1ac620e366d9cfd953cf703"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_b1e5a455558381ffcf46be9eeee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio" DROP CONSTRAINT "FK_a9eeceb6d7c3117f76737bd0626"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" DROP CONSTRAINT "FK_391cb13d3f03711d74025258e46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "index_slider" ADD CONSTRAINT "FK_82c16279f399ba761224605aeb6" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "footer_contact" ADD CONSTRAINT "FK_bf8473fd03f661a59ccb5020577" FOREIGN KEY ("logoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_cv" ADD CONSTRAINT "FK_f7aea8339250a9b28de36bbf5d8" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_cv" ADD CONSTRAINT "FK_d8448743bd10cf96e0d280f0fc8" FOREIGN KEY ("pdfId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_kit" ADD CONSTRAINT "FK_c0b83c40ca2c5d6920330ec5cbc" FOREIGN KEY ("pdfId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_kit" ADD CONSTRAINT "FK_a084b628ff866990d288e19dee3" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_collection" ADD CONSTRAINT "FK_845a8181aafc508c1ae082b6e68" FOREIGN KEY ("videoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_collab" ADD CONSTRAINT "FK_1884d8fe63f16c46f47bd5180c4" FOREIGN KEY ("videoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_press_release" ADD CONSTRAINT "FK_046684ab08714d8fd7a26ba0b92" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" ADD CONSTRAINT "FK_2720c425fb37e97cb016d2fb90f" FOREIGN KEY ("videoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "greeting_index" ADD CONSTRAINT "FK_a1289835c114ebeabcf3ae7d269" FOREIGN KEY ("posterId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards" ADD CONSTRAINT "FK_b8164895e78366992592d5cb65c" FOREIGN KEY ("awardsAvatarId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio_testimonial" ADD CONSTRAINT "FK_257199ed17cd5f79912337f845f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_publication" ADD CONSTRAINT "FK_4db35a03a41073e623c312b91c1" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation" ADD CONSTRAINT "FK_6decf189ba3dfc8cfc3d4629302" FOREIGN KEY ("pdfId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_presentation" ADD CONSTRAINT "FK_b2109a5a86559f3bf56f55eea5a" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_exhibition" ADD CONSTRAINT "FK_24ebadf7a5d3e88064de0cf1ee2" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD CONSTRAINT "FK_674c1ac620e366d9cfd953cf703" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_b1e5a455558381ffcf46be9eeee" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bio" ADD CONSTRAINT "FK_a9eeceb6d7c3117f76737bd0626" FOREIGN KEY ("awatarId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_image_detail" ADD CONSTRAINT "FK_391cb13d3f03711d74025258e46" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
