export const useApi = () => {
  const config = useRuntimeConfig().public;
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

      onResponseError({ response }) {
        if (response.status === 401) {
          clearAccessToken();
        }
      },
    });
  };

  const fetchDelete = async <T>(path: string) => {
    return await fetchApi<T>(path, "DELETE");
  };

  const fetchGet = async <T>(path: string) => {
    return await fetchApi<T>(path, "GET");
  };

  const fetchPost = async <T>(path: string, body: any = {}) => {
    return await fetchApi<T>(path, "POST", body);
  };

  const fetchUpdate = async <T>(path: string) => {
    return await fetchApi<T>(path, "GET");
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
    const { data } = await fetchPost<{ access_token: string } | null>(
      "/auth/login",
      {
        username,
        password,
      }
    );

    if (data.value?.access_token) {
      setAccessToken(data.value.access_token);
    }
  };

  return {
    fetchDelete,
    fetchPost,
    fetchUpdate,
    fetchGet,
    logout,
    login,
  };
};
