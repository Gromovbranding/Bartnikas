<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__info">
        <ul>
          <li>
            <a>Terms and Conditions</a>
          </li>
          <li>
            <a>Blog</a>
          </li>
          <li>
            <a>FAQ</a>
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
          <a>
            <img
              src="https://static.tildacdn.com/tild3434-6430-4230-a165-376163343633/Facebook.png"
              alt=""
            />
          </a>
          <a>
            <img
              src="https://static.tildacdn.com/tild3230-3634-4135-a664-336339666464/Telegram.png"
              alt=""
            />
          </a>
          <a>
            <img
              src="https://static.tildacdn.com/tild6532-3366-4438-b836-356537633761/VK.png"
              alt=""
            />
          </a>
        </div>
      </div>
      <div class="footer__gromov">
        <div>
          <p>Designed by <a href="javascript:void(0)">Gromov Branding</a></p>
        </div>
        <div>
          <img
            src="https://static.tildacdn.com/tild3831-3639-4865-a337-316434333431/1.svg"
            alt=""
          />
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
    align-items: center;
  }

  &__info {
    > ul {
      display: flex;
      flex-direction: column;
      gap: 20px;

      li {
        &:hover {
          a {
            transform: translateX(15px);
            color: $colorAccentBlue;
          }
        }
      }

      a {
        color: #ffff;
        transition: color 0.3s ease, transform 0.4s ease-in;
        display: block;
        font-weight: bold;
        font-size: 30px;
      }
    }

    > div {
      margin-top: 90px;

      small {
        color: #fff;
      }
    }
  }

  &__logo {
    > div {
      &:first-child {
        width: 350px;
        height: 300px;

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
