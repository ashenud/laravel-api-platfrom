<template>
  <Suspense>
    <List />

    <template #fallback>Loading...</template>
  </Suspense>
</template>

<script setup lang="ts">
import List from "@/components/company/CompanyList.vue";
</script>
