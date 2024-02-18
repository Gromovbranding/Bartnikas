import type { FormRules } from 'element-plus'
import type {
  PartialAdminApiDto,
  IArticle,
  IAwards,
  IBlog,
  IGreetingIndex,
  IProject,
  ITestimonial,
  IVideoCollection,
  IMediaKit,
  IMediaPublication,
  IMediaExhibition,
  IMediaCV,
  IMediaPresentation,
  IFaq,
  ITermsStatic,
  IBio,
  IBioTestimonials,
  IFooterContact,
  IndexCardFooter,
  IIndexSlider,
  TranslateLang,
  IGeneralInfo
} from '@/types/admin-api'

export const useAdmin = () => {
  const accessToken = useCookie<string>('accessToken')
  const cfg = useRuntimeConfig()

  interface IAvailableLocale {
    code: string;
    label: string;
    icon: string;
  }

  const currentLocale = useCookie<IAvailableLocale>('current-locale', {
    default: () =>
      cfg.public.avaiableLocales!.find(item => item.code === 'en')!
  })

  const currentIndexLocale = computed(() => {
    return (
      cfg.public.avaiableLocales!.findIndex(
        item => currentLocale.value.code === item.code
      ) ?? 0
    )
  })

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
        title: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        text: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ]
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
        title: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        text: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ]
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
        title: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        url: [{ message: 'Field is required', trigger: 'blur' }],
        additional_info: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ]
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

      formRules: ref<FormRules>({})
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
        title: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ]
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
        title: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        url: [{ message: 'Field is required', trigger: 'blur' }],
        additional_info: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ]
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
        text: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ]
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
        title: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ]
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

        formRules: ref<FormRules>({})
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
          title: [
            { required: true, message: 'Field is required', trigger: 'blur' }
          ],
          awards: [
            { required: true, message: 'Field is required', trigger: 'blur' }
          ]
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
          program: [
            { required: true, message: 'Field is required', trigger: 'blur' }
          ],
          subtitle: [
            { required: true, message: 'Field is required', trigger: 'blur' }
          ],
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
        title: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ]
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
        title: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        sub_title: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ]
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
        sub_description: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ]
      })
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
        name: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        job: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        testimonial: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ]
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
        title: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        text: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ]
      })
    }
  }

  const makeFetchersForIndexCard = <T>(
    pathFrontend: string,
    pathServer?: string
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
      async () => await fetchGet<T[]>(`/${pathServer}`)
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
    initTranslateLocale
  }
}
