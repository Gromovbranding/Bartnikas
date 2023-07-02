export default defineNuxtRouteMiddleware(async (to) => {
  const { fetchGet } = useApi();

  try {
    await fetchGet("auth/me");
  } catch {
    if (to.name !== "admin-login") {
      return await navigateTo("/admin/login");
    }
  }
});
