<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { ref } from "vue";
import api from "../utils/axios";
import axios from "axios";
import { useRouter } from "vue-router";
import { saveUserToken } from "../utils/authUtil";
import { PATH } from "../constant/path";

interface ILoginForm {
  username: string;
  password: string;
}

const router = useRouter();
const isLoading = ref<boolean>(false);
const loginErrorMessage = ref<string>("");

const schema = toTypedSchema(
  z.object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(1, { message: "Username is required" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, { message: "Password is required" }),
  })
);

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: schema,
});

const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");

const inputClass = ref({
  input: "bg-gray-50 border border-gray-300 text-gray-900",
  label: "text-gray-900",
});
const errorInputClass = ref({
  input:
    "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-600 focus:border-red-600  focus:outline-none focus:ring-0 focus:outline-none focus:ring-0",
  label: "text-red-700",
});

const onSubmit = handleSubmit(async (values: ILoginForm) => {
  loginErrorMessage.value = "";
  isLoading.value = true;

  try {
    const response = await api.post("/auth/login", values);
    saveUserToken(response.data.access_token);
    router.push({ path: PATH.INDEX });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      loginErrorMessage.value = err.response?.data.message;
    }
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <section class="bg-gradient-to-t from-green-300 to-green-100 h-dvh">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        Farmer web
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit="onSubmit">
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium"
                :class="
                  !errors.username ? inputClass.label : errorInputClass.label
                "
              >
                Username</label
              >
              <input
                v-model="username"
                v-bind="usernameAttrs"
                type="username"
                name="username"
                id="username"
                class="sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 focus:outline-none focus:ring-0"
                :class="
                  !errors.username ? inputClass.input : errorInputClass.input
                "
                placeholder="Username"
              />

              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {{ errors.username }}
              </p>
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                :class="
                  !errors.password ? inputClass.label : errorInputClass.label
                "
                >Password</label
              >
              <input
                v-model="password"
                v-bind="passwordAttrs"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 focus:outline-none focus:ring-0"
                :class="
                  !errors.password ? inputClass.input : errorInputClass.input
                "
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {{ errors.password }}
              </p>

              <div class="text-sm text-red-600 dark:text-red-500">
                {{ loginErrorMessage }}
              </div>
            </div>

            <button
              type="submit"
              class="w-full flex justify-center items-center gap-2 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              :disabled="isLoading"
            >
              <div role="status" v-if="isLoading">
                <svg
                  aria-hidden="true"
                  class="inline w-6 h-6 text-gray-200 animate-spin fill-yellow-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>

              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
