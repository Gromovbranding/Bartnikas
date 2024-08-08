<script lang="ts" setup>
import type { UploadUserFile } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import type { IAwards, IAwardsTranslate, PartialFileAdminApiDto } from '@/types/admin-api'
import { AdminTemplateForm, AdminUploadFile } from '#components'

interface ImageDetails {
  [key: number]: {
    year: number;
    groups: {
      type: 'Gold' | 'Silver';
      images: {
        name: string;
      }[];
    }[];
  };
}

definePageMeta({
  layout: 'admin',
  validate (route) {
    return /^\d+$/.test(route.params.id as string)
  }
})

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)
const uploadAvatarRef = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const imageFiles = ref<UploadUserFile[]>([])
const awardImages = ref<ImageDetails>({})
const route = useRoute()
const id = Number(route.params.id)

const { awards, initTranslateLocale, currentIndexLocale } = useAdmin()
const { formRules, navigateBack, titles, methods } = awards()

const model = await methods.handleGetModel(id)

useHeadSafe({
  title: titles.edit
})

const form = reactive<IAwards>({
  ...model,
  translate: initTranslateLocale<IAwardsTranslate>(model.translate)
})

const selectOptions = [
  { value: 'Gold', label: 'Gold' },
  { value: 'Silver', label: 'Silver' },
  { value: 'Bronze', label: 'Bronze' },
  { value: "People's choice Awards", label: "People's choice Awards" },
  { value: 'Honorable mention', label: 'Honorable mention' },
  { value: 'Remarkable artwork', label: 'Remarkable artwork' },
  { value: '1 place', label: '1 place' },
  { value: '2 place', label: '2 place' },
  { value: '3 place', label: '3 place' }
]

const handleDelete = async () => {
  await methods.handleDelete(id)
  await navigateTo(navigateBack.value)
}

const imagesToDegress = (arr: any[]) => {
  const years: {
    [key: number]: any[];
  } = {}
  arr.forEach((item) => {
    const awardImg = awardImages.value[item.uid]
    if (years[awardImg.year]) {
      years[awardImg.year].push({ item, data: awardImg })
      return
    }
    years[awardImg.year] = [{ item, data: awardImg }]
  })
  form.degress = []
  for (const i in years) {
    const goldImgs: any[] = []
    const silvImgs: any[] = []
    const bronzeImgs: any[] = []
    const peopleChoiceImgs: any[] = []
    const honorableImgs: any[] = []
    const remarkableImgs: any[] = []
    const firstImgs: any[] = []
    const secondImgs: any[] = []
    const thirdImgs: any[] = []
    years[i].forEach((yearItem) => {
      if (yearItem.data.groups === 'Gold') { return goldImgs.push({ name: yearItem.item.name }) }
      if (yearItem.data.groups === 'Silver') { return silvImgs.push({ name: yearItem.item.name }) }
      if (yearItem.data.groups === 'Bronze') { return bronzeImgs.push({ name: yearItem.item.name }) }
      if (yearItem.data.groups === "People's choice Awards") { return peopleChoiceImgs.push({ name: yearItem.item.name }) }
      if (yearItem.data.groups === 'Honorable mention') { return honorableImgs.push({ name: yearItem.item.name }) }
      if (yearItem.data.groups === 'Remarkable artwork') { return remarkableImgs.push({ name: yearItem.item.name }) }
      if (yearItem.data.groups === '1 place') { return firstImgs.push({ name: yearItem.item.name }) }
      if (yearItem.data.groups === '2 place') { return secondImgs.push({ name: yearItem.item.name }) }
      if (yearItem.data.groups === '3 place') { return thirdImgs.push({ name: yearItem.item.name }) }
    })
    const res = {
      year: +i,
      groups: [] as any[]
    }
    if (goldImgs.length) { res.groups.push({ type: 'Gold', images: goldImgs }) }
    if (silvImgs.length) { res.groups.push({ type: 'Silver', images: silvImgs }) }
    if (bronzeImgs.length) { res.groups.push({ type: 'Bronze', images: bronzeImgs }) }
    if (peopleChoiceImgs.length) { res.groups.push({ type: "People's choice Awards", images: peopleChoiceImgs }) }
    if (honorableImgs.length) { res.groups.push({ type: 'Honorable mention', images: honorableImgs }) }
    if (remarkableImgs.length) { res.groups.push({ type: 'Remarkable artwork', images: remarkableImgs }) }
    if (firstImgs.length) { res.groups.push({ type: '1 place', images: firstImgs }) }
    if (secondImgs.length) { res.groups.push({ type: '2 place', images: secondImgs }) }
    if (thirdImgs.length) { res.groups.push({ type: '3 place', images: thirdImgs }) }
    form.degress.push(res)
  }
}

