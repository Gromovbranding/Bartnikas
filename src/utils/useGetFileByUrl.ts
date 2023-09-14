export const useGetFileByUrl = (name: string) => {
  return `${useRuntimeConfig().public.apiFilesUrl}/${name}`;
};
