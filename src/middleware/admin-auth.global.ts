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

  if (!accessToken.value) {
    if (!~(to.name as string).indexOf("admin-login")) {
      return await navigateTo("/admin/login");
    }
  } else {
    const { fetchGet } = useApi();
    try {
      await fetchGet("auth/me");
    } catch {
      if (~(to.name as string).indexOf("admin-login")) {
        return await navigateTo("/admin/login");
      }
    }
  }

  return true;
});
