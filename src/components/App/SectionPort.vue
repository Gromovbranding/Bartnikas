<script lang="ts" setup>
interface Props {
  // bigImg: string;
  // smallImg: string;
  // title: string;
  // desciption: string;
  // photoCounter: number | string;
  direction?: "row" | "row-reverse";
}

withDefaults(defineProps<Props>(), {
  direction: "row",
});
</script>

<template>
  <section>
    <div class="port">
      <div class="port__img">
        <div class="scale">
          <img
            src="https://static.tildacdn.com/tild3938-6661-4930-b962-343337353537/IMGP9984_1.jpg"
          />
        </div>
      </div>
      <div class="port__content">
        <div class="scale">
          <img
            src="https://static.tildacdn.com/tild3664-3366-4532-b637-363135333132/CF003255_1.jpg"
          />
        </div>
        <div class="port__text">
          <a href="javascript:void(0)">
            <div>
              <img
                src="https://static.tildacdn.com/tild3763-3936-4434-a163-353739653437/photo_camera.svg"
                alt=""
              />
              <p>72</p>
            </div>
            <h2>Urban</h2>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt voluptates placeat ipsam tenetur voluptate facere modi
                necessitatibus odio delectus atque ratione, incidunt, quasi
                dignissimos vero?
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.port {
  display: flex;
  width: 100%;
  flex-direction: v-bind(direction);
  margin-top: 30px;

  &__img {
    flex: 0 0 790px;

    > div {
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    width: 100%;

    img {
      width: 100%;
      height: 550px;
    }
  }

  &__text {
    border-radius: $borderRadiusMain;
    background-color: $colorBackgroundGrey;
    padding-bottom: 90px;
    padding-left: 60px;
    padding-top: 40px;

    small {
      font-size: 18px;
    }

    h2 {
      font-size: 45px;
    }

    > a > div {
      &:first-child {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        gap: 10px;

        img {
          width: 25px;
          height: 25px;
        }

        p {
          font-size: 35px;
          font-weight: 300;
        }
      }

      &:last-child {
        max-width: 900px;
        margin-top: 95px;

        p {
          font-size: 30px;
          line-height: 40px;
          font-weight: 300;
        }
      }
    }
  }
}
</style>
