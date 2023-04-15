<script lang="ts" setup>
definePageMeta({
  middleware: ["admin-auth"],
});

const { pageName } = useAdmin();
</script>

<template>
  <div class="admin-layout">
    <AdminSidebar class="admin-layout__sidebar" />
    <AdminHeader class="admin-layout__header" />
    <main class="admin-layout__main">
      <el-card>
        <template #header>
          <div class="admin-layout__main-header">
            <client-only>
              <h1>{{ pageName }}</h1>
            </client-only>
          </div>
        </template>
        <slot />
      </el-card>
      <span class="admin-layout__main-footer">
        Stanislav Bartnikas♥ Art. Energy. Earth.
      </span>
    </main>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/admin/config-reset.scss";
.admin-layout {
  position: relative;
  min-height: 100vh;
  display: flex;

  &__sidebar {
    width: 210px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    z-index: 1000;
  }

  &__header {
    height: 50px;
    position: fixed;
    top: 0;
    left: 210px;
    right: 0;
    overflow: hidden;
    z-index: 1001;
  }

  &__main {
    min-height: calc(100% - 50px);
    width: calc(100% - 210px);
    margin: 50px 0 0 210px;
    padding: 20px 20px 60px;
    background: #f5f7f9;

    &-header {
      font-size: 18px;
      font-weight: bold;
    }

    &-footer {
      position: absolute;
      bottom: 0;
      left: 210px;
      right: 0;
      color: #a8abb2;
      text-align: center;
      line-height: 50px;
    }
  }
}
</style>
