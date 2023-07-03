<template>
  <div class="admin-layout">
    <AdminSidebar class="admin-layout__sidebar" />
    <AdminHeader class="admin-layout__header" />
    <main class="admin-layout__main">
      <slot />
    </main>
    <footer class="admin-layout__main-footer">
      <p>Stanislav Bartnikas♥ Art. Energy. Earth.</p>
    </footer>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/admin/_config.scss";

.admin-layout {
  position: relative;
  min-height: 100vh;
  display: flex;

  img {
    pointer-events: initial;
  }
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

.card-header {
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
