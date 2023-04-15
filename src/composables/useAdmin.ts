export const useAdmin = () => {
  const accessToken = ref("");

  const setAccessToken = (token: string) => {
    accessToken.value = token;
  };

  const clearAccessToken = (): void => {
    accessToken.value = "";
  };

  return {
    accessToken,
    setAccessToken,
    clearAccessToken,
  };
};
