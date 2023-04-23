<script lang="ts" setup>
import { projects as list } from '~/assets/data';
const { fetchGet } = useApi();

const projects = ref([]);
const fetchProjects = async () => {
  const { data } = await fetchGet("/projects");
  projects.value = data.value as [];
};

fetchProjects();
</script>

<template>
  <main>
    <Title> Projects </Title>
    <AppPageHead title="Projects" />
    <section v-if="list?.length" class="projects">
      <AppPortItem
        v-for="(project, idx) in list"
        :key="project?.id"
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
