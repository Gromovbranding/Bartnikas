<script lang="ts" setup></script>

<template>
  <div class="admin-auth-layout">
    <main class="admin-auth-layout__main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/admin/config-reset.scss";
.admin-auth-layout {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;

  &__main {
  }
}
</style>
