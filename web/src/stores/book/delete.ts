import { defineStore } from "pinia";
import api from "@/utils/api";
import type { Book } from "@/types/book";
import type { DeleteState } from "@/types/stores";

interface State extends DeleteState<Book> {}

export const useBookDeleteStore = defineStore("bookDelete", {
  state: (): State => ({
    deleted: undefined,
    mercureDeleted: undefined,
    isLoading: false,
    error: undefined,
  }),

  actions: {
    async deleteItem(item: Book) {
      this.setError("");
      this.toggleLoading();

      if (!item?.["@id"]) {
        this.setError("No book found. Please reload");
        return;
      }

      try {
        await api(item["@id"], { method: "DELETE" });

        this.toggleLoading();
        this.setDeleted(item);
        this.setMercureDeleted(undefined);
      } catch (error) {
        this.toggleLoading();

        if (error instanceof Error) {
          this.setError(error.message);
        }
      }
    },

    toggleLoading() {
      this.isLoading = !this.isLoading;
    },

    setDeleted(deleted: Book) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Book | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
