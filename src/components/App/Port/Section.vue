<script setup lang="ts">
import type { IProject } from "~/types/admin-api";

const { getAllProjects } = usePublicData();

const { data: projects } = await useAsyncData<IProject[]>(
  "projects",
  async () => await getAllProjects()
);
</script>

<template>
  <section class="projects">
    <AppPortItem
      v-for="(project, idx) in projects"
      :key="project.id + 'project'"
      :project="project"
      :direction="idx % 2 ? 'row-reverse' : 'row'"
    />
  </section>
</template>

<style lang="scss" scoped>
.projects {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 30px;
}
</style>
