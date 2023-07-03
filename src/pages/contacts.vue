<script setup lang="ts">
const { fetchPost } = useApi();

const form = ref<{
  name: string;
  email: string;
  comment: string;
}>({
  name: "",
  email: "",
  comment: "",
});

const handleAddContact = async () => {
  await fetchPost("/contacts", form.value);

  form.value = {
    name: "",
    email: "",
    comment: "",
  };
};
</script>

<template>
  <main>
    <Title> Contacts </Title>
    <AppPageHead title="Contacts" />

    <section class="contacts">
      <div>
        <img
          src="@/assets/img/bartnikas_contacts.jpg"
          alt="Bartnikas contacts"
        />
      </div>
      <div>
        <p>Stas Bartnikas resides in Moscow, Russia</p>
        <div>
          <p>
            <span>Press inquiry</span>
            <a class="upper-slide" href="mailto:sb@stasbart.com">
              <span>sb@stasbart.com</span> <IconArrow is-arrow30-deg />
            </a>
          </p>
          <p>
            <span>Gallery representation</span>
            <a class="upper-slide" href="mailto:sb@stasbart.com">
              <span>sb@stasbart.com</span>
              <IconArrow is-arrow30-deg />
            </a>
          </p>
        </div>
        <h3>
          For corporate or personal purchase of prints please contact us through
          the form
        </h3>
        <form @submit.prevent>
          <div>
            <label for=""> Your Name </label>
            <UIInput v-model="form.name" placeholder="John Smith" />
          </div>
          <div>
            <label for=""> Your email </label>
            <UIInput
              v-model="form.email"
              type="email"
              placeholder="mail@example.com"
            />
          </div>
          <div>
            <label for=""> Comment </label>
            <UIInput v-model="form.comment" placeholder="Comment text" />
          </div>
          <UIButton style="width: 100%" @click="handleAddContact">
            Submit
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
      img {
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
          color: $colorTextDark;
          display: flex;
          align-items: center;
          gap: 10px;

          :deep(svg) {
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
      }

      p {
        font-size: 1.34rem;
        font-weight: 400;
        line-height: 1.56;
        display: flex;
        align-items: center;
        gap: 0.5rem;
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

@media screen and (max-width: 550px) {
  .contacts {
    flex-direction: column;
    > div {
      &:first-child {
        img {
        }
      }

      &:last-child {
        max-width: 100%;
        margin-left: 0;
        padding: 16px 16px 80px;
        > div {
          margin-bottom: 40px;
          a {
            :deep(svg) {
            }
          }
        }

        h3 {
          font-size: 6.5vw;
        }

        p {
          font-size: 5vw;
        }

        form {
          > div {
            label {
            }
          }
        }
      }
    }
  }
}
</style>
