import { FormInstance, FormRules } from "element-plus";
import {
  PartialAdminApiDto,
  IArticle,
  IAwards,
  IBlog,
  IGreetingIndex,
  IProject,
  ITestimonial,
  IVideoCollection,
  IProjectCollab,
} from "types/admin-api";

export const useAdmin = () => {
  const accessToken = useCookie<string>("accessToken");

  const createTitle = (type: "create" | "edit" = "create", title: string) => {
    return type === "create" ? `Create new ${title}` : `Edit ${title}`;
  };

  const createByData = async <RecordModel, Model>(
    data: RecordModel,
    path: string,
    options: {
      isUploadImage: boolean;
      uploadImageFieldName: string;
      isUploadSingle: boolean;
    } = {
      isUploadImage: true,
      isUploadSingle: true,
      uploadImageFieldName: "image",
    }
  ) => {
    const { fetchPost, fetchUploadFileByAdmin } = useApi();

    if (options.isUploadImage) {
      data[options.fieldName] = await fetchUploadFileByAdmin(
        data[options.fieldName],
        options.isUploadSingle
      );
    }

    return await fetchPost<Model>(`/${path}`, data);
  };

  // const makeFn = <RecordModel, Model>(path: string) => {
  //   const {
  //     fetchGet,
  //     fetchPatch,
  //     fetchPost,
  //     fetchDelete,
  //     fetchUploadFileByAdmin,
  //   } = useApi();

  //   const fById = async (id: number) => await fetchGet<Model>(`/${path}/${id}`);

  //   const fCreate = async (data: RecordModel) => {
  //     data[options.fieldName] = await fetchUploadFileByAdmin(
  //       data[options.fieldName]
  //     );

  //     return await fetchPost<Model>(`/${path}`, toValue(data));
  //   };

  //   const fPatch = async (id: number, data: RecordModel) =>
  //     await fetchPatch<Model>(`/${path}/${id}`, toValue(data));

  //   const fDelete = async (id: number) =>
  //     await fetchDelete<Model>(`/${path}/${id}`);

  //   return {
  //     titles: {
  //       create: createTitle("create", "Article"),
  //       edit: createTitle("edit", "Article"),
  //     },
  //     // formRules,

  //     methods: {
  //       fById,
  //       fCreate,
  //       fPatch,
  //       fDelete,
  //     },
  //   };
  // };

  const updateByData = async <Model>(path: string, id: string | number) => {
    const { fetchGet } = useApi();

    const model = await fetchGet<Model>(`/${path}/${id}`);

    const handlePatch = async <RecordModel>(data: RecordModel) => {
      const { fetchPatch } = useApi();

      return await fetchPatch<Model>(`/${path}/${id}`, data);
    };

    const handleDelete = async () => {
      const { fetchDelete } = useApi();

      return await fetchDelete<Model>(`/${path}/${id}`);
    };

    return {
      handlePatch,
      handleDelete,
      model,
    };
  };

  const resetForm = (formRef: FormInstance | undefined) => {
    if (!formRef) return;

    formRef.resetFields();
  };

  const validateForm = async (formRef: FormInstance | undefined) => {
    if (!formRef) return;

    return await formRef.validate();
  };

  const makeFetchersForIndexCard = <T>(
    pathFrontend: string,
    pathServer?: string
  ) => {
    pathFrontend = pathFrontend.toLowerCase();

    if (pathServer) {
      pathServer = pathServer.toLowerCase();
    } else {
      pathServer = pathFrontend;
    }

    const { fetchGet, fetchDelete } = useApi();
    const {
      refresh,
      data: entities,
      ...data
    } = useAsyncData<T[]>(
      "entities",
      async () => await fetchGet<T[]>(`/${pathServer}`)
    );

    const handleCreate = async () => {
      await navigateTo(`/admin/${pathFrontend}/create`);
    };

    const handleEdit = async (id: string) => {
      await navigateTo(`/admin/${pathFrontend}/${id}/edit`);
    };

    const handleDelete = async (id: string) => {
      try {
        await fetchDelete(`/${pathServer}/${id}`);
        await refresh();
      } catch (exc) {
        console.error(exc);
      }
    };

    return {
      handleCreate,
      handleEdit,
      handleDelete,
      data: {
        refresh,
        entities,
        ...data,
      },
    };
  };

  const getFetchersById = async <T>(id: number, path: string) => {
    path = path.toLowerCase();

    const { fetchGet, fetchDelete, fetchPatch } = useApi();

    const {
      refresh,
      data: entitiy,
      ...data
    } = await useAsyncData<T>(
      "entitiy",
      async () => await fetchGet<T>(`/${path}/${id}`)
    );

    const handlePatch = async (form: PartialAdminApiDto<T>) => {
      const data = await fetchPatch<T>(`/${path}/${id}`, form);

      await refresh();

      return data;
    };

    const handleDelete = async () => {
      try {
        const data = await fetchDelete(`/${path}/${id}`);
        await refresh();

        return data;
      } catch (exc) {
        console.error(exc);
      }
    };

    return {
      handlePatch,
      handleDelete,
      data: {
        refresh,
        entitiy,
        ...data,
      },
    };
  };

  const getCreateTitle = (name: string) => {
    return `Create new ${name}`;
  };

  const getEditTitle = (name: string) => {
    return `Edit ${name}`;
  };

  const makeDataFn = <Model>({
    formInitial,
    pathServer,
    title,
    rules,
    navigateBack,
    uploadImagesOptions,
  }: {
    formInitial: PartialAdminApiDto<Model>;
    rules?: FormRules<
      PartialAdminApiDto<Omit<Model, "image" | "video" | "file">>
    >;
    pathServer: string;
    title: string;
    navigateBack: string;
    uploadImagesOptions?: { single: boolean; fieldName: string };
  }) => {
    const formStateKey = `${pathServer}-${title}`;

    const form = useState<PartialAdminApiDto<Model> | Model>(
      formStateKey,
      () => formInitial
    );

    const handleCreate = async (
      data: Record<string, PartialAdminApiDto<Model>>
    ) => {
      const { fetchPost, fetchUploadFileByAdmin } = useApi();

      if (uploadImagesOptions) {
        data[uploadImagesOptions.fieldName] = await fetchUploadFileByAdmin(
          data[uploadImagesOptions.fieldName],
          uploadImagesOptions.single
        );
      }

      const model = await fetchPost<Model>(`/${pathServer}`, data);

      if (model) {
        form.value = formInitial;
        await navigateTo(`/admin/${navigateBack}`);
      }
    };

    return {
      rules,
      handleCreate,
      getFetchersByID: async (id: number) =>
        await getFetchersById<Model>(id, pathServer),
      form,
      headTitle: {
        create: getCreateTitle(title),
        edit: getEditTitle(title),
      },
      navigateBack: ref(navigateBack),
    };
  };

  const NewsData = makeDataFn<IArticle>({
    rules: {},
    title: "Article",
    pathServer: "news",
    navigateBack: "news",
    uploadImagesOptions: {
      fieldName: "image",
      single: true,
    },
    formInitial: {
      description: "",
      text: "",
      title: "",
      is_hot: false,
      image: [],
    },
  });

  const BlogsData = makeDataFn<IBlog>({
    rules: {
      title: [
        { required: true, message: "Field is required", trigger: "blur" },
      ],
      text: [{ required: true, message: "Field is required", trigger: "blur" }],
      description: [
        { required: true, message: "Field is required", trigger: "blur" },
      ],
    },
    title: "Article",
    pathServer: "blogs",
    navigateBack: "blogs",
    uploadImagesOptions: {
      fieldName: "image",
      single: true,
    },
    formInitial: {
      description: "",
      text: "",
      title: "",
      image: [],
    },
  });

  const GreetingsData = makeDataFn<IGreetingIndex>({
    rules: {
      text: [{ required: true, message: "Field is required", trigger: "blur" }],
    },
    title: "Greetings",
    pathServer: "greeting-index",
    navigateBack: "greetings",
    uploadImagesOptions: {
      fieldName: "video",
      single: true,
    },
    formInitial: {
      text: "",
      is_active: true,
      video: [],
    },
  });

  const TestimonialsData = makeDataFn<ITestimonial>({
    rules: {
      title: [
        { required: true, message: "Field is required", trigger: "blur" },
      ],
      additional_info: [
        { required: true, message: "Field is required", trigger: "blur" },
      ],
    },
    title: "Testimonial",
    pathServer: "testimonials",
    navigateBack: "testimonials",
    uploadImagesOptions: {
      fieldName: "file",
      single: true,
    },
    formInitial: {
      additional_info: "",
      title: "",
      url: null,
      file: [],
    },
  });

  const AwardsData = makeDataFn<IAwards>({
    rules: {
      title: [
        { required: true, message: "Field is required", trigger: "blur" },
      ],
      description: [
        { required: true, message: "Field is required", trigger: "blur" },
      ],
      degress: [
        { required: true, message: "Field is required", trigger: "blur" },
      ],
    },
    title: "Awards",
    pathServer: "awards",
    navigateBack: "awards",
    formInitial: {
      title: "",
      description: "",
      degress: [],
      awards_avatar: [],
    },
  });

  const VideosData = makeDataFn<IVideoCollection>({
    rules: {
      title: [
        { required: true, message: "Field is required", trigger: "blur" },
      ],
    },
    title: "Video collection",
    pathServer: "video-collection",
    navigateBack: "videos",
    uploadImagesOptions: {
      fieldName: "video",
      single: true,
    },
    formInitial: {
      title: "",
      project: {} as IProject,
      video: [],
    },
  });

  const ProjectsData = makeDataFn<IProject>({
    rules: {
      title: [
        { required: true, message: "Field is required", trigger: "blur" },
      ],
      description: [
        { required: true, message: "Field is required", trigger: "blur" },
      ],
      group: [
        { message: "Length must be more than 3", trigger: "blur", min: 3 },
      ],
    },
    title: "Projects",
    pathServer: "projects",
    navigateBack: "projects",
    formInitial: {
      title: "",
      details: [],
      description: "",
      group: null,
      collab: {} as IProjectCollab,
    },
  });

  return {
    accessToken,
    makeFetchersForIndexCard,

    createTitle,
    createByData,
    updateByData,
    resetForm,
    validateForm,

    NewsData,
    BlogsData,
    GreetingsData,
    TestimonialsData,
    AwardsData,
    VideosData,
    ProjectsData,
  };
};
