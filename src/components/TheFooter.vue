<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__info">
        <ul>
          <li>
            <NuxtLink to="/terms">
              Terms and Conditions
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/blog">
              Blog
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/faq">
              Faq
            </NuxtLink>
          </li>
        </ul>
        <div>
          <small>© 2012-{{ new Date().getFullYear() }} Stanislav Bartnikas</small>
        </div>
      </div>
      <div class="footer__logo">
        <div>
          <img src="https://static.tildacdn.com/tild3334-3963-4561-b762-653931396637/_2.svg" alt="" />
        </div>
        <div>
          <a href="javascript:void(0)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" data-v-f3669418="">
              <path class="st0"
                d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.376 2.708z"
                data-v-f3669418=""></path>
            </svg>
          </a>
          <a href="javascript:void(0)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" data-v-f3669418="">
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                data-v-f3669418=""></path>
            </svg>
          </a>
          <a href="javascript:void(0)">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:serif="http://www.serif.com/" version="1.1" xml:space="preserve"
              style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.1421;"
              data-v-f3669418="">
              <path id="telegram-1"
                d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"
                data-v-f3669418=""></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="footer__gromov">
        <div>
          <p>Designed by <a href="javascript:void(0)">Gromov Branding</a></p>
        </div>
        <div>
          <img src="https://static.tildacdn.com/tild3831-3639-4865-a337-316434333431/1.svg" alt="" />
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

    >ul {
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

    >div {

      small {
        color: #fff;
      }
    }
  }

  &__logo {
    >div {
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

    >div {
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