const handleUpdate = async () => {
  const arr = []
  for await (const file of imageFiles.value) {
    arr.push(await uploadRef.value!.uploadToServer(file))
  }
  imagesToDegress(arr)
  if (await formRef.value?.validate()) {
    try {
      form.awards_avatar = await uploadAvatarRef.value!.uploadToServer() as PartialFileAdminApiDto
      await methods.handlePatch(id, toValue(form))

      await refreshNuxtData()

      await navigateTo(navigateBack.value)
    } catch (exc) {
      console.error(exc)
    }
  }
}

const onClickDelete = (e: Event) => {
  const btn = e.target as HTMLButtonElement
  btn.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'backspace', bubbles: true })
  )
}

onMounted(() => {
  imageFiles.value = form.degress.flatMap((item) => {
    return item.groups.flatMap(grp =>
      grp.images.map((img) => {
        awardImages.value[img.id] = {
          year: item.year,
          groups: grp.type
        }
        return {
          ...img,
          uid: img.id,
          edit: true
        }
      })
    )
  })
})

watch(
  () => imageFiles.value,
  (val) => {
    val.forEach((item) => {
      if (awardImages.value[item.uid]) { return }
      awardImages.value[item.uid] = {
        year: 2022,
        groups: 'Gold'
      }
    })
  }
)
</script>

<template>
  <AdminTemplateCardWithForm :title="titles.edit" :navigate-back="navigateBack">
    <AdminTemplateForm ref="formRef" :model="form" :rules="formRules">
      <ElFormItem label="Title" :prop="`translate.${currentIndexLocale}.title`">
        <ElInput v-model="form.translate[currentIndexLocale].title" />
      </ElFormItem>
      <ElFormItem
        label="Description"
        :prop="`translate.${currentIndexLocale}.description`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].description"
          :rows="5"
          type="textarea"
        />
      </ElFormItem>
      <ElFormItem required label="Award logo" prop="awards_avatar">
        <AdminUploadFile
          ref="uploadAvatarRef"
          v-model="form.awards_avatar"
          file-type="image"
        />
      </ElFormItem>
      <ElFormItem label="Images" prop="degress" required>
        <AdminUploadFile ref="uploadRef" v-model="imageFiles" :single="false">
          <template #default="{ file }: { file: UploadUserFile }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            >
            <div v-if="awardImages[file.uid!]" class="img" @keydown.stop>
              <div class="img__details">
                <ElFormItem label="Year" label-width="50">
                  <el-input-number
                    v-model="awardImages[file.uid!].year"
                    :min="1970"
                    :max="new Date().getFullYear()"
                    size="small"
                  />
                </ElFormItem>
                <ElFormItem label="Type" label-width="50">
                  <el-select
                    v-model="awardImages[file.uid!].groups"
                    class="m-2"
                    size="small"
                  >
                    <el-option
                      v-for="item in selectOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </ElFormItem>
              </div>
            </div>
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="onClickDelete"
            />
          </template>
        </AdminUploadFile>
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

<style scoped lang="scss">
.img {
  flex-grow: 1;
  margin-left: 1rem;
  h3 {
    font-size: 1.5rem;
  }
  &__details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &__sizes {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  button {
    padding-inline: 0.5rem;
  }
}
</style>
