<script lang="ts" setup>
import { IProject } from "~/types/admin-api";

const route = useRoute();
const wrapper = ref<HTMLDivElement>();
// const wrapperHeight = ref("");
const sticky = ref<HTMLDivElement>();
const section = ref<HTMLElement>();
const scrollProgress = ref(0);
const wsHeight = ref(0);

const { getAllProjects } = usePublicData();
const { getProjectById } = usePublicData();
const { breakpoint } = useBreakpoints();

const { data: project } = useAsyncData(
  "project",
  async () => await getProjectById(route.params.id as string)
);

const { data: projects } = useAsyncData<IProject[]>(
  "projects",
  async () => await getAllProjects()
);

const onScroll = () => {
  if (!wrapper.value || !sticky.value) return;
  const rem = window.innerWidth / 100;
  const diff2 = window.scrollY - (section.value?.offsetTop || 0);
  if (diff2 > wrapper.value.offsetWidth - sticky.value.offsetWidth) return;
  if (diff2 > 0) return (scrollProgress.value = diff2 + 2 * rem);
  scrollProgress.value = 0;
};

onMounted(() => {
  if (!wrapper.value || projects.value?.length < 3 || breakpoint.value !== "lg")
    return;
  const diff = wrapper.value.offsetWidth - sticky.value.offsetWidth;
  wsHeight.value = diff + "px";
  // wrapperHeight.value = wrapper.value.scrollWidth + "px";
  window.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

const translate = computed(() => `${-scrollProgress.value}px`);

const title = computed(() => {
  if (project.value?.collab)
    return `Collab with ${project.value.collab.collab_with}`;
  return project.value?.title;
});

const collab = computed(() => project.value?.collab);
</script>

<template>
  <main>
    <Title> {{ project?.title }} </Title>
    <AppPageHead sub="projects" :title="title" />

    <AppProjectCollab v-if="collab" :collab="collab" />

    <div class="project">
      <section v-if="!project?.collab" class="author-quote">
        <div class="author-quote__person">
          <div>
            <img
              src="https://static.tildacdn.com/tild3635-6361-4035-a631-393037653235/0651.jpg"
              alt=""
            />
          </div>
          <div>
            <h3>
              Stanislav <br />
              Bartnikas
            </h3>
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
          <div class="author-quote__text__desc">
            <p>
              {{ project?.description }}
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
          v-for="details in project?.details"
          :key="`port-item-${details.id}`"
          :project-id="Number(project?.id)"
          :detail="details"
        />
      </section>
    </div>
    <section v-if="projects?.length" ref="section" class="more">
      <div ref="sticky" class="sticky-wrapper">
        <h2>More projects</h2>
        <div ref="wrapper" class="more__projects">
          <div
            v-for="item in projects"
            :key="item.id"
            class="project-item"
            @click="$router.push(`/projects/${item.id}`)"
          >
            <div class="project-item__img">
              <img
                :src="item.details[0].image.url"
                :alt="item.details[0].image_name"
              />
            </div>
            <div class="project-item__text">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="whitespace"></div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.project {
  padding: 2rem;
}

.sticky-wrapper {
  position: sticky;
  top: 100px;
  overflow: hidden;
  margin-right: -2rem;
}

.project-item {
  width: 33rem;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
  flex-shrink: 0;
  cursor: pointer;
  &__img {
    height: 17rem;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__text {
    padding: 2rem;
    h3 {
      font-size: 2.33rem;
      font-weight: 600;
    }
    p {
      font-size: 1.5rem;
      line-height: 1.25em;
      height: 7.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 1rem;
    }
  }
}
.whitespace {
  height: v-bind(wsHeight);
}
.more {
  padding: 2rem;
  padding-top: 4rem;
  // height: v-bind(wrapperHeight);
  h2 {
    font-size: 10rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  &__projects {
    display: flex;
    gap: 1rem;
    position: sticky;
    top: 100px;
    transform: translateX(v-bind(translate));
    width: fit-content;
  }
}
.author-quote {
  display: flex;
  margin-bottom: 100px;
  padding-inline: 2rem;
  gap: 4rem;

  &__person {
    display: flex;
    align-items: flex-start;
    gap: 40px;

    > div {
      &:first-child {
        width: 150px;
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
    gap: 2rem;
    flex-grow: 1;

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
      font-size: 2rem;
      line-height: 1.5;
    }
  }
}

.port-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 120px 15px;
}

.more {
  background-color: #eceae8;
}

@media screen and (max-width: 550px) {
  .project {
    padding: 80px 12px;
  }
  .author-quote {
    flex-direction: column;
    &__text p {
      font-size: 16px;
    }
    &__text svg {
      width: 24px !important;
    }
  }
  .port-list {
    grid-template-columns: 1fr;
    grid-gap: 60px 15px;
  }
}
</style>
