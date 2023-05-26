import {
  IArticle,
  IAwards,
  IBlog,
  IIndexSlider,
  IProject,
  ITestimonial,
  IProjectImageDetail,
  IVideoCollection,
  IMediaKit,
  IMediaCV,
  IMediaExhibition,
  IMediaPresentation,
  IGreetingIndex,
} from "~/types/admin-api";

type INextPrevWrapper<T> = T & { next: T; prev: T };

export const usePublicData = () => {
  const { fetchGet } = useApi();

  const cart = useCookie<IProjectImageDetail[]>("cart", {
    default: () => [],
    path: "/",
  });

  const getProjectById = async (id: string | number) =>
    await fetchGet<IProject>(`projects/${id}`);

  const getAllProjects = async () => await fetchGet<IProject[]>("projects");

  const getBlogById = async (id: string | number) =>
    await fetchGet<INextPrevWrapper<IBlog>>(`blogs/${id}`);

  const getAllBlogs = async () => await fetchGet<IBlog[]>("blogs");

  const getArticleById = async (id: string | number) =>
    await fetchGet<INextPrevWrapper<IArticle>>(`news/${id}`);

  const getArticlesByHotNews = async () =>
    await fetchGet<IArticle[]>(`news/hot/all`);

  const getLastHotArticle = async () =>
    await fetchGet<IArticle>(`news/hot/last`);

  const getAllNews = async () => await fetchGet<IArticle[]>("news");

  const getTestimoinialsById = async (id: string | number) =>
    await fetchGet<ITestimonial>(`testimonials/${id}`);

  const getAllTestimonials = async () =>
    await fetchGet<ITestimonial[]>("testimonials");

  const getAwardsById = async (id: string | number) =>
    await fetchGet<IAwards>(`awards/${id}`);

  const getCountAllAwards = async () =>
    await fetchGet<number>("awards/count/all");

  const getAllAwards = async () => await fetchGet<IAwards[]>("awards");

  const getIndexSlider = async () =>
    await fetchGet<IIndexSlider>("index-slider");

  const getAllVideoCollection = async () =>
    await fetchGet<IVideoCollection[]>("video-collection");

  const getVideoCollectionById = async (id: string | number) =>
    await fetchGet<IVideoCollection>(`video-collection/${id}`);

  const getAllMediaKit = async () => await fetchGet<IMediaKit>("media/kit");

  const getAllMediaCV = async () => await fetchGet<IMediaCV>("media/cv");

  const getAllMediaPublication = async () =>
    await fetchGet<IMediaCV>("media/publication");

  const getAllMediaPresentation = async () =>
    await fetchGet<IMediaPresentation>("media/presentation");

  const getAllMediaExhibition = async () =>
    await fetchGet<IMediaExhibition>("media/exhibition");

  const getActiveGreetingIndex = async () =>
    await fetchGet<IGreetingIndex>("greeting-index");

  return {
    getProjectById,
    getAllProjects,
    getBlogById,
    getAllBlogs,
    getArticleById,
    getArticlesByHotNews,
    getLastHotArticle,
    getAllNews,
    getTestimoinialsById,
    getAllTestimonials,
    getAwardsById,
    getCountAllAwards,
    getAllAwards,
    getIndexSlider,
    getAllVideoCollection,
    getVideoCollectionById,
    getAllMediaKit,
    getAllMediaCV,
    getAllMediaExhibition,
    getAllMediaPresentation,
    getAllMediaPublication,
    getActiveGreetingIndex,
    cart,
  };
};
