export const useApi = () => {
  const config = useRuntimeConfig().public;
  const { accessToken } = useAdmin();
  const route = useRoute();

  const fetchApi = async <T>(
    path: string,
    method: "GET" | "POST" | "DELETE" | "PATCH",
    body: any = {}
  ) => {
    const fetchConfig = {
      baseURL: config.apiBaseUrl,
      method,
      headers: {},

      async onResponseError({ response }) {
        // ElNotification.error({
        //   title: "Error",
        //   message: response.statusText,
        //   position: "bottom-right",
        // });

        if (response.status === 401) {
          accessToken.value = "";
          route.name !== "admin-login" && (await navigateTo("/admin/login"));
        }
      },
    };

    if (accessToken.value) {
      fetchConfig.headers.Authorization = `Bearer ${accessToken.value}`;
    }

    if (Object.keys(body).length > 0) {
      fetchConfig.body = body;
    }

    return await $fetch<T>(path, fetchConfig);
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
    accessToken.value = "";
    await navigateTo("/admin/login");
  };

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const data = await fetchPost<{ access_token: string }>("/auth/login", {
      username,
      password,
    });

    if (data.access_token) {
      accessToken.value = data.access_token;
      await navigateTo("/admin/projects");
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
