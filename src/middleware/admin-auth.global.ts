export default defineNuxtRouteMiddleware(() => {
  // const { accessToken } = useAdmin();

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

  // if (to.name) {
  //   if (!accessToken.value) {
  //     if (!~(to.name as string).indexOf("admin-login")) {
  //       return await navigateTo(useLocaleRoute()("/admin/login"));
  //     }
  //   } else {
  //     const { fetchGet } = useApi();

  //     if (~(to.name as string).indexOf("admin-login")) {
  //       return await navigateTo(useLocaleRoute()("/"));
  //     }
  //     try {
  //       await fetchGet("auth/me");
  //     } catch {
  //       if (!~(to.name as string).indexOf("admin-login")) {
  //         return await navigateTo(useLocaleRoute()("/admin/login"));
  //       }
  //     }
  //   }
  // }

  return true;
});
