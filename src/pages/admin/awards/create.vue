<script lang="ts" setup>
// import { UploadUserFile } from "element-plus";
// import { IAwards } from "~/types/admin-api";

const name = ref("Add Award");
// const { fetchPost } = useApi();

useHeadSafe({
  title: name.value,
});

const form = reactive([
  {
    value: "",
    label: "Title",
    type: "input",
    prop: "title",
  },
  {
    value: "",
    label: "Description",
    type: "textarea",
    prop: "description",
  },
]);

const handleCreate = () =>
  // body: IAwards | null = null
  // images: UploadUserFile[]
  {
    // if (!body) return;
    // const { description, title } = body;
    // fetchPost("/awards", {
    //   title,
    //   description,
    // });
  };

// {
//   "awards_avatar": {
//     "name": "string",
//     "url": "string"
//   },
//   "title": "string",
//   "description": "string",
//   "degress": [
//     {
//       "year": "2023-05-12T03:07:58.281Z",
//       "groups": [
//         {
//           "type": "Gold",
//           "images": [
//             {
//               "name": "string",
//               "url": "string"
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreateAwards
        :form="form"
        :name="name"
        back="awards"
        :cb-create="handleCreate"
      />
    </ClientOnly>
  </div>
</template>
