import { defineStore } from "pinia";

export const useAdminStore = defineStore("admin", () => {
  const pageName = ref("Admin Panel");
  const setPageName = (name: string) => {
    pageName.value = name;
  };

  return { pageName, setPageName };
});
