import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import Navbar from "../components/Navbar.vue";
import Index from "../pages/Index.vue";
import Login from "../pages/Login.vue";
import { getUserToken } from "../utils/authUtil";
import { PATH } from "../constant/path";
import AddTransaction from "../pages/AddTransaction.vue";

const routes: RouteRecordRaw[] = [
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
  {
    name: "AddTransaction",
    path: PATH.ADD_TRANSACTION,
    components: {
      navbar: Navbar,
      default: AddTransaction,
    },
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
