<script lang="ts" setup>
interface SidebarItem {
  sortId: number;
  text: string;
  url: string;
  icon: string;
}

const sidebarItems: Array<SidebarItem> = [
  {
    sortId: 1,
    text: "Projects",
    url: "/admin/projects",
    icon: "ep:suitcase-line",
  },
  {
    sortId: 2,
    text: "News",
    url: "/admin/news",
    icon: "ep:tickets",
  },
  {
    sortId: 3,
    text: "Blogs",
    url: "/admin/blogs",
    icon: "ep:chat-line-square",
  },
].sort((a, b) => a.sortId - b.sortId);
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__logo">Dashboard</div>
    <ul class="sidebar__menu">
      <li v-for="sidebarItem in sidebarItems" :key="sidebarItem.sortId">
        <NuxtLink
          class="sidebar__menu-item"
          active-class="sidebar__menu-item_active"
          :to="sidebarItem.url"
        >
          <!-- <Icon
            class="sidebar__menu-item-icon"
            :name="sidebarItem.icon"
            size="18px"
          /> -->
          {{ sidebarItem.text }}
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  background-color: #304156;
  overflow: hidden;

  &__logo {
    display: flex;
    align-items: center;
    height: 50px;
    position: relative;
    padding-left: 20px;
    line-height: 56px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    background-color: #1f2d3d;
  }

  &__menu {
    &-item {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding-left: 20px;
      height: 56px;
      font-size: 14px;
      transition: border-color 0.3s, background-color 0.3s, color 0.3s;
      color: #bfcbd9;

      &:hover {
        background-color: #263445;
      }
      &-icon {
        margin-right: 16px;
      }
      &_active {
        background-color: #409eff;
        color: #f4f4f5;
        font-weight: bold;

        &:hover {
          background-color: #409eff;
        }
      }
    }
  }
}
</style>
