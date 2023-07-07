<script setup lang="ts" generic="T extends Record<string, T>">
import type { FormRules, FormInstance } from "element-plus";

const props = defineProps<{
  navigateBack: string;
  headTitle: string;
  ruleForm: T;
  rulesForm: FormRules;
  type: "update" | "create";
}>();

const emits = defineEmits<{
  (emit: "create", data: T): void;
  (emit: "update", data: T): void;
  (emit: "delete"): void;
}>();

const modelForm = ref<Record<string, T>>();
const modelRulesForm = reactive(toValue(props.rulesForm));
const formRef = ref<FormInstance>();

watchEffect(() => {
  modelForm.value = toValue(props.ruleForm) as Record<string, T>;
});

const handleResetForm = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
};

const formValidate = async () => {
  if (!formRef.value) return;

  return await formRef.value.validate();
};

const handleCreate = async () => {
  if (await formValidate()) {
    emits("create", modelForm.value as T);
  }
};

const handleUpdate = async () => {
  if (await formValidate()) {
    emits("update", modelForm.value as T);
  }
};

const handleDelete = () => {
  emits("delete");
};
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span style="text-transform: capitalize">
          {{ headTitle }}
        </span>
        <ElButton
          v-if="navigateBack"
          type="default"
          plain
          @click="navigateTo(`/admin/${navigateBack}`)"
        >
          Back
        </ElButton>
      </div>
    </template>

    <ClientOnly>
      <ElForm
        ref="formRef"
        status-icon
        scroll-to-error
        label-width="120px"
        :model="modelForm"
        :rules="modelRulesForm"
      >
        <slot></slot>
        <ElFormItem>
          <template v-if="type === 'create'">
            <ElButton type="primary" @click="handleCreate"> Create </ElButton>
            <ElButton @click="handleResetForm"> Clear </ElButton>
          </template>
          <template v-else-if="type === 'update'">
            <ElButton type="primary" @click="handleUpdate"> Update </ElButton>
            <ElButton @click="handleDelete"> Delete </ElButton>
          </template>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
