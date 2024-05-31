<script lang="ts" setup>
import { AdminTemplateForm } from '#components'
import type { IAbout, IAboutTranslate } from '~/types/admin-api'

definePageMeta({
  layout: 'admin',
  validate (route) {
    return /^\d+$/.test(route.params.id as string)
  }
})

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

const route = useRoute()
const id = Number(route.params.id)

const { about, currentIndexLocale, initTranslateLocale } = useAdmin()
const { formRules, navigateBack, titles, methods } = about()

const model = await methods.handleGetModel(id)

useHeadSafe({
  title: titles.edit
})

const form = reactive<IAbout>({
  ...model,
  translate: initTranslateLocale<IAboutTranslate>(model.translate)
})

const handleDelete = async () => {
  await methods.handleDelete(id)
  await navigateTo(navigateBack.value)
}

const handleUpdate = async () => {
  if (await formRef.value?.validate()) {
    try {
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
      <ElFormItem label="Is active" prop="active">
        <ElSwitch v-model="form.is_active" />
      </ElFormItem>
      <ElFormItem
        :label="'Title'"
        :prop="`translate.${currentIndexLocale}.title`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].title" />
      </ElFormItem>
      <ElFormItem
        :label="'Subtitle'"
        :prop="`translate.${currentIndexLocale}.subtitle`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].subtitle" />
      </ElFormItem>

      <ElFormItem>
        <h2 style="font-size: 24px">
          Advantages
        </h2>
      </ElFormItem>
      <template v-for="(item, idx) in form.translate[currentIndexLocale].advantages" :key="`ml-${idx}`">
        <ElFormItem
          label="Advantage value"
          :prop="`translate.${currentIndexLocale}.advantages.${idx}.value`"
          :rules="{
            required: true,
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <ElInput v-model="form.translate[currentIndexLocale].advantages[idx].value" />
        </ElFormItem>
        <ElFormItem
          label="Advantage text"
          :prop="`translate.${currentIndexLocale}.advantages.${idx}.text`"
          :rules="{
            required: true,
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <ElInput v-model="form.translate[currentIndexLocale].advantages[idx].text" />
        </ElFormItem>

        <ElFormItem>
          <ElButton
            type="danger"
            @click="form.translate[currentIndexLocale].advantages = removeItemByIdx(form.translate[currentIndexLocale].advantages, idx)"
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
            form.translate[currentIndexLocale].advantages.push({
              value: '',
              text: '',
            })
          "
        >
          Add advantage
        </ElButton>
      </ElFormItem>

      <ElFormItem
        :label="'Concept title'"
        :prop="`translate.${currentIndexLocale}.concept_title`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].concept_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Concept text'"
        :prop="`translate.${currentIndexLocale}.concept_text`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].concept_text" type="textarea" />
      </ElFormItem>
      <ElFormItem
        :label="'Ticker title'"
        :prop="`translate.${currentIndexLocale}.ticker_title`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].ticker_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Ticker text'"
        :prop="`translate.${currentIndexLocale}.ticker_text`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].ticker_text" />
      </ElFormItem>
      <ElFormItem
        :label="'Recognition title'"
        :prop="`translate.${currentIndexLocale}.recognition_title`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].recognition_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Recognition text'"
        :prop="`translate.${currentIndexLocale}.recognition_text`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].recognition_text" />
      </ElFormItem>

      <ElFormItem>
        <h2 style="font-size: 24px">
          Recognition cities
        </h2>
      </ElFormItem>
      <template v-for="(item, idx) in form.translate[currentIndexLocale].recognition_cities" :key="`ml-${idx}`">
        <ElFormItem
          label="Recognition city name"
          :prop="`translate.${currentIndexLocale}.recognition_cities.${idx}.name`"
          :rules="{
            required: true,
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <ElInput v-model="form.translate[currentIndexLocale].recognition_cities[idx].name" />
        </ElFormItem>

        <ElFormItem>
          <ElButton
            type="danger"
            @click="form.translate[currentIndexLocale].recognition_cities = removeItemByIdx(form.translate[currentIndexLocale].recognition_cities, idx)"
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
            form.translate[currentIndexLocale].recognition_cities.push({
              name: '',
            })
          "
        >
          Add city
        </ElButton>
      </ElFormItem>

      <ElFormItem>
        <h2 style="font-size: 24px">
          Achievements
        </h2>
      </ElFormItem>
      <template v-for="(item, idx) in form.translate[currentIndexLocale].achievements" :key="`ml-${idx}`">
        <ElFormItem
          label="Achievement text"
          :prop="`translate.${currentIndexLocale}.achievements.${idx}.text`"
          :rules="{
            required: true,
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <ElInput v-model="form.translate[currentIndexLocale].achievements[idx].text" />
        </ElFormItem>

        <ElFormItem>
          <ElButton
            type="danger"
            @click="form.translate[currentIndexLocale].achievements = removeItemByIdx(form.translate[currentIndexLocale].achievements, idx)"
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
            form.translate[currentIndexLocale].achievements.push({
              text: '',
            })
          "
        >
          Add achievement
        </ElButton>
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
