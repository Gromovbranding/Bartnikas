<script lang="ts" setup>
import type { IFooterContactTranslate } from '~/types/admin-api'

const { getActiveFooterContact } = usePublicData()

const { data: contacts } = await useAsyncData(
  'generalInfoContactss',
  async () => await getActiveFooterContact()
)

const translated = reactive(
  useTranslateLanguage<IFooterContactTranslate>(
    contacts.value?.translate ?? []
  )
)
</script>

<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__info">
        <ul>
          <li v-for="link in translated?.menu_links" :key="link.name">
            <NuxtLinkLocale :to="link.link">
              {{ link.name }}
            </NuxtLinkLocale>
          </li>
        </ul>
        <div>
          <small>
            © 2012-{{
              new Date().getFullYear() +
                " " +
                $t("name.first") +
                " " +
                $t("name.second")
            }}
          </small>
        </div>
      </div>
      <div class="footer__logo">
        <div>
          <NuxtImg
            loading="lazy"
            :src="`/baseApiFiles/${contacts?.logo?.name}`"
          />
        </div>
        <div>
          <a
            v-for="link in translated?.socials"
            :key="link.link"
            :href="link.link"
          >
            <IconSocial :icon="link.icon.trim()" />
          </a>
        </div>
      </div>
      <a href="https://gromovbranding.ru/" class="footer__gromov">
        <div>
          <p style="margin-bottom: 10px">{{ $t("footer") }}</p>
          <IconGromov />
        </div>
        <div>
          <p>{{ new Date().getFullYear() }}</p>
        </div>
      </a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  &__content {
    background-color: #000000;
    border-radius: $borderRadiusMain;
    padding: 80px 100px 80px 40px;
    display: flex;
    justify-content: space-between;
  }

  &__info {
    align-self: flex-end;

    > ul {
      margin-bottom: 50%;
      display: flex;
      flex-direction: column;
      gap: 20px;

      li {
        a {
          color: #ffff;
          transition: color 0.3s ease, transform 0.4s ease-in;
          display: block;
          font-weight: bold;
          font-size: 30px;

          &:hover {
            transform: translateX(15px);
            color: $colorAccentBlue;
          }
        }
      }
    }

    > div {
      small {
        color: #fff;
      }
    }
  }

  &__logo {
    display: flex;
    flex-direction: column;
    gap: 20px;

    > div {
      &:first-child {
        width: 350px;
        height: auto;

        picture,
        img {
          width: 100%;
          height: 100%;
        }
      }

      &:last-child {
        display: flex;
        justify-content: center;
        gap: 20px;
        align-items: center;

        a {
          display: block;

          > :deep(svg) {
            width: 64px;
            height: 64px;
            fill: #fff;
          }

          &:hover {
            > :deep(svg) {
              fill: $colorAccentBlue;
            }
          }
        }
      }
    }
  }

  &__gromov {
    align-self: flex-end;
    display: flex;
    flex-direction: column;

    > div {
      p {
        font-size: 10px;
        color: #fff;

        a {
          color: #fff;
        }
      }

      &:nth-child(2) {
        margin: 10px 0;
      }

      &:last-child {
        align-self: flex-end;
      }
    }
  }
}

@media screen and (max-width: 1215px) {
  .footer {
    &__logo {
      > div {
        &:first-child {
          width: 18rem;
          height: 12rem;
          margin-bottom: 3rem;
        }
      }
    }
    &__info {
      ul li a {
        font-size: 24px;
      }
    }
  }
}

@media screen and (max-width: 965px) {
  .footer {
    position: relative;
    &__content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 50px 0;
    }
    &__info {
      order: 2;
      align-self: center;
      > ul {
        align-items: center;

        li {
          a {
            font-size: 24px;
          }
        }
      }
      > div {
        small {
          position: relative;
          bottom: 24px;
        }
      }
    }
    &__logo {
      order: 1;
      align-self: center;
      margin-left: 0;
      margin-bottom: 40px;
      > div {
        &:first-child {
          height: 250px;
          width: auto;
          svg {
            height: 220px;
          }
        }

        &:last-child {
          a {
            > :deep(svg) {
              width: 42px;
              height: 42px;
            }
          }
        }
      }
    }
    &__gromov {
      order: 3;
      align-self: center;
      margin-top: 20px;
    }
  }
}
</style>
