<script lang="ts" setup>
const config = useRuntimeConfig();
const route = useRoute();
const projectId = route.params.id;

const project = ref(null);
const fetchProject = async () => {
  const { data } = await useFetch(`${config.apiBaseUrl}/projects/${projectId}`);
  project.value = data.value;
};

fetchProject();
</script>

<template>
  <main>
    <Title> Landscape </Title>
    <AppPageHead sub="projects" title="Landscape" />

    <div class="project">
      <section class="author-quote">
        <div class="author-quote__person">
          <div>
            <img
              src="https://static.tildacdn.com/tild3635-6361-4035-a631-393037653235/0651.jpg"
              alt=""
            />
          </div>
          <div>
            <h3>Stanislav Bartnikas</h3>
          </div>
        </div>
        <div class="author-quote__text">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              clip-rule="evenodd"
              width="30"
              height="30"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
            >
              <path
                d="m2.699 20c-.411 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.016.092-4.326-2.582-4.326-4.258 0-2.006 1.738-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.834 10.693-8.468 10.693zm10.833 0c-.41 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.015.092-4.326-2.582-4.326-4.258 0-2.006 1.739-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.833 10.693-8.468 10.693z"
                fill-rule="nonzero"
              />
            </svg>
          </div>
          <div>
            <p>
              To me this isn’t only a photo, it’s a work of art. It’s painterly
              quality plus the graphic nature of the landscape takes this beyond
              the ordinary aerial. Yes, it’s right place right time, but it’s
              technically great because it’s absolutely sharp and crisp. Hope to
              see more of your photos!
            </p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              clip-rule="evenodd"
              width="30"
              height="30"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
            >
              <path
                d="m2.699 20c-.411 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.016.092-4.326-2.582-4.326-4.258 0-2.006 1.738-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.834 10.693-8.468 10.693zm10.833 0c-.41 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.015.092-4.326-2.582-4.326-4.258 0-2.006 1.739-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.833 10.693-8.468 10.693z"
                fill-rule="nonzero"
              />
            </svg>
          </div>
        </div>
      </section>

      <section class="port-list">
        <AppPortOrder
          v-for="img in project?.project_images"
          :key="`port-item${img.id}`"
          :project-id="project?.id"
          :project-image="img"
        />
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.project {
  padding: 80px 40px;
}
.author-quote {
  display: flex;
  gap: 100px;
  margin-bottom: 100px;

  &__person {
    display: flex;
    align-items: center;
    gap: 40px;

    > div {
      &:first-child {
        width: 220px;
        height: 150px;

        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: $borderRadiusMain;
        }
      }

      &:last-child {
        h3 {
          font-size: 34px;
          font-weight: bold;
          line-height: 1.3;
        }
      }
    }
  }

  &__text {
    display: flex;
    gap: 40px;

    > div {
      &:first-child {
        svg {
          transform: rotate(180deg);
        }
      }

      &:nth-child(odd) {
        svg {
          fill: $colorAccentBlue;
          stroke: $colorAccentBlue;
          width: 52px;
          height: 52px;
        }
      }

      &:last-child {
        align-self: flex-end;
      }
    }

    p {
      font-size: 42px;
      line-height: 1.5;
    }
  }
}

.port-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 120px 15px;
}
</style>
