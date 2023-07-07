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
  PartialAdminApiDto,
} from "types/admin-api";

export const useAdmin = () => {
  const accessToken = useCookie<string>("accessToken");

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
  }: {
    formInitial: PartialAdminApiDto<Model>;
    rules?: FormRules<Ref<PartialAdminApiDto<Model>>>;
    pathServer: string;
    title: string;
    navigateBack: string;
  }) => {
    const form = useState<PartialAdminApiDto<Model>>(() => formInitial);

    return {
      rules,
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
    rules: {
      title: [
        { required: true, message: "Filed is required", trigger: "blur" },
      ],
      description: [
        { required: true, message: "Filed is required", trigger: "blur" },
      ],
      text: [{ required: true, message: "Filed is required", trigger: "blur" }],
    },
    title: "Article",
    pathServer: "news",
    navigateBack: "news",
    formInitial: {
      description: "",
      image: {
        name: "",
      },
      text: "",
      title: "",
      is_hot: false,
    },
  });

  const BlogsData = makeDataFn<IBlog>({
    rules: {
      title: [
        { required: true, message: "Filed is required", trigger: "blur" },
      ],
      text: [{ required: true, message: "Filed is required", trigger: "blur" }],
      description: [
        { required: true, message: "Filed is required", trigger: "blur" },
      ],
    },
    title: "Article",
    pathServer: "blogs",
    navigateBack: "blogs",
    formInitial: {
      description: "",
      text: "",
      title: "",
    },
  });

  const GreetingsData = makeDataFn<IGreetingIndex>({
    rules: {
      text: [{ required: true, message: "Filed is required", trigger: "blur" }],
    },
    title: "Greetings",
    pathServer: "greetings-index",
    navigateBack: "greetings",
    formInitial: {
      text: "",
      is_active: true,
    },
  });

  const TestimonialsData = makeDataFn<ITestimonial>({
    rules: {
      title: [
        { required: true, message: "Filed is required", trigger: "blur" },
      ],
      additional_info: [
        { required: true, message: "Filed is required", trigger: "blur" },
      ],
    },
    title: "Testimonial",
    pathServer: "testimonials",
    navigateBack: "testimonials",
    formInitial: {
      additional_info: "",
      title: "",
    },
  });

  const AwardsData = makeDataFn<IAwards>({
    rules: {
      title: [
        { required: true, message: "Filed is required", trigger: "blur" },
      ],
      description: [
        { required: true, message: "Filed is required", trigger: "blur" },
      ],
      degress: [
        { required: true, message: "Filed is required", trigger: "blur" },
      ],
    },
    title: "Awards",
    pathServer: "awards",
    navigateBack: "awards",
    formInitial: {
      title: "",
      description: "",
      degress: [],
    },
  });

  const VideosData = makeDataFn<IVideoCollection>({
    rules: {
      title: [
        { required: true, message: "Filed is required", trigger: "blur" },
      ],
    },
    title: "Video collection",
    pathServer: "video-collection",
    navigateBack: "videos",
    formInitial: {
      title: "",
      project: {} as IProject,
    },
  });

  const ProjectsData = makeDataFn<IProject>({
    rules: {
      title: [
        { required: true, message: "Filed is required", trigger: "blur" },
      ],
      description: [
        { required: true, message: "Filed is required", trigger: "blur" },
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
      collab: {},
    },
  });

  return {
    accessToken,
    makeFetchersForIndexCard,

    NewsData,
    BlogsData,
    GreetingsData,
    TestimonialsData,
    AwardsData,
    VideosData,
    ProjectsData,
  };
};
