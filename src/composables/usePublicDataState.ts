import {
  IArticle,
  IAwards,
  IBlog,
  IIndexSlider,
  IProject,
  ITestimonial,
} from "~/types/admin-api";

const { fetchGet } = useApi();

export const useProjects = () => {
  const getProjectById = async (id: string | number): Promise<IProject> => {
    return await fetchGet<IProject>(`projects/${id}`);
  };

  const getAllProjects = async (): Promise<IProject[]> => {
    return await fetchGet<IProject[]>("projects");
  };

  return {
    getProjectById,
    getAllProjects,
  };
};

export const useBlogs = () => {
  const getBlogById = async (id: string | number): Promise<IBlog> => {
    return await fetchGet<IBlog>(`blogs/${id}`);
  };

  const getAllBlogs = async (): Promise<IBlog[]> => {
    return await fetchGet<IBlog[]>("blogs");
  };

  return {
    getBlogById,
    getAllBlogs,
  };
};

export const useNews = () => {
  const getArticleById = async (id: string | number): Promise<IArticle> => {
    return await fetchGet<IArticle>(`news/${id}`);
  };

  const getAllNews = async (): Promise<IArticle[]> => {
    return await fetchGet<IArticle[]>("news");
  };

  return {
    getArticleById,
    getAllNews,
  };
};

export const useTestimonials = () => {
  const getTestimoinialsById = async (
    id: string | number
  ): Promise<ITestimonial> => {
    return await fetchGet<ITestimonial>(`testimonials/${id}`);
  };

  const getAllTestimonials = async (): Promise<ITestimonial[]> => {
    return await fetchGet<ITestimonial[]>("testimonials");
  };

  return {
    getTestimoinialsById,
    getAllTestimonials,
  };
};

export const useAwards = () => {
  const getAwardsById = async (id: string | number): Promise<IAwards> => {
    return await fetchGet<IAwards>(`awards/${id}`);
  };

  const getAllAwards = async (): Promise<IAwards[]> => {
    return await fetchGet<IAwards[]>("awards");
  };

  return {
    getAwardsById,
    getAllAwards,
  };
};

export const useIndexSlider = () => {
  const getIndexSlider = async (): Promise<IIndexSlider> => {
    return await fetchGet<IIndexSlider>("index-slider");
  };

  return {
    getIndexSlider,
  };
};
