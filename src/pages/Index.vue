<script setup lang="ts">
import { useRouter } from "vue-router";
import axios from "axios";
import { onMounted, ref } from "vue";
import api from "../utils/axios";
import { PATH } from "../constant/path";
import { ITransaction } from "../interfaces/transaction";
import TableSkeleton from "../components/Skeleton/TableSkeleton.vue";
import type { Header } from "vue3-easy-data-table";

const router = useRouter();
const isLoading = ref<boolean>(false);
const transactions = ref<ITransaction[]>([]);
const headers: Header[] = [
  { text: "Id", value: "Id", sortable: true },
  { text: "Description", value: "Description" },
  { text: "UnitPrice", value: "UnitPrice", sortable: true },
  { text: "Amount", value: "Amount", sortable: true },
  { text: "UserId", value: "UserId" },
];

const getAllAssets = async () => {
  isLoading.value = true;

  try {
    const response = await api.get("/fabric-network/all-assets");
    transactions.value = response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        router.push({
          path: PATH.LOGIN,
        });
      }
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getAllAssets();
});
</script>

<template>
  <div class="p-8">
    <div class="flex justify-center">
      <TableSkeleton v-if="isLoading" />

      <div class="w-5/6" v-else>
        <div class="flex justify-between my-2">
          <p class="text-2xl text-gray-900 dark:text-white">
            Transaction Table
          </p>

          <button
            type="button"
            class="px-2.5 py-2.5 text-sm font-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
            @click="router.push({ path: PATH.ADD_TRANSACTION })"
          >
            Create Transaction
          </button>
        </div>

        <EasyDataTable
          class="transaction-table"
          :headers="headers"
          :items="transactions"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.transaction-table {
}
</style>
