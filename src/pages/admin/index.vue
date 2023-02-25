<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

await navigateTo("/admin/news");
</script>
