<script lang="ts" setup>
const config = useRuntimeConfig();

const projects = ref([]);
const fetchProjects = async () => {
  const { data } = await useFetch(`${config.apiBaseUrl}/projects`);
  projects.value = data.value;
};

fetchProjects();
</script>

<template>
  <main>
    <Title> Projects </Title>
    <AppPageHead title="Projects" />
    <section v-if="projects?.length" class="projects">
      <AppPortItem
        v-for="(project, idx) in projects"
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
