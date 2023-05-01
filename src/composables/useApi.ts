import { UploadUserFile } from "element-plus";

export const useApi = () => {
  const config = useRuntimeConfig().public;
  const { accessToken } = useAdmin();
  const route = useRoute();

  const fetchApi = async <T>(
    path: string,
    method: "GET" | "POST" | "DELETE" | "PATCH",
    body: any = null,
    customConfigFetch: any = {}
  ) => {
    const fetchConfig = {
      baseURL: config.apiBaseUrl,
      method,
      headers: {},
      ...customConfigFetch,

      async onResponseError({ response }) {
        ElNotification.error({
          title: response._data.error,
          message: response._data.message,
          position: "bottom-right",
        });

        if (response.status === 401) {
          accessToken.value = "";
          route.name !== "admin-login" && (await navigateTo("/admin/login"));
        }
      },

      onResponse({ response }) {
        if (response.status === 201 && !response.url.match(/multiple/)) {
          ElNotification.success({
            title: "Success",
            message: response.statusText,
            position: "bottom-right",
          });
        }
      },
    };

    if (accessToken.value) {
      fetchConfig.headers.Authorization = `Bearer ${accessToken.value}`;
    }

    if (body) {
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

  const fetchPost = async <T>(path: string, body: any = null) => {
    return await fetchApi<T>(path, "POST", body);
  };

  const fetchUpdate = async <T>(path: string) => {
    return await fetchApi<T>(path, "GET");
  };

  const fetchGetImage = async (name: string) => {
    return await fetchApi<Blob>(`/files/${name}`, "GET", null, {
      responseType: "blob",
    });
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

  const fetchPostCreateByRouteWithImages = async (
    url: string,
    body: any = null,
    images: UploadUserFile[]
  ) => {
    const formData = new FormData();

    images.forEach((image) => {
      formData.append("files", image.raw as Blob, image.name);
    });

    const imagesSaved = await fetchPost("/files/multiple", formData);

    await fetchPost(url, {
      ...body,
      images: imagesSaved,
    });
  };

  const fetchGetImages = async (images: { name: string }[]) => {
    return await Promise.all(
      (images ?? []).map(async ({ name }) => {
        const blob = await fetchGetImage(name);
        const file = new File([blob], name, {
          type: blob.type,
        });

        return {
          raw: file,
          name,
          size: file.size,
        };
      })
    );
  };

  return {
    fetchDelete,
    fetchPost,
    fetchUpdate,
    fetchGet,
    logout,
    login,
    fetchPostCreateByRouteWithImages,
    fetchGetImages,
  };
};
