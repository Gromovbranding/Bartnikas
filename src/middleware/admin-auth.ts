import { useAdminStore } from "~/stores/admin";

export default defineNuxtRouteMiddleware(() => {
  const adminStore = useAdminStore();
  if (!adminStore.accessToken) {
    return navigateTo("/admin/login");
  }
});
