export default defineNuxtRouteMiddleware(async (to) => {
  if (~to.path.indexOf('admin')) {
    if (to.matched.length > 0) {
      try {
        const { fetchGet } = useApi()
        await fetchGet('auth/me')

        if (~(to.path as string).indexOf('/admin/login')) {
          return await navigateTo('/admin/projects')
        }
      } catch {
        if (!~(to.path as string).indexOf('/admin/login')) {
          return await navigateTo('/admin/login')
        }
      }
    }
    return false
  }

  return true
})
