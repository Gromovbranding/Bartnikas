<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__info">
        <ul>
          <li>
            <NuxtLink to="/terms"> Terms and Conditions </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/blog"> Blog </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/faq"> Faq </NuxtLink>
          </li>
        </ul>
        <div>
          <small
            >© 2012-{{ new Date().getFullYear() }} Stanislav Bartnikas</small
          >
        </div>
      </div>
      <div class="footer__logo">
        <div>
          <img
            src="https://static.tildacdn.com/tild3334-3963-4561-b762-653931396637/_2.svg"
            alt=""
          />
        </div>
        <div>
          <a href="javascript:void(0)">
            <IconSocial is-vk />
          </a>
          <a href="javascript:void(0)">
            <IconSocial is-facebook />
          </a>
          <a href="javascript:void(0)">
            <IconSocial is-telegram />
          </a>
        </div>
      </div>
      <div class="footer__gromov">
        <div>
          <p>Designed by <a href="javascript:void(0)">Gromov Branding</a></p>
        </div>
        <div>
          <IconGromov />
        </div>
        <div>
          <p>{{ new Date().getFullYear() }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  &__content {
    background-color: #000000;
    border-radius: $borderRadiusMain;
    padding: 80px 40px;
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
    > div {
      &:first-child {
        width: 470px;
        height: 370px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      &:last-child {
        display: flex;
        justify-content: center;
        gap: 15px;
        align-items: center;

        a {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          transition: background-color 0.3s ease-in-out;

          &:hover {
            background-color: $colorAccentBlue;
          }

          svg {
            width: 24px;
            height: 24px;
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
</style>
