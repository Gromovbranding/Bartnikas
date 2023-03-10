import { defineStore } from "pinia";

export const useAdminStore = defineStore(
  "admin",
  () => {
    const pageName = ref("Admin Panel");
    const setPageName = (name: string) => {
      pageName.value = name;
    };

    const accessToken = ref("");
    const setAccessToken = (token: string) => {
      accessToken.value = token;
    };
    const clearAccessToken = () => {
      accessToken.value = "";
    };

    return {
      pageName,
      setPageName,
      accessToken,
      setAccessToken,
      clearAccessToken,
    };
  },
  {
    persist: true,
    paths: ["accessToken"],
  }
);
