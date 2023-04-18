export default defineNuxtRouteMiddleware((to) => {
  const { accessToken } = useAdmin();

  if (!accessToken.value && to.name !== "admin-login") {
    return navigateTo("/admin/login");
  }
});
