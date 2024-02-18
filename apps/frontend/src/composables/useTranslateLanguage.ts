import type { TranslateLang } from '@/types/admin-api'

export default function <T = any> (translate?: TranslateLang<T>[] | null) {
  const { locale } = useI18n()

  return computed<T | null>(() => {
    if (!translate) { return null }

    const currentLang = translate.find(
      item => locale.value === item?.language?.code
    )

    if (!currentLang) {
      const enLang = translate.find(item => item?.language?.code === 'en')

      if (enLang) {
        return enLang
      } else if (translate?.[0]) { return translate[0] }
      return null
    }

    return currentLang
  })
}
