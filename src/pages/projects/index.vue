<script lang="ts" setup>
// import { IProject } from "~/types/admin-api";
import { projects } from "~/assets/data";

// const { fetchGet } = useApi();

// const { data: projects } = useAsyncData<IProject[]>(
//   "projects",
//   async () => await fetchGet("/projects")
// );
</script>

<template>
  <main>
    <Title> Projects </Title>
    <AppPageHead title="Projects" />
    <section class="projects">
      <AppPortItem
        v-for="(project, idx) in projects"
        :key="project.id"
        :project="project"
        :direction="idx % 2 ? 'row-reverse' : 'row'"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.projects {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
