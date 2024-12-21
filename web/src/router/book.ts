export default [
  {
    name: "BookList",
    path: "/admin/books/",
    component: () => import("@/views/book/ViewList.vue"),
  },
  {
    name: "BookCreate",
    path: "/admin/books/create",
    component: () => import("@/views/book/ViewCreate.vue"),
  },
  {
    name: "BookUpdate",
    path: "/admin/books/edit/:id",
    component: () => import("@/views/book/ViewUpdate.vue"),
  },
  {
    name: "BookShow",
    path: "/admin/books/show/:id",
    component: () => import("@/views/book/ViewShow.vue"),
  },
];
