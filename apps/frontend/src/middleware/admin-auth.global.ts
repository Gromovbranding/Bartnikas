export default defineNuxtRouteMiddleware(async (to) => {
  console.log(to);
  if (~to.path.indexOf('admin')) {
    const { fetchGet } = useApi()

    try {
      await fetchGet('auth/me')

      if (~(to.name as string).indexOf('admin-login')) {
        return await navigateTo('/admin/projects')
      }
    } catch {
      if (!~(to.name as string).indexOf('admin-login')) {
        return await navigateTo('/admin/login')
      }
    }
  }

  return true
})
