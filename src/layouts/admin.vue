<script lang="ts" setup>
import ProfileAvatar from "@/assets/img/profile.png";

const sidebarItems: {
  text: string;
  url: string;
  icon: string;
}[] = [
  {
    text: "Index Slider",
    url: "/admin/index-slider",
    icon: "ep:suitcase-line",
  },
  {
    text: "General Info",
    url: "/admin/general-info",
    icon: "ep:suitcase-line",
  },
  {
    text: "Projects",
    url: "/admin/projects",
    icon: "ep:suitcase-line",
  },
  {
    text: "News",
    url: "/admin/news",
    icon: "ep:tickets",
  },
  {
    text: "Blogs",
    url: "/admin/blogs",
    icon: "ep:chat-line-square",
  },
  {
    text: "Contacts",
    url: "/admin/contacts",
    icon: "ep:chat-line-square",
  },
  {
    text: "Video Collection",
    url: "/admin/videos",
    icon: "ep:chat-line-square",
  },
  {
    text: "Testimonials",
    url: "/admin/testimonials",
    icon: "ep:chat-line-square",
  },
  {
    text: "Awards",
    url: "/admin/awards",
    icon: "ep:chat-line-square",
  },
  {
    text: "Concept",
    url: "/admin/greetings",
    icon: "ep:chat-line-square",
  },
  {
    text: "Media",
    url: "/admin/media",
    icon: "ep:chat-line-square",
  },
  {
    text: "FAQ",
    url: "/admin/faq",
    icon: "ep:chat-line-square",
  },
  {
    text: "About me",
    url: "/admin/bio",
    icon: "ep:chat-line-square",
  },
  {
    text: "Terms & Condition",
    url: "/admin/terms-static",
    icon: "ep:chat-line-square",
  },
  {
    text: "Ordered By Email",
    url: "/admin/ordered-by-email",
    icon: "ep:chat-line-square",
  },
  {
    text: "Reviews about me",
    url: "/admin/bio-testimonials",
    icon: "ep:chat-line-square",
  },
  {
    text: "Footer contacts",
    url: "/admin/footer-contacts",
    icon: "ep:chat-line-square",
  },
];
const { logout } = useApi();
const search = ref("");

const filterBySearchSidebar = computed(() => {
  return sidebarItems.filter((item) => {
    if (!search.value) return true;

    return !!~item.text.toLowerCase().indexOf(search.value.toLowerCase());
  });
});
</script>

<template>
  <div class="admin-layout">
    <ElContainer>
      <ElAside class="admin-layout__sidebar" width="250px">
        <div class="admin-layout__sidebar-dashboard">Dashboard</div>
        <ElInput v-model="search" placeholder="Find menu" clearable />
        <ul class="admin-layout__sidebar-menu">
          <li
            v-for="sidebarItem in filterBySearchSidebar"
            :key="sidebarItem.url"
          >
            <NuxtLink
              class="admin-layout__sidebar-item"
              active-class="admin-layout__sidebar-item--active"
              :to="useLocalePath()(sidebarItem.url)"
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
                  <NuxtLink :to="useLocalePath()('/')" target="_blank">
                    Home
                  </NuxtLink>
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
