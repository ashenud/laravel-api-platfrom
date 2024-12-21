export default [
  {
    name: "CompanyList",
    path: "/companies/",
    component: () => import("@/views/company/ViewList.vue"),
  },
  {
    name: "CompanyCreate",
    path: "/companies/create",
    component: () => import("@/views/company/ViewCreate.vue"),
  },
  {
    name: "CompanyUpdate",
    path: "/companies/edit/:id",
    component: () => import("@/views/company/ViewUpdate.vue"),
  },
  {
    name: "CompanyShow",
    path: "/companies/show/:id",
    component: () => import("@/views/company/ViewShow.vue"),
  },
];
