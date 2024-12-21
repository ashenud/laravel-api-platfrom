import { defineStore } from "pinia";
import api from "@/utils/api";
import { extractHubURL } from "@/utils/mercure";
import type { Company } from "@/types/company";
import type { View } from "@/types/view";
import type { ListState } from "@/types/stores";
import type { PagedCollection } from "@/types/collection";

interface State extends ListState<Company> {}

export const useCompanyListStore = defineStore("CompanyList", {
  state: (): State => ({
    items: [],
    isLoading: false,
    error: undefined,
    hubUrl: undefined,
    view: undefined,
  }),

  actions: {
    async getItems(page?: string) {
      this.setError("");
      this.toggleLoading();

      try {
        const path = page ? `api/companies?page=${page}` : "api/companies";
        const response = await api(path);
        const data: PagedCollection<Company> = await response.json();
        const hubUrl = extractHubURL(response);

        this.toggleLoading();

        console.log(data["member"]);

        this.setItems(data["member"]);
        this.setView(data["view"]);

        if (hubUrl) {
          this.setHubUrl(hubUrl);
        }
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

    setItems(items: Company[]) {
      this.items = items;
    },

    setView(view: View) {
      this.view = view;
    },

    setHubUrl(hubUrl: URL) {
      this.hubUrl = hubUrl;
    },

    setError(error: string) {
      this.error = error;
    },

    updateItem(updatedItem: Company) {
      const item: Company | undefined = this.items.find(
        (i) => i["@id"] === updatedItem["@id"]
      );

      if (!item) return;

      Object.assign(item, updatedItem);
    },

    deleteItem(deletedItem: Company) {
      this.items = this.items.filter((item) => {
        return item["@id"] !== deletedItem["@id"];
      });
    },
  },
});
