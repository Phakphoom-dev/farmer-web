<script lang="ts" setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { getUserToken } from "../utils/authUtil";
import { IUser } from "../interfaces/user";
import { PATH } from "../constant/path";

const user = getUserToken() as IUser;
const router = useRouter();

const fullName = computed(() => {
  return `${user.firstname} ${user.lastname}`;
});

const logout = () => {
  localStorage.clear();
  router.push({ path: PATH.LOGIN });
};
</script>

<template>
  <header class="antialiased">
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-4 dark:bg-gray-800">
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
          <a href="#" class="flex mr-4">
            <span
              class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
              >Farmer web</span
            >
          </a>
        </div>

        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <div
                @click="router.push({ path: PATH.INDEX })"
                class="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Home
              </div>
            </li>
          </ul>
        </div>

        <div class="flex gap-4 items-center lg:order-2">
          <div class="flex mx-3 text-sm rounded-full md:mr-0">
            {{ fullName }}
          </div>

          <button
            @click="logout"
            class="text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm px-4 py-2 text-center"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
