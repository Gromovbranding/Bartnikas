export const useAdmin = () => {
  const { fetchPost } = useApi();
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

  const logout = async () => {
    clearAccessToken();
    await navigateTo("/admin/login");
  };

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    return await fetchPost("/auth/login", {
      username,
      password,
    });
  };

  return {
    setPageName,
    accessToken,
    setAccessToken,
    clearAccessToken,
    pageName,
    logout,
    login,
  };
};
