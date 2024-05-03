<script setup lang="ts">
const { fetchPost } = useApi()
const { t } = useI18n()

useHeadSafe({
  title: t('titles.contacts'),
  meta: [
    {
      name: 'description',
      content: 'titles.contacts'
    }

  ]
})

const form = ref<{
  name: string;
  email: string;
  comment: string;
}>({
  name: '',
  email: '',
  comment: ''
})

const handleAddContact = async () => {
  await fetchPost('/contacts', form.value)

  form.value = {
    name: '',
    email: '',
    comment: ''
  }
}

const { getActiveGeneralInfo } = usePublicData()

const { data: emails } = await useAsyncData(
  'generalInfoEmailssss',
  async () => await getActiveGeneralInfo()
)
</script>

<template>
  <main>
    <AppPageHead :title="$t('titles.contacts')" />

    <section class="contacts">
      <div>
        <img src="assets/img/bartnikas_contacts.jpg" alt="Bartnikas contacts">
      </div>
      <div>
        <p>{{ $t("contacts.locationLive") }}</p>
        <br>
        <div>
          <p>
            <span>{{ $t("contacts.pressInquiry") }}&thinsp;</span>
            <a class="upper-slide" :href="`mailto:${emails?.email_press}`">
              <span>{{ emails?.email_press }}</span>
              <IconArrow is-arrow30-deg />
            </a>
          </p>
          <p>
            <span>{{ $t("contacts.gallery") }}&thinsp;</span>
            <a class="upper-slide" :href="`mailto:${emails?.email_gallery}`">
              <span>{{ emails?.email_gallery || 'someemail@mail' }}</span>
              <IconArrow is-arrow30-deg />
            </a>
          </p>
        </div>
        <h3>
          {{ $t("contacts.formDescript") }}
        </h3>
        <form @submit.prevent>
          <div>
            <label for="name"> {{ $t("contacts.yourName") }} </label>
            <UIInput id="name" v-model="form.name" placeholder="John Smith" />
          </div>
          <div>
            <label for="email"> {{ $t("contacts.yourEmail") }} </label>
            <UIInput
              id="email"
              v-model="form.email"
              type="email"
              placeholder="mail@example.com"
            />
          </div>
          <div>
            <label for=""> {{ $t("contacts.comment") }} </label>
            <UIInput v-model="form.comment" placeholder="Comment text" />
          </div>
          <UIButton style="width: 100%" @click="handleAddContact">
            {{ $t("contacts.btnSubmit") }}
          </UIButton>
        </form>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.contacts {
  background-color: $colorBackgroundGrey;
  display: grid;
  grid-template-columns: 1fr 1fr;
  > div {
    &:first-child {
      img,
      picture {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: $borderRadiusMain;
      }
    }

    &:last-child {
      padding: 3rem 4rem;
      > * {
        max-width: 33.3rem;
      }

      > div {
        a {
          color: $colorAccentBlue;
          display: flex;
          align-items: center;
          gap: 10px;

          span {
            color: inherit;
          }

          :deep(svg) {
            fill: currentColor;
            width: 16px;
            height: 16px;
            margin-bottom: 10px;
          }
        }
      }

      h3 {
        font-size: 1.9rem;
        font-weight: bold;
        margin-bottom: 2rem;
        line-height: 1.32;
        display: flex;
        font-weight: 600;
        gap: 0.5rem;
        margin-top: 2rem;
      }

      p {
        font-size: 1.34rem;
        font-weight: 400;
        line-height: 1.56;
        display: flex;
        align-items: center;
      }

      form {
        > div {
          margin-bottom: 40px;

          label {
            font-size: 24px;
            font-weight: 400;
            margin-bottom: 10px;
            display: block;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .contacts {
    div {
      &:last-child {
        p {
          font-size: 1.2rem;
        }
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .contacts {
    grid-template-columns: 1fr;
    > div {
      &:last-child {
        max-width: 100%;
        margin-left: 0;
        padding: 16px 16px 80px;
        > div {
          margin-bottom: 40px;
        }

        h3 {
          font-size: 6.5vw;
        }

        p {
          font-size: 5vw;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }
      }
    }
  }
}
</style>
