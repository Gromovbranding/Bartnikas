export default defineNuxtRouteMiddleware(async (to) => {
  const { accessToken } = useAdmin();

  // if (~to.path.indexOf("admin")) {
  //   const { fetchGet } = useApi();

  //   try {
  //     await fetchGet("auth/me");

  //     if (to.name === "admin-login") {
  //       return await navigateTo("/admin/projects");
  //     }
  //   } catch {
  //     if (to.name !== "admin-login") {
  //       return await navigateTo("/admin/login");
  //     }
  //   }
  // }

  // const { fetchGet } = useApi();

  if (!accessToken.value) {
    if (to.name !== "admin-login") {
      return await navigateTo("/admin/login");
    }
  }

  return true;
});
