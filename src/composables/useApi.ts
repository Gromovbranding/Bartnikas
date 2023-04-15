export const useApi = () => {
  const config = useRuntimeConfig();
  const { accessToken, setAccessToken, clearAccessToken } = useAdmin();

  const fetchApi = async <T>(
    path: string,
    method: "POST" | "GET" | "DELETE" | "PATCH",
    body: any = {}
  ) => {
    return await useFetch<T>(`${config.apiBaseUrl}${path}`, {
      method,
      body,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

      async onResponse({ response }) {
        if (response._data.access_token) {
          setAccessToken(response._data.access_token);
          await navigateTo("/admin");
        }

        return response._data;
      },

      async onResponseError({ response }) {
        ElNotification.error({
          title: "Error",
          message: response.statusText,
          position: "bottom-right",
        });

        if (response.status === 401) {
          clearAccessToken();
          await navigateTo("/admin/login");
        }
      },
    });
  };

  const fetchDelete = async (path: string) => {
    return await fetchApi(path, "DELETE");
  };

  const fetchPost = async (path: string) => {
    return await fetchApi(path, "POST");
  };

  const fetchUpdate = async (path: string) => {
    return await fetchApi(path, "GET");
  };

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    return await fetchApi("/auth/login", "POST", {
      username,
      password,
    });
  };

  return {
    login,
    fetchDelete,
    fetchPost,
    fetchUpdate,
  };
};
