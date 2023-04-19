<script lang="ts" setup>
definePageMeta({
  layout: false,
});

const { login } = useApi();

const username = ref("");
const password = ref("");

const onSubmit = async () => {
  await login({
    username: username.value,
    password: password.value,
  });
};
</script>

<template>
  <div class="admin-auth-layout">
    <ClientOnly>
      <main class="admin-auth-layout__main">
        <div class="login">
          <h3 class="login__header">Login Form</h3>
          <form class="login__form">
            <div class="login__form-input">
              <Icon
                class="login__form-input-icon"
                name="ep:user-filled"
                size="20px"
              />
              <input v-model="username" placeholder="Username" />
            </div>
            <div class="login__form-input">
              <Icon
                class="login__form-input-icon"
                name="ic:round-lock"
                size="20px"
              />
              <input
                v-model="password"
                autocomplete="true"
                type="password"
                placeholder="Password"
              />
            </div>
            <ElButton
              class="login__form-submit"
              size="large"
              type="primary"
              @click="onSubmit"
            >
              Login
            </ElButton>
          </form>
        </div>
      </main>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/admin/config-reset.scss";

.admin-auth-layout {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
}

.login {
  position: relative;
  width: 448px;
  padding: 0px 0 160px;

  &__header {
    font-size: 26px;
    font-weight: 500;
    color: #eee;
    margin-bottom: 40px;
    text-align: center;
  }

  &__form {
    &-input {
      display: flex;
      align-items: center;
      height: 52px;
      margin-bottom: 22px;
      border: 1px solid hsla(0, 0%, 100%, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #889aa4;

      input {
        font-size: 14px;
        width: 100%;
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 12px 5px 12px 14px;
        color: #fff;
        height: 47px;
        caret-color: #fff;
      }
      input:focus {
        outline: 0;
      }
      input::placeholder {
        font-size: 14px;
        opacity: 0.7;
        color: #fff;
      }

      &-icon {
        margin-left: 16px;
      }
    }

    &-submit {
      width: 100%;
    }
  }
}
</style>
