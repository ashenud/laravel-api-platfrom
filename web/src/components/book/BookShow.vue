<template>
  <div class="container mx-auto px-4 max-w-2xl mt-4">
    <div class="flex items-center justify-between">
      <router-link
        :to="{ name: 'BookList' }"
        class="text-blue-600 hover:text-blue-800"
      >
        &lt; Back to list
      </router-link>

      <div>
        <router-link
          v-if="item"
          :to="{ name: 'BookUpdate', params: { id: item['@id'] } }"
          class="px-6 py-2 mr-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700"
        >
          Edit
        </router-link>
        <button
          class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700"
          @click="deleteItem"
        >
          Delete
        </button>
      </div>
    </div>

    <h1 class="text-3xl my-4">Show Book {{ item?.["@id"] }}</h1>

    <div
      v-if="isLoading"
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

    <div v-if="item" class="overflow-x-auto">
      <table class="min-w-full">
        <thead class="border-b">
          <tr>
            <th scope="col" class="text-sm font-medium px-6 py-4 text-left">
              Field
            </th>
            <th scope="col" class="text-sm font-medium px-6 py-4 text-left">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
              scope="row"
            >
              book
            </th>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.book }}
                        </td>
          </tr>
          <tr class="border-b">
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
              scope="row"
            >
              condition
            </th>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.condition }}
                        </td>
          </tr>
          <tr class="border-b">
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
              scope="row"
            >
              title
            </th>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.title }}
                        </td>
          </tr>
          <tr class="border-b">
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
              scope="row"
            >
              author
            </th>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.author }}
                        </td>
          </tr>
          <tr class="border-b">
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
              scope="row"
            >
              rating
            </th>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.rating }}
                        </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useBookShowStore } from "@/stores/book/show";
import { useBookDeleteStore } from "@/stores/book/delete";
import { useMercureItem } from "@/composables/mercureItem";

const route = useRoute();
const router = useRouter();

const bookDeleteStore = useBookDeleteStore();
const { error: deleteError, deleted } = storeToRefs(bookDeleteStore);

const bookShowStore = useBookShowStore();
const { retrieved: item, isLoading, error } = storeToRefs(bookShowStore);

useMercureItem({
  store: bookShowStore,
  deleteStore: bookDeleteStore,
  redirectRouteName: "BookList",
});

await bookShowStore.retrieve(decodeURIComponent(route.params.id as string));

async function deleteItem() {
  if (!item?.value) {
    bookDeleteStore.setError("This item does not exist anymore");
    return;
  }

  if (window.confirm("Are you sure you want to delete this book?")) {
    await bookDeleteStore.deleteItem(item.value);

    if (deleted) {
      router.push({ name: "BookList" });
    }
  }
}

onBeforeUnmount(() => {
  bookShowStore.$reset();
});
</script>

