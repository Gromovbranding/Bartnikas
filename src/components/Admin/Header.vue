<script lang="ts" setup>
const logout = () => {
  console.log("logout");
};
</script>

<template>
  <header class="header">
    <div class="header__left">Admin Panel</div>
    <div class="header__right">
      <el-dropdown trigger="click">
        <template #default>
          <el-avatar :size="32" src="/images/profile.png" />
        </template>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item>
              <NuxtLink to="/" target="_blank">Home</NuxtLink>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  background: #fff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

  &__left {
    font-size: 18px;
  }
  &__right {
    display: flex;
    cursor: pointer;
  }
}
</style>
