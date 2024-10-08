import { createRouter, createWebHistory } from "vue-router";

// B1: Định nghĩa danh sách các router
const routes = [
          {
            path: "/admin",
            component: () => import(/* webpackChunkName: "admin" */ "@/views/Dashboard.vue"),
            name: "Dashboard",
          },
          {
            path: "/admin/manager-user",
            component: () => import(/* webpackChunkName: "users" */ "@/views/ManagerUser.vue"),
            name: "managerUser",
          },
          {
            path: "/admin/manager-product",
            component: () => import(/* webpackChunkName: "products" */ "@/views/ManagerProduct.vue"),
            name: "managerProduct",
          },
        ]

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
