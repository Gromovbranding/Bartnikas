<script lang="ts" setup>
import type { IFooterContact, PartialFileAdminApiDto } from '@/types/admin-api'
import { AdminTemplateForm, AdminUploadFile } from '#components'

definePageMeta({
  layout: 'admin',
  validate (route) {
    return /^\d+$/.test(route.params.id as string)
  }
})

const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)
const route = useRoute()
const id = Number(route.params.id)

const { footerContacts } = useAdmin()
const { formRules, navigateBack, titles, methods } = footerContacts()

const model = await methods.handleGetModel(id)

useHeadSafe({
  title: titles.edit
})

const form = reactive<IFooterContact>(model)

const handleDelete = async () => {
  await methods.handleDelete(id)
  await navigateTo(navigateBack.value)
}

const handleUpdate = async () => {
  if (await formRef.value?.validate()) {
    try {
      form.logo = await uploadRef.value!.uploadToServer() as PartialFileAdminApiDto

      await methods.handlePatch(id, toValue(form))

      await refreshNuxtData()

      await navigateTo(navigateBack.value)
    } catch (exc) {
      console.error(exc)
    }
  }
}
</script>

<template>
  <AdminTemplateCardWithForm :title="titles.edit" :navigate-back="navigateBack">
    <AdminTemplateForm ref="formRef" :model="form" :rules="formRules">
      <ElFormItem>
        <h2 style="font-size: 24px">
          Menu Links
        </h2>
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
        <h2 style="font-size: 24px">
          Socials Links
        </h2>
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
        <ElButton type="primary" @click="handleUpdate">
          Update
        </ElButton>
        <ElButton type="danger" @click="handleDelete">
          Delete
        </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
