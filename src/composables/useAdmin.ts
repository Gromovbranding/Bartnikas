import { FormRules } from "element-plus";
import {
  PartialAdminApiDto,
  IArticle,
  IAwards,
  IBlog,
  IGreetingIndex,
  IProject,
  ITestimonial,
  IVideoCollection,
} from "./../types/admin-api";

export const useAdmin = () => {
  const accessToken = useCookie<string>("accessToken");

  const createTitle = (type: "create" | "edit" = "create", title: string) => {
    return type === "create" ? `Create new ${title}` : `Edit ${title}`;
  };

  const getModelFetchers = <Model>(path: string) => {
    const { fetchDelete, fetchPatch, fetchPost, fetchGet } = useApi();

    type RecordModel = PartialAdminApiDto<Model>;

    const handlePatch = async (id: number, data: Model): Promise<Model> =>
      await fetchPatch<Model>(`/${path}/${id}`, data);

    const handleCreate = async (data: RecordModel): Promise<Model> =>
      await fetchPost<Model>(`/${path}`, data);

    const handleDelete = async (id: number) => {
      return await fetchDelete(`/${path}/${id}`);
    };

    const handleGetModel = async (id: number): Promise<Model> => {
      return await fetchGet<Model>(`/${path}/${id}`);
    };

    return {
      handlePatch,
      handleCreate,
      handleDelete,
      handleGetModel,
    };
  };

  const news = () => {
    const path = "news";

    const methods = getModelFetchers<IArticle>(path);

    return {
      methods,

      titles: reactive({
        create: createTitle("create", "Article"),
        edit: createTitle("edit", "Article"),
      }),

      navigateBack: ref("/admin/news"),

      formRules: ref<FormRules>({
        title: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
        description: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
        text: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
      }),
    };
  };

  const blogs = () => {
    const path = "blogs";

    const methods = getModelFetchers<IBlog>(path);

    return {
      methods,

      titles: reactive({
        create: createTitle("create", "Article"),
        edit: createTitle("edit", "Article"),
      }),

      navigateBack: ref("/admin/blogs"),

      formRules: ref<FormRules>({
        title: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
        text: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
        description: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
      }),
    };
  };

  const testimonials = () => {
    const path = "testimonials";

    const methods = getModelFetchers<ITestimonial>(path);

    return {
      methods,

      titles: reactive({
        create: createTitle("create", "Testimonial"),
        edit: createTitle("edit", "Testimonial"),
      }),

      navigateBack: ref("/admin/testimonials"),

      formRules: ref<FormRules>({
        title: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
        url: [{ message: "Field is required", trigger: "blur" }],
        additional_info: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
      }),
    };
  };

  const videos = () => {
    const path = "video-collection";

    const methods = getModelFetchers<IVideoCollection>(path);

    return {
      methods,

      titles: reactive({
        create: createTitle("create", "Video Collection"),
        edit: createTitle("edit", "Video Collection"),
      }),

      navigateBack: ref("/admin/videos"),

      formRules: ref<FormRules>({
        title: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
        url: [{ message: "Field is required", trigger: "blur" }],
        additional_info: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
      }),
    };
  };

  const greetings = () => {
    const path = "greetings-index";

    const methods = getModelFetchers<IGreetingIndex>(path);

    return {
      methods,

      titles: reactive({
        create: createTitle("create", "Greetings"),
        edit: createTitle("edit", "Greetings"),
      }),

      navigateBack: ref("/admin/greetings"),

      formRules: ref<FormRules>({
        text: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
      }),
    };
  };

  const awards = () => {
    const path = "awards";

    const methods = getModelFetchers<IAwards>(path);

    return {
      methods,

      titles: reactive({
        create: createTitle("create", "Award"),
        edit: createTitle("edit", "Award"),
      }),

      navigateBack: ref("/admin/awards"),

      formRules: ref<FormRules>({
        title: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
        description: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
      }),
    };
  };

  const projects = () => {
    const path = "projects";

    const methods = getModelFetchers<IProject>(path);

    return {
      methods,

      titles: reactive({
        create: createTitle("create", "Project"),
        edit: createTitle("edit", "Project"),
      }),

      navigateBack: ref("/admin/projects"),

      formRules: ref<FormRules>({
        title: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
        description: [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
        group: [
          { message: "Group must be more than 3", trigger: "blur", min: 3 },
        ],
        "collab.collab_with": [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
        "collab.title": [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
        "collab.description": [
          { required: true, message: "Field is required", trigger: "blur" },
        ],
      }),
    };
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

  return {
    accessToken,
    makeFetchersForIndexCard,

    news,
    blogs,
    testimonials,
    videos,
    greetings,
    awards,
    projects,
  };
};
