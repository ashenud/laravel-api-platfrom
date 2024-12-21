<template>
  <div class="container mx-auto px-4 max-w-2xl mt-4">
    <div class="flex items-center justify-between">
      <router-link
        :to="{ name: 'BookList' }"
        class="text-blue-600 hover:text-blue-800"
      >
        &lt; Back to list
      </router-link>

      <button
        class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700"
        @click="deleteItem"
      >
        Delete
      </button>
    </div>

    <h1 class="text-3xl my-4">Edit Book {{ item?.["@id"] }}</h1>

    <div
      v-if="isLoading || deleteLoading"
      class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm"
      role="status"
    >
      Loading...
    </div>

    <div
      v-if="error || deleteError"
      class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      role="alert"
    >
      {{ error || deleteError }}
    </div>

    <div
      v-if="created || updated"
      class="bg-green-100 rounded py-4 px-4 my-2 text-green-700 text-sm"
      role="status"
    >
      <template v-if="created">{{ created["@id"] }} created. </template>
      <template v-else-if="updated">{{ updated["@id"] }} updated. </template>
    </div>

    <Form v-if="item" :values="item" :errors="violations" @submit="update" />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useBookCreateStore } from "@/stores/book/create";
import { useBookDeleteStore } from "@/stores/book/delete";
import { useBookUpdateStore } from "@/stores/book/update";
import type { Book } from "@/types/book";
import Form from "@/components/book/BookForm.vue";
import { useMercureItem } from "@/composables/mercureItem";

const route = useRoute();
const router = useRouter();

const bookCreateStore = useBookCreateStore();
const { created } = storeToRefs(bookCreateStore);

const bookDeleteStore = useBookDeleteStore();
const { error: deleteError, isLoading: deleteLoading } =
  storeToRefs(bookDeleteStore);

const bookUpdateStore = useBookUpdateStore();
const {
  retrieved: item,
  updated,
  error,
  isLoading,
  violations,
} = storeToRefs(bookUpdateStore);

useMercureItem({
  store: bookUpdateStore,
  deleteStore: bookDeleteStore,
  redirectRouteName: "BookList",
});

await bookUpdateStore.retrieve(decodeURIComponent(route.params.id as string));

function update(item: Book) {
  bookUpdateStore.update(item);
}

async function deleteItem() {
  if (!item?.value) {
    bookUpdateStore.setError("No book found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this book?")) {
    await bookDeleteStore.deleteItem(item.value);

    if (bookDeleteStore.deleted) {
      router.push({ name: "BookList" });
    }
  }
}

onBeforeUnmount(() => {
  bookUpdateStore.$reset();
  bookCreateStore.$reset();
  bookDeleteStore.$reset();
});
</script>
