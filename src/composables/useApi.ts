import { UploadUserFile } from "element-plus";
import type { NitroFetchOptions } from "nitropack";

export const useApi = () => {
  const config = useRuntimeConfig().public;
  const { accessToken } = useAdmin();
  // const route = useRoute();

  const fetchApi = async <T>(
    path: string,
    method: "GET" | "POST" | "DELETE" | "PATCH",
    body: any = null,
    customConfigFetch: any = {}
  ) => {
    const requestHeaders: HeadersInit = new Headers();

    if (accessToken.value) {
      requestHeaders.set("Authorization", `Bearer ${accessToken.value}`);
    }

    if (!body) {
      requestHeaders.set("Content-Type", "application/json");
    }

    const fetchConfig: Partial<NitroFetchOptions<any>> = {
      baseURL: config.apiBaseUrl,
      method,
      headers: requestHeaders,
      ...customConfigFetch,

      async onResponseError({ response }) {
        let message = response._data.message;

        if (Array.isArray(message)) message = message.join("\n");

        ElNotification.error({
          message,
          title: response._data.error,
          position: "bottom-right",
        });

        if (response.status === 401) {
          accessToken.value = "";
          if (response.url !== "admin-login") await navigateTo("/admin/login");
        }
      },

      onResponse() {
        // if (response.status === 200 && !response.url.match(/files/)) {
        //   ElNotification.success({
        //     title: "Success",
        //     message: response.statusText,
        //     position: "bottom-right",
        //   });
        // }
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

  const fetchUploadFile = async (file: { raw: Blob | File; name: string }) => {
    const formData = new FormData();
    formData.append("file", file.raw, file.name);
    return await fetchPost<{ name: string }>("files", formData);
  };

  const fetchUploadFileByAdmin = async (
    files: UploadUserFile[],
    single = false
  ) => {
    if (single) {
      return await fetchUploadFile({
        raw: files[0].raw as Blob | File,
        name: files[0].name,
      });
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files[]", file.raw as File | Blob, file.name);
    });

    return await fetchPost<{ name: string }[]>("files/multiple", formData);
  };

  const fetchRemoveImage = async (filename: string) => {
    return await fetchDelete(`files/${filename}`);
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
    fetchGet,
    fetchPatch,

    fetchUploadFileByAdmin,
    fetchRemoveImage,

    logout,
    login,
  };
};
