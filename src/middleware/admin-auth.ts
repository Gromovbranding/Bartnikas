export default defineNuxtRouteMiddleware(() => {
  const { accessToken } = useAdmin();
  if (!accessToken) {
    return navigateTo("/admin/login");
  }
});
