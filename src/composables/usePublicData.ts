import {
  IArticle,
  IAwards,
  IBlog,
  IIndexSlider,
  IProject,
  ITestimonial,
  IProjectImageDetail,
  IVideoCollection,
  IVideoCollectionGroup,
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

  const getVideoCollectionGroups = async () =>
    await fetchGet<IVideoCollectionGroup[]>(`video-collection/group/all`);

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
    getVideoCollectionGroups,
    cart,
  };
};
