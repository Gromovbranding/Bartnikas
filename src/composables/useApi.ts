import type { NitroFetchOptions } from "nitropack";
import type { IFile } from "~/types/admin-api";

export const useApi = () => {
  const config = useRuntimeConfig();
  const { accessToken } = useAdmin();
  const route = useRoute();

  const fetchApi = async <T>(
    path: string,
    method: "GET" | "POST" | "DELETE" | "PATCH",
    body: any = null,
    customConfigFetch: any = {}
  ) => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");

    if (accessToken.value) {
      requestHeaders.set("Authorization", `Bearer ${accessToken.value}`);
    }

    const fetchConfig: Partial<NitroFetchOptions<any>> = {
      baseURL: config.apiBaseUrl,
      method,
      headers: requestHeaders,
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
        if (response.status === 201 && !response.url.match(/files/)) {
          ElNotification.success({
            title: "Success",
            message: response.statusText,
            position: "bottom-right",
          });
        }
      },
    };

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

  const fetchPatch = async <T>(path: string, body: any = null) => {
    return await fetchApi<T>(path, "PATCH", body);
  };

  const fetchGetImage = async (name: string) => {
    return await fetchApi<Blob>(`/files/${name}`, "GET", null, {
      responseType: "blob",
    });
  };

  const fetchUploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image as File, image.name);
    return await fetchPost<IFile>("files", formData);
  };

  const fetchRemoveImage = async (id: number) => {
    return await fetchDelete(`files/${id}`);
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

  const fetchGetImages = async (images: { name: string; url: string }[]) => {
    return await Promise.all(
      (images ?? []).map(async ({ name, url }) => {
        const blob = await fetchGetImage(name);
        const file = new File([blob], name, {
          type: blob.type,
        });

        return {
          raw: file,
          size: file.size,
          name,
          url,
        };
      })
    );
  };

  return {
    fetchDelete,
    fetchPost,
    fetchGet,
    logout,
    login,
    fetchGetImages,
    fetchUploadImage,
    fetchRemoveImage,
    fetchGetImage,
    fetchPatch,
  };
};
