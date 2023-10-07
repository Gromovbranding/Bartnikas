<script lang="ts" setup>
import ProfileAvatar from "@/assets/img/profile.png";

const sidebarItems: {
  sortId: number;
  text: string;
  url: string;
  icon: string;
}[] = [
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
  {
    sortId: 4,
    text: "Contacts",
    url: "/admin/contacts",
    icon: "ep:chat-line-square",
  },
  {
    sortId: 5,
    text: "Video Collection",
    url: "/admin/videos",
    icon: "ep:chat-line-square",
  },
  {
    sortId: 5,
    text: "Testimonials",
    url: "/admin/testimonials",
    icon: "ep:chat-line-square",
  },
  {
    sortId: 6,
    text: "Awards",
    url: "/admin/awards",
    icon: "ep:chat-line-square",
  },
  {
    sortId: 7,
    text: "Statement",
    url: "/admin/greetings",
    icon: "ep:chat-line-square",
  },
  {
    sortId: 8,
    text: "Media",
    url: "/admin/media",
    icon: "ep:chat-line-square",
  },
  {
    sortId: 9,
    text: "FAQ",
    url: "/admin/faq",
    icon: "ep:chat-line-square",
  },
  {
    sortId: 10,
    text: "About me",
    url: "/admin/bio",
    icon: "ep:chat-line-square",
  },
  {
    sortId: 11,
    text: "Payment & Delivery",
    url: "/admin/delivery-static",
    icon: "ep:chat-line-square",
  },
  {
    sortId: 12,
    text: "Terms & Condition",
    url: "/admin/terms-static",
    icon: "ep:chat-line-square",
  },
  {
    sortId: 13,
    text: "Ordered By Email",
    url: "/admin/ordered-by-email",
    icon: "ep:chat-line-square",
  },
].sort((a, b) => a.sortId - b.sortId);
const { logout } = useApi();
</script>

<template>
  <div class="admin-layout">
    <ElContainer>
      <ElAside class="admin-layout__sidebar" width="250px">
        <div class="admin-layout__sidebar-dashboard">Dashboard</div>
        <ul class="admin-layout__sidebar-menu">
          <li v-for="sidebarItem in sidebarItems" :key="sidebarItem.sortId">
            <NuxtLink
              class="admin-layout__sidebar-item"
              active-class="admin-layout__sidebar-item--active"
              :to="sidebarItem.url"
            >
              <ElIcon color="#fff" size="24">
                <ElIconTickets class="admin-layout__sidebar-icon" />
              </ElIcon>
              <span>
                {{ sidebarItem.text }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </ElAside>
      <ElContainer>
        <ElHeader class="admin-layout__header" height="75px">
          <h1>Admin Panel</h1>
          <el-dropdown class="admin-layout__profile" trigger="click">
            <template #default>
              <el-avatar :size="32" :src="ProfileAvatar" />
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
        </ElHeader>

        <ElMain>
          <NuxtPage />
        </ElMain>
        <ElFooter class="admin-layout__footer">
          <p>Stanislav Bartnikas ♥ Art. Energy. Earth.</p>
        </ElFooter>
      </ElContainer>
    </ElContainer>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/reset";
@import "@/assets/styles/fonts";

body {
  font-family: "HelveticaNeue", Arial, sans-serif;
  font-weight: normal;
}

.admin-layout {
  background: #f5f7f9;
  height: 100vh;

  .el-container {
    height: 100%;
  }

  &__sidebar {
    background-color: #304156;
    overflow: hidden auto;

    &-dashboard {
      background-color: #1f2d3d;
      color: #fff;
      font-size: 18px;
      font-weight: 400;
      padding: 10px 20px;
      line-height: 56px;
      position: relative;
    }

    &-menu {
      width: 100%;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &-item {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      padding: 25px 20px;
      cursor: pointer;
      text-decoration: none;
      transition: border-color 0.3s, background-color 0.3s, color 0.3s;

      &--active {
        background-color: #409eff;
        color: #f4f4f5;
        font-weight: bold;

        &:hover {
          background-color: #409eff;
        }
      }

      &:hover {
        background-color: #263445;
      }

      span {
        font-size: 18px;
        color: #bfcbd9;
      }
    }
  }

  &__header {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  }

  &__footer {
    text-align: center;

    p {
      line-height: 50px;
      color: #a8abb2;
    }
  }
}
</style>
