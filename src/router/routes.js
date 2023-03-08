export const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/v1/Home/HomeView.vue"),
  },

  {
    path: "/404",
    name: "404",
    component:
      require(/* webpackChunkName: "Error" */ "../components/Error/ErrorPage404")
        .default,
  },
  {
    path: "*",
    redirect: "404",
  },
];
