<script lang="ts" setup>
import type { ITermsStatic, ITermsStaticTranslate } from '@/types/admin-api'

const props = defineProps<{
  list: ITermsStatic[] | null;
}>()

const translated = reactive((props.list ?? []).map((item) => {
  return {
    ...item,
    translate: reactive(useTranslateLanguage<ITermsStaticTranslate>(item.translate))
  }
}))

</script>
<template>
  <section class="terms">
    <div class="terms__list">
      <div v-for="item in translated" :key="item.id" class="terms__item">
        <div>
          <h3>
            {{ item.translate?.title }}
          </h3>
        </div>
        <div v-html="item.translate?.description" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.terms {
  &__item {
    display: grid;
    gap: 2rem;
    align-items: flex-start;
    justify-content: space-between;
    padding: 3rem;
    grid-template-columns: 1fr 50%;
    border-radius: 10px;

    &:nth-child(even) {
      background-color: $colorBackgroundGrey;
    }

    > div {
      &:first-child {
        flex: 0 0 55%;
        :deeo(h3) {
          word-wrap: break-word;
          word-break: break-word;
          font-size: 5.3rem;
          letter-spacing: 3px;
          line-height: 1.4;
          font-weight: bold;
        }
      }

      &:last-child {
        flex: 0 0 45%;

        :deeo(p) {
          font-size: 1.5rem;
          line-height: 1.4;
          font-weight: 500;
          max-width: 90%;
        }
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .terms {
    &__item {
      grid-template-columns: 1fr;
      padding: 40px 25px 70px;
      gap: 25px;

      > div {
        &:first-child {
          :deep(h3) {
            font-size: 13vw;
            line-height: 1.3;
          }
        }

        &:last-child {
          :deep(p){
            font-size: 6vw;
            max-width: 100%;
            line-height: 1.5;
          }
        }
      }
    }
  }
}
</style>
