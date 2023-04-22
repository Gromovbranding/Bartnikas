<script lang="ts" setup>
const rules = reactive({
  title: [
    {
      required: true,
      message: "Please input Title",
      trigger: "change",
    },
  ],
  desc: [
    {
      required: true,
      message: "Please input Desc",
      trigger: "change",
    },
  ],
});

const form = reactive({
  title: "",
  desc: "",
});
</script>

<template>
  <ElCard>
    <template #header>
      <h1>Projects</h1>
    </template>

    <ElForm :model="form" :rules="rules" label-width="120px">
      <ElFormItem label="Title" prop="title">
        <ElInput v-model="form.title" />
      </ElFormItem>

      <ElFormItem label="Description" prop="desc">
        <ElInput v-model="form.desc" :rows="5" type="textarea" />
      </ElFormItem>

      <!-- Project Images -->
      <!-- <ElFormItem class="input-container" label="Project Images">
          <ElTable
            class="images-table"
            :data="form.project_images"
            style="width: 100%"
          >
            <ElTableColumn label="image">
              <template #default="scope">
                <ElImage
                  style="width: 100px; height: 100px"
                  :src="scope.row.files[0].url"
                  fit="fill"
                />
              </template>
            </ElTableColumn>
            <ElTableColumn label="id" prop="id" />
            <ElTableColumn label="Name" prop="name" />

            <ElTableColumn align="right">
              <template #header>
                <ElButton type="success" size="small" @click="handleCreate">
                  Add
                </ElButton>
              </template>
              <template #default="scope">
                <ElButton size="small" @click="handleEdit(scope.row)">
                  Edit
                </ElButton>
                <ElButton
                  type="danger"
                  size="small"
                  @click="handleDelete(scope.row)"
                >
                  Delete
                </ElButton>
              </template>
            </ElTableColumn>
          </ElTable>

          <ElDialog v-model="dialogVisible" title="Attention!" width="30%">
            <span>Delete project ?</span>
            <template #footer>
              <span class="dialog-footer">
                <ElButton>Cancel</ElButton>
                <ElButton type="primary"> Confirm </ElButton>
              </span>
            </template>
          </ElDialog>
      </ElFormItem> -->

      <ElFormItem>
        <div class="button-container">
          <div>
            <ElButton type="primary"> Save </ElButton>
            <ElButton>Clear</ElButton>
          </div>
          <ElButton type="info" plain>Back</ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </ElCard>
</template>
