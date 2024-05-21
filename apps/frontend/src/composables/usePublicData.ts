import type {
  IArticle,
  IAwards,
  IBlog,
  IProject,
  ITestimonial,
  IProjectImageDetail,
  IVideoCollection,
  IMediaKit,
  IMediaCV,
  IMediaExhibition,
  IMediaPresentation,
  IGreetingIndex,
  IFaq,
  ITermsStatic,
  IBio,
  IBioTestimonials,
  IFooterContact,
  IIndexSlider,
  IGeneralInfo,
  IPlaceOfPower,
  IPhotoportal,
  IAbout,
  IServices
} from '~/types/admin-api'

type INextPrevWrapper<T> = T & { next: T | null; prev: T | null };
const excludeNotActiveImage = (project: IProject): IProject => ({
  ...project,
  details: project.details.filter(item => !!item.is_active)
})

export const usePublicData = () => {
  const { fetchGet, fetchPost } = useApi()

  const cart = useState<IProjectImageDetail[]>('cart', () => [])

  const getProjectById = async (id: string | number) =>
    excludeNotActiveImage(await fetchGet<IProject>(`projects/${id}`))

  const getAllProjects = async () =>
    (await fetchGet<IProject[]>('projects'))
      .map(excludeNotActiveImage)

  const getBlogById = async (id: string | number) =>
    await fetchGet<INextPrevWrapper<IBlog>>(`blogs/${id}`)

  const getAllBlogs = async () => await fetchGet<IBlog[]>('blogs')

  const getArticleById = async (id: string | number) =>
    await fetchGet<INextPrevWrapper<IArticle>>(`news/prev-next/${id}`)

  const getArticlesByHotNews = async () =>
    await fetchGet<IArticle[]>('news/hot/all')

  const getLastHotArticle = async () =>
    await fetchGet<IArticle>('news/hot/last')

  const getAllNews = async () => await fetchGet<IArticle[]>('news')

  const getTestimoinialsById = async (id: string | number) =>
    await fetchGet<ITestimonial>(`testimonials/${id}`)

  const getAllTestimonials = async () =>
    await fetchGet<ITestimonial[]>('testimonials')

  const getAwardsById = async (id: string | number) =>
    await fetchGet<IAwards>(`awards/${id}`)

  // const getCountAllAwards = async () =>
  //   await fetchGet<number>("awards/count/all");

  const getAllAwards = async () => await fetchGet<IAwards[]>('awards')

  const getIndexSlider = async () =>
    await fetchGet<IIndexSlider[]>('index-slider/only/active')

  const getAllVideoCollection = async () =>
    await fetchGet<IVideoCollection[]>('video-collection')

  const getVideoCollectionById = async (id: string | number) =>
    await fetchGet<IVideoCollection>(`video-collection/${id}`)

  const getAllMediaKit = async () => await fetchGet<IMediaKit>('media/kit')

  const getAllMediaCV = async () => await fetchGet<IMediaCV>('media/cv')

  const getAllMediaPublication = async () =>
    await fetchGet<IMediaCV>('media/publication')

  const getAllMediaPresentation = async () =>
    await fetchGet<IMediaPresentation>('media/presentation')

  const getAllMediaExhibition = async () =>
    await fetchGet<IMediaExhibition>('media/exhibition')

  const getActiveGreetingIndex = async () =>
    await fetchGet<IGreetingIndex>('greeting-index/only/active')

  const getAllFaq = async () => await fetchGet<IFaq[]>('faq')

  const getDeliveryStatic = async () =>
    await fetchGet<ITermsStatic[]>('delivery-static')

  const getTermsStatic = async () =>
    await fetchGet<ITermsStatic[]>('terms-static')

  const getBio = async () => await fetchGet<IBio>('bio/current/active')

  const getBioTestimonials = async () =>
    await fetchGet<IBioTestimonials[]>('bio-testimonials')

  const getProjectByFooterCard = async () =>
    await fetchGet<IProject>('projects/by-footer-card')

  const makeProjectsPayment = async (dto: {
    amount: number;
    currency: string;
  }) => await fetchPost<string>('projects/order/by-payment', dto)

  const getActiveFooterContact = async () =>
    await fetchGet<IFooterContact>('footer-contacts/only/active')

  const getActiveGeneralInfo = async () =>
    await fetchGet<IGeneralInfo>('general-info/only/active')

  const getServices = async () => await fetchGet<IServices>('services/only/active')

  const getPlaceOfPower = async () => await fetchGet<IPlaceOfPower>('services/place-of-power/only/active')

  const getPhotoportal = async () => await fetchGet<IPhotoportal>('services/photoportal/only/active')

  const getAbout = async () => await fetchGet<IAbout>('about/only/active')

  // const getActiveIndexCardFooter = async () =>
  //   await fetchGet<IndexCardFooter>("index-card-footer/only/active");

  return {
    getProjectByFooterCard,
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
    getServices,
    getPlaceOfPower,
    getPhotoportal,
    getAbout,
    // getCountAllAwards,
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
    getAllFaq,
    getTermsStatic,
    getDeliveryStatic,
    getBio,
    getBioTestimonials,
    getActiveFooterContact,
    getActiveGeneralInfo,
    // getActiveIndexCardFooter,

    makeProjectsPayment,
    cart
  }
}
