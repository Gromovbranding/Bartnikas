export const useAdmin = () => {
  const accessToken = useCookie<string>("accessToken");

  return {
    accessToken,
  };
};
