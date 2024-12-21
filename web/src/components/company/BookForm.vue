<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="book_book"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        book
      </label>
      <input
        id="book_book"
        v-model="item.book"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.book ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        required
        placeholder=""
      />
      <div
        v-if="violations?.book"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.book }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="book_condition"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        condition
      </label>
      <input
        id="book_condition"
        v-model="item.condition"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.condition ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        required
        placeholder=""
      />
      <div
        v-if="violations?.condition"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.condition }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="book_title"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        title
      </label>
      <input
        id="book_title"
        v-model="item.title"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.title ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.title"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.title }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="book_author"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        author
      </label>
      <input
        id="book_author"
        v-model="item.author"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.author ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.author"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.author }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="book_rating"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        rating
      </label>
      <input
        id="book_rating"
        v-model="item.rating"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.rating ? 'border-red-500' : 'border-gray-300',
        ]"
        type="number"
        placeholder=""
      />
      <div
        v-if="violations?.rating"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.rating }}
      </div>
    </div>

    <button
      type="submit"
      class="px-6 py-2 bg-green-500 text-white font-medium rounded shadow-md hover:bg-green-600"
    >
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { toRef, ref, type Ref } from "vue";
import type { Book } from "@/types/company";
import type { SubmissionErrors } from "@/types/error";

const props = defineProps<{
  values?: Book;
  errors?: SubmissionErrors;
}>();

const emit = defineEmits<{
  (e: "submit", item: Book): void;
}>();

const violations = toRef(props, "errors");

let item: Ref<Book> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

function emitSubmit() {
  emit("submit", item.value);
}
</script>
