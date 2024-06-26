import { type FormItemRule, type FormRules } from 'element-plus'
import {
  type PartialAdminApiDto,
  type IArticle,
  type IAwards,
  type IBlog,
  type IGreetingIndex,
  type IProject,
  type ITestimonial,
  type IVideoCollection,
  type IMediaKit,
  type IMediaPublication,
  type IMediaExhibition,
  type IMediaCV,
  type IMediaPresentation,
  type IFaq,
  type ITermsStatic,
  type IBio,
  type IBioTestimonials,
  type IFooterContact,
  type IndexCardFooter,
  type IIndexSlider,
  type TranslateLang,
  type IGeneralInfo,
  type IPlaceOfPower,
  type IPhotoportal,
  type IAbout,
  type IServices
} from '@/types/admin-api'

export const useAdmin = () => {
  const accessToken = useCookie<string>('accessToken')
  const cfg = useRuntimeConfig()

  interface IAvailableLocale {
    code: string;
    label: string;
    icon: string;
  }

  const currentLocale = useState<IAvailableLocale>('current-locale', () => cfg.public.avaiableLocales!.find(item => item.code === 'en')! as IAvailableLocale)

  const currentIndexLocale = computed(() => {
    return (
      cfg.public.avaiableLocales!.findIndex(
        item => currentLocale.value.code === item.code
      ) ?? 0
    )
  })

  const createTranslaterFormRules = (props: string[], pre: string = '') => {
    const result: {[x: string]: FormItemRule} = {}

    cfg.public.avaiableLocales.forEach((locale, idx) => {
      props.forEach((prop) => {
        result[`${pre ? `${pre}.` : ''}translate.${idx}.${prop}`] = {
          required: true,
          trigger: 'blur',
          message: `Field ${prop} doesn't have translate for locale ${locale.label}`
        }
      })
    })

    return result
  }

  const initTranslateLocale = <T = unknown>(props: T | T[]) => {
    if (Array.isArray(props)) {
      return cfg.public.avaiableLocales!.map((item) => {
        const prop = props.find(
          prop => prop.language.code.toLowerCase() === item.code.toLowerCase()
        )!

        return {
          ...prop,
          code: item.code
        }
      }) as TranslateLang<T>[]
    }

    return cfg.public.avaiableLocales!.map((item) => {
      return {
        ...props,
        code: item.code
      }
    }) as PartialAdminApiDto<TranslateLang<T>[]>
  }

  const handleChangeLocale = (item: IAvailableLocale) => {
    currentLocale.value = item
  }

  const createTitle = (type: 'create' | 'edit' = 'create', title: string) => {
    return type === 'create' ? `Create new ${title}` : `Edit ${title}`
  }

  const getModelFetchers = <Model>(path: string) => {
    const { fetchDelete, fetchPatch, fetchPost, fetchGet } = useApi()

    type RecordModel = PartialAdminApiDto<Model>;

    const handlePatch = async (
      id: number,
      data: Model | PartialAdminApiDto<Model>
    ): Promise<Model> => {
      return await fetchPatch<Model>(`/${path}/${id}`, data)
    }

    const handleCreate = async (data: RecordModel): Promise<Model> =>
      await fetchPost<Model>(`/${path}`, data)

    const handleDelete = async (id: number) => {
      return await fetchDelete(`/${path}/${id}`)
    }

    const handleGetModel = async (id: number): Promise<Model> => {
      return await fetchGet<Model>(`/${path}/${id}`)
    }

    return {
      handlePatch,
      handleCreate,
      handleDelete,
      handleGetModel
    }
  }

  const news = () => {
    const path = 'news'

    const methods = getModelFetchers<IArticle>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Article'),
        edit: createTitle('edit', 'Article')
      }),

      navigateBack: ref('/admin/news'),

      formRules: ref<FormRules>({
        ...createTranslaterFormRules(['title', 'text', 'description'])
      })
    }
  }

  const indexSlider = () => {
    const path = 'index-slider'

    const methods = getModelFetchers<IIndexSlider>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Index Slider'),
        edit: createTitle('edit', 'Index Slider')
      }),

      navigateBack: ref('/admin/index-slider'),

      formRules: ref<FormRules>({
        name: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ]
      })
    }
  }

  const blogs = () => {
    const path = 'blogs'

    const methods = getModelFetchers<IBlog>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Article'),
        edit: createTitle('edit', 'Article')
      }),

      navigateBack: ref('/admin/blogs'),

      formRules: ref<FormRules>({
        ...createTranslaterFormRules(['title', 'text', 'description'])
      })
    }
  }

  const testimonials = () => {
    const path = 'testimonials'

    const methods = getModelFetchers<ITestimonial>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Testimonial'),
        edit: createTitle('edit', 'Testimonial')
      }),

      navigateBack: ref('/admin/testimonials'),

      formRules: ref<FormRules>({
        url: [{ message: 'Field is required', trigger: 'blur' }],
        ...createTranslaterFormRules(['title', 'additional_info'])
      })
    }
  }

  const generalInfo = () => {
    const path = 'general-info'

    const methods = getModelFetchers<IGeneralInfo>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'General Info'),
        edit: createTitle('edit', 'General Info')
      }),

      navigateBack: ref('/admin/general-info'),

      formRules: ref<FormRules>({
        email_press: {
          trigger: 'blur',
          type: 'email'
        },
        email_gallery: {
          trigger: 'blur',
          type: 'email'
        }
      })
    }
  }

  const faq = () => {
    const path = 'faq'

    const methods = getModelFetchers<IFaq>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'FAQ'),
        edit: createTitle('edit', 'FAQ')
      }),

      navigateBack: ref('/admin/faq'),

      formRules: ref<FormRules>({
        ...createTranslaterFormRules(['title', 'description'])
      })
    }
  }

  const videos = () => {
    const path = 'video-collection'

    const methods = getModelFetchers<IVideoCollection>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Video Collection'),
        edit: createTitle('edit', 'Video Collection')
      }),

      navigateBack: ref('/admin/videos'),

      formRules: ref<FormRules>({
        url: [{ message: 'Field is required', trigger: 'blur', type: 'url' }],
        ...createTranslaterFormRules(['title', 'additional_info'])
      })
    }
  }

  const greetings = () => {
    const path = 'greeting-index'

    const methods = getModelFetchers<IGreetingIndex>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Concept'),
        edit: createTitle('edit', 'Concept')
      }),

      navigateBack: ref('/admin/greetings'),

      formRules: ref<FormRules>({
        ...createTranslaterFormRules(['text'])
      })
    }
  }

  const awards = () => {
    const path = 'awards'

    const methods = getModelFetchers<IAwards>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Award'),
        edit: createTitle('edit', 'Award')
      }),

      navigateBack: ref('/admin/awards'),

      formRules: ref<FormRules>({
        ...createTranslaterFormRules(['title', 'description'])
      })
    }
  }

  const media = () => {
    const basePath = 'media'

    const kit = () => {
      const methods = getModelFetchers<IMediaKit>(`${basePath}/kit`)

      return {
        methods,

        titles: reactive({
          create: createTitle('create', 'Media Kit'),
          edit: createTitle('edit', 'Media Kit')
        }),

        navigateBack: ref('/admin/media?type=kit'),

        formRules: ref<FormRules>({})
      }
    }

    const cv = () => {
      const methods = getModelFetchers<IMediaCV>(`${basePath}/cv`)

      return {
        methods,

        titles: reactive({
          create: createTitle('create', 'Media CV'),
          edit: createTitle('edit', 'Media CV')
        }),

        navigateBack: ref('/admin/media?type=cv'),

        formRules: ref<FormRules>({
          title: [
            { required: true, message: 'Field is required', trigger: 'blur' }
          ]
        })
      }
    }

    const presentation = () => {
      const methods = getModelFetchers<IMediaPresentation>(
        `${basePath}/presentation`
      )

      return {
        methods,

        titles: reactive({
          create: createTitle('create', 'Media Presentation'),
          edit: createTitle('edit', 'Media Presentation')
        }),

        navigateBack: ref('/admin/media?type=presentation'),

        formRules: ref<FormRules>({
          ...createTranslaterFormRules(['title'])
        })
      }
    }

    const exhibition = () => {
      const methods = getModelFetchers<IMediaExhibition>(
        `${basePath}/exhibition`
      )

      return {
        methods,

        titles: reactive({
          create: createTitle('create', 'Media Exhibition'),
          edit: createTitle('edit', 'Media Exhibition')
        }),

        navigateBack: ref('/admin/media?type=exhibition'),

        formRules: ref<FormRules>({
          ...createTranslaterFormRules(['title', 'awards'])
        })
      }
    }

    const publication = () => {
      const methods = getModelFetchers<IMediaPublication>(
        `${basePath}/publication`
      )

      return {
        methods,

        titles: reactive({
          create: createTitle('create', 'Media Publication'),
          edit: createTitle('edit', 'Media Publication')
        }),

        navigateBack: ref('/admin/media?type=publication'),

        formRules: ref<FormRules>({
          ...createTranslaterFormRules(['program', 'subtitle']),
          url: [
            {
              required: true,
              message: 'Invalid URL',
              trigger: 'blur',
              type: 'url'
            }
          ],
          date: [
            {
              required: true,
              message: 'Field is required',
              trigger: 'blur',
              type: 'date'
            }
          ]
        })
      }
    }

    return {
      kit,
      publication,
      exhibition,
      cv,
      presentation
    }
  }

  const projects = () => {
    const path = 'projects'

    const methods = getModelFetchers<IProject>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Project'),
        edit: createTitle('edit', 'Project')
      }),

      navigateBack: ref('/admin/projects'),

      formRules: ref<FormRules>({
        ...createTranslaterFormRules(['title', 'text', 'description']),
        ...createTranslaterFormRules(['title', 'collab_with', 'description'], 'collab'),
        group: [
          { message: 'Group must be more than 3', trigger: 'blur', min: 3 }
        ]
      })
    }
  }

  const termsStatic = () => {
    const path = 'terms-static'

    const methods = getModelFetchers<ITermsStatic>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Terms & Conditions'),
        edit: createTitle('edit', 'Terms & Conditions')
      }),

      navigateBack: ref('/admin/terms-static'),

      formRules: ref<FormRules>({
        ...createTranslaterFormRules(['title', 'description'])
      })
    }
  }

  const deliveryStatic = () => {
    const path = 'delivery-static'

    const methods = getModelFetchers<ITermsStatic>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Payment & Delivery'),
        edit: createTitle('edit', 'Payment & Delivery')
      }),

      navigateBack: ref('/admin/delivery-static'),

      formRules: ref<FormRules>({
        ...createTranslaterFormRules(['title', 'sub_title', 'description'])
      })
    }
  }

  const bio = () => {
    const path = 'bio'

    const methods = getModelFetchers<IBio>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'About me'),
        edit: createTitle('edit', 'About me')
      }),

      navigateBack: ref('/admin/bio'),

      formRules: ref<FormRules>({
        ...createTranslaterFormRules(['sub_description', 'description'])
      })
    }
  }

  const about = () => {
    const path = 'about'

    const methods = getModelFetchers<IAbout>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'About'),
        edit: createTitle('edit', 'About')
      }),

      navigateBack: ref('/admin/about'),

      formRules: ref<FormRules>({})
    }
  }

  const services = () => {
    const path = 'services'

    const methods = getModelFetchers<IServices>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Services'),
        edit: createTitle('edit', 'Services')
      }),

      navigateBack: ref('/admin/services'),

      formRules: ref<FormRules>({})
    }
  }

  const servicesPhotoportal = () => {
    const path = 'photoportal'

    const methods = getModelFetchers<IPhotoportal>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Photoportal'),
        edit: createTitle('edit', 'Photoportal')
      }),

      navigateBack: ref('/admin/photoportal'),

      formRules: ref<FormRules>({})
    }
  }

  const servicesPlaceOfPower = () => {
    const path = 'place-of-power'

    const methods = getModelFetchers<IPlaceOfPower>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Place of power'),
        edit: createTitle('edit', 'Place of power')
      }),

      navigateBack: ref('/admin/place-of-power'),

      formRules: ref<FormRules>({})
    }
  }

  const bioTestimonials = () => {
    const path = 'bio-testimonials'

    const methods = getModelFetchers<IBioTestimonials>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Bio Testimonials'),
        edit: createTitle('edit', 'Bio Testimonials')
      }),

      navigateBack: ref('/admin/bio-testimonials'),

      formRules: ref<FormRules>({
        ...createTranslaterFormRules(['name', 'job', 'testimonial'])
      })
    }
  }

  const footerContacts = () => {
    const path = 'footer-contacts'

    const methods = getModelFetchers<IFooterContact>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Footer Contacts'),
        edit: createTitle('edit', 'Footer Contacts')
      }),

      navigateBack: ref('/admin/footer-contacts'),

      formRules: ref<FormRules>({})
    }
  }

  const footerIndexCard = () => {
    const path = 'index-card-footer'

    const methods = getModelFetchers<IndexCardFooter>(path)

    return {
      methods,

      titles: reactive({
        create: createTitle('create', 'Footer Card'),
        edit: createTitle('edit', 'Footer Card')
      }),

      navigateBack: ref('/admin/footer-card-index'),

      formRules: ref<FormRules>({
        'button.url': {
          required: true,
          message: 'field is required',
          trigger: 'blur',
          type: 'url'
        },
        'button.text': {
          required: true,
          message: 'field is required',
          trigger: 'blur',
          type: 'string'
        },
        text: {
          required: true,
          message: 'field is required',
          trigger: 'blur',
          type: 'string'
        },
        title: {
          required: true,
          message: 'field is required',
          trigger: 'blur',
          type: 'string'
        }
      })
    }
  }

  const makeFetchersForIndexCard = <T>(
    pathFrontend: string,
    pathServer?: string,
    pathGet?: string
  ) => {
    pathFrontend = pathFrontend.toLowerCase()

    if (pathServer) {
      pathServer = pathServer.toLowerCase()
    } else {
      pathServer = pathFrontend
    }

    const { fetchGet, fetchDelete } = useApi()
    const {
      refresh,
      data: entities,
      ...data
    } = useAsyncData<T[]>(
      `entity-${pathFrontend}`,
      async () => await fetchGet<T[]>(`/${pathGet ?? pathServer}`)
    )

    const handleCreate = async () => {
      await navigateTo(`/admin/${pathFrontend}/create`)
    }

    const handleEdit = async (id: string) => {
      await navigateTo(`/admin/${pathFrontend}/${id}/edit`)
    }

    const handleDelete = async (id: string) => {
      try {
        await fetchDelete(`/${pathServer}/${id}`)
        await refresh()
      } catch (exc) {
        console.error(exc)
      }
    }

    return {
      handleCreate,
      handleEdit,
      handleDelete,
      data: {
        refresh,
        entities,
        ...data
      }
    }
  }

  return {
    accessToken,
    makeFetchersForIndexCard,

    media,

    news,
    indexSlider,
    blogs,
    testimonials,
    videos,
    greetings,
    awards,
    projects,
    faq,
    termsStatic,
    deliveryStatic,
    bio,
    bioTestimonials,
    footerContacts,
    footerIndexCard,
    generalInfo,
    currentLocale,
    currentIndexLocale,
    handleChangeLocale,
    services,
    servicesPhotoportal,
    servicesPlaceOfPower,
    about,
    initTranslateLocale
  }
}
