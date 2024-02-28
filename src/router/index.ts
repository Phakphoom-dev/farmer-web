import { createRouter, createWebHistory } from "vue-router";

import Navbar from "../components/Navbar.vue";
import Index from "../pages/Index.vue";
import Login from "../pages/Login.vue";
import { getUserToken } from "../utils/authUtil";
import { PATH } from "../constant/path";

const routes = [
  {
    name: "Index",
    path: PATH.INDEX,
    components: {
      navbar: Navbar,
      default: Index,
    },
  },
  {
    name: "Login",
    path: PATH.LOGIN,
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const user = await getUserToken();

  if (to.path !== PATH.LOGIN && !user) next({ path: PATH.LOGIN });
  else next();
});

export default router;
