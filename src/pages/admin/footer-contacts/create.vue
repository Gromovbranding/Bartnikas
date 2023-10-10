<script lang="ts" setup>
import {
  IFooterContact,
  PartialAdminApiDto,
  PartialFileAdminApiDto,
} from "@/types/admin-api";
import { AdminTemplateForm, AdminUploadFile } from "#components";

definePageMeta({
  layout: "admin",
});

const { footerContacts } = useAdmin();
const { titles, formRules, navigateBack, methods } = footerContacts();

useHeadSafe({
  title: titles.create,
});

const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null);
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null);

const form = reactive<PartialAdminApiDto<IFooterContact>>({
  active: false,
  menu_links: [],
  socials: [],
  logo: null,
});

const handleResetForm = () => formRef.value?.resetForm();

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      const file = await uploadRef.value!.uploadToServer();

      await methods.handleCreate({
        ...toValue(form),
        logo: file as PartialFileAdminApiDto,
      });

      await refreshNuxtData();

      await navigateTo(navigateBack.value);
    } catch (exc) {
      console.error(exc);
    }
  }
};
</script>

<template>
  <AdminTemplateCardWithForm
    :title="titles.create"
    :navigate-back="navigateBack"
  >
    <AdminTemplateForm ref="formRef" :model="form" :rules="formRules">
      <ElFormItem>
        <h2 style="font-size: 24px">Menu Links</h2>
      </ElFormItem>
      <template v-for="(item, idx) in form.menu_links" :key="`ml-${idx}`">
        <ElFormItem
          label="Menu item name"
          :prop="`menu_links.${idx}.name`"
          :rules="{
            required: true,
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <ElInput v-model="form.menu_links[idx].name" />
        </ElFormItem>
        <ElFormItem
          label="Menu item link"
          :prop="`menu_links.${idx}.link`"
          :rules="{
            required: true,
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <ElInput v-model="form.menu_links[idx].link" />
        </ElFormItem>

        <ElFormItem>
          <ElButton
            type="danger"
            @click="form.menu_links = removeItemByIdx(form.menu_links, idx)"
          >
            <ElIcon>
              <ElIconDelete />
            </ElIcon>
          </ElButton>
        </ElFormItem>
      </template>

      <ElFormItem>
        <ElButton
          type="default"
          @click="
            form.menu_links.push({
              name: '',
              link: '',
            })
          "
        >
          Add new menu link
        </ElButton>
      </ElFormItem>

      <ElFormItem style="margin-top: 42px">
        <h2 style="font-size: 24px">Socials Links</h2>
      </ElFormItem>
      <template v-for="(item, idx) in form.socials" :key="`sl-${idx}`">
        <ElFormItem
          label="Social item icon"
          :prop="`socials.${idx}.icon`"
          :rules="{
            required: true,
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <ElInput v-model="form.socials[idx].icon" />
        </ElFormItem>

        <ElFormItem
          label="Social item link"
          :prop="`socials.${idx}.link`"
          :rules="{
            required: true,
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <ElInput v-model="form.socials[idx].link" />
        </ElFormItem>

        <ElFormItem>
          <ElButton
            type="danger"
            @click="form.socials = removeItemByIdx(form.socials, idx)"
          >
            <ElIcon>
              <ElIconDelete />
            </ElIcon>
          </ElButton>
        </ElFormItem>
      </template>

      <ElFormItem>
        <ElButton
          type="default"
          @click="
            form.socials.push({
              icon: '',
              link: '',
            })
          "
        >
          Add new social
        </ElButton>
      </ElFormItem>

      <ElFormItem label="Is active" prop="active">
        <ElSwitch v-model="form.active" />
      </ElFormItem>

      <ElFormItem required label="Logo" prop="logo">
        <AdminUploadFile ref="uploadRef" v-model="form.logo" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="handleCreate"> Create </ElButton>
        <ElButton @click="handleResetForm"> Clear </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
