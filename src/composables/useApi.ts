export const useApi = () => {
  const config = useRuntimeConfig();
  const { accessToken, setAccessToken, clearAccessToken } = useAdmin();

  const fetchApi = async (
    path: string,
    method: "POST" | "GET" | "DELETE" | "PATCH",
    body: any = {}
  ) => {
    try {
      return await $fetch(`${config.apiBaseUrl}${path}`, {
        method,
        body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (exc) {
      ElNotification.error({
        title: "Error",
        message: exc,
        position: "bottom-right",
      });

      if (exc.status === 401) {
        clearAccessToken();
        await navigateTo("/admin/login");
      }
    }
  };

  const fetchDelete = async (path: string) => {
    try {
      await fetchApi(path, "DELETE");
    } catch (exc) {
      console.log(exc);
    }
  };

  const fetchPost = async (path: string) => {
    try {
      await fetchApi(path, "POST");
    } catch (exc) {
      console.log(exc);
    }
  };

  const fetchUpdate = async (path: string) => {
    try {
      return await fetchApi(path, "GET");
    } catch (exc) {
      console.log(exc);
    }
  };

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const { data } = await fetchApi("/auth/login", "POST", {
        username,
        password,
      });

      if (data.value?.access_token) {
        setAccessToken(data.value.access_token);
        await navigateTo("/admin");
      }
    } catch (exc) {
      console.log(exc);
    }
  };

  return {
    login,
    fetchDelete,
    fetchPost,
    fetchUpdate,
  };
};
