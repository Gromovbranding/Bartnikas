export const useGetFileByUrl = (name: string | undefined | null) => {
  if (!name) {
    return undefined
  }

  return `${useRuntimeConfig().public.apiFilesUrl}/${name}`
}
