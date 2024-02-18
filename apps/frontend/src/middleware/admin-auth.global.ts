export default defineNuxtRouteMiddleware(async (to) => {
  if (~to.path.indexOf('admin') !== 0) {
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
