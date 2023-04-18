export const useAdmin = () => {
  const accessToken = ref("");
  const pageName = ref("Admin Panel");

  const setPageName = (name: string) => {
    pageName.value = name;
  };

  const setAccessToken = (token: string) => {
    accessToken.value = token;
  };

  const clearAccessToken = (): void => {
    accessToken.value = "";
  };

  return {
    setPageName,
    accessToken,
    setAccessToken,
    clearAccessToken,
    pageName,
  };
};
