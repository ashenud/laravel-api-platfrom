import { defineStore } from "pinia";
import api from "@/utils/api";
import type { Company } from "@/types/company";
import type { DeleteState } from "@/types/stores";

interface State extends DeleteState<Company> {}

export const useCompanyDeleteStore = defineStore("companyDelete", {
  state: (): State => ({
    deleted: undefined,
    mercureDeleted: undefined,
    isLoading: false,
    error: undefined,
  }),

  actions: {
    async deleteItem(item: Company) {
      this.setError("");
      this.toggleLoading();

      if (!item?.["@id"]) {
        this.setError("No company found. Please reload");
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

    setDeleted(deleted: Company) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Company | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
