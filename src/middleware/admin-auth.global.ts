export default defineNuxtRouteMiddleware(async (to) => {
  if (((to.name ?? "") as string).startsWith("admin")) {
    const { fetchGet } = useApi();

    try {
      await fetchGet("auth/me");
    } catch {
      if (to.name !== "admin-login") {
        return navigateTo("/admin/login");
      }
    }
  }
});
