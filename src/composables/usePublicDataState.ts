import {
  IArticle,
  IAwards,
  IBlog,
  IIndexSlider,
  IProject,
  ITestimonial,
  IProjectImageDetail,
} from "~/types/admin-api";

export const usePublicData = () => {
  const { fetchGet } = useApi();

  type INextPrevWrapper<T> = T & { next: T; prev: T };

  const cart = useCookie<IProjectImageDetail[]>("cart", {
    default: () => [],
    path: "/",
  });

  const getProjectById = async (id: string | number): Promise<IProject> => {
    return await fetchGet<IProject>(`projects/${id}`);
  };

  const getAllProjects = async (): Promise<IProject[]> => {
    return await fetchGet<IProject[]>("projects");
  };

  const getBlogById = async (
    id: string | number
  ): Promise<INextPrevWrapper<IBlog>> => {
    return await fetchGet<INextPrevWrapper<IBlog>>(`blogs/${id}`);
  };

  const getAllBlogs = async (): Promise<IBlog[]> => {
    return await fetchGet<IBlog[]>("blogs");
  };

  const getArticleById = async (
    id: string | number
  ): Promise<INextPrevWrapper<IArticle>> => {
    return await fetchGet<INextPrevWrapper<IArticle>>(`news/${id}`);
  };

  const getArticlesByHotNews = async (): Promise<IArticle[]> => {
    return await fetchGet<IArticle[]>(`news/hot/all`);
  };

  const getLastHotArticle = async (): Promise<IArticle> => {
    return await fetchGet<IArticle>(`news/hot/last`);
  };

  const getAllNews = async (): Promise<IArticle[]> => {
    return await fetchGet<IArticle[]>("news");
  };

  const getTestimoinialsById = async (
    id: string | number
  ): Promise<ITestimonial> => {
    return await fetchGet<ITestimonial>(`testimonials/${id}`);
  };

  const getAllTestimonials = async (): Promise<ITestimonial[]> => {
    return await fetchGet<ITestimonial[]>("testimonials");
  };

  const getAwardsById = async (id: string | number): Promise<IAwards> => {
    return await fetchGet<IAwards>(`awards/${id}`);
  };

  const getCountAllAwards = async (): Promise<number> => {
    return await fetchGet<number>("awards/count/all");
  };

  const getAllAwards = async (): Promise<IAwards[]> => {
    return await fetchGet<IAwards[]>("awards");
  };

  const getIndexSlider = async (): Promise<IIndexSlider> => {
    return await fetchGet<IIndexSlider>("index-slider");
  };

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
    cart,
  };
};
