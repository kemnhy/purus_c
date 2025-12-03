<template>
  <!-- 통계 -->
  <div class="p-4">
    <!-- 통계 카드 -->
    <DashboardStats :stats="stats" />

    <div class="mt-10 bg-white rounded-2xl border border-gray-200 p-6">
      <!-- 헤더 -->
      <div class="flex items-center gap-3 mb-4">
        <h2 class="text-lg font-semibold text-gray-800">월별 예약</h2>
        <!-- 년도 선택 -->
        <select
          class="w-30 h-10 bg-white border border-[#8888] rounded-md py-1 px-2 text-[#888]"
          v-model="searchField">
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <!-- 차트 -->
      <Chart :labels="monthLabels" :data="monthlyCounts" />
    </div>
  </div>
</template>

<script setup>
import Chart from "@/components/admin/Chart.vue";
import DashboardStats from "@/components/admin/DashboardStats.vue";
import { ref } from "vue";

// 통계 더미
const stats = [
  {
    title: "2025년 예약 내역",
    value: "370",
    unit: "건",
    desc: "취소 건수 23건",
  },
  {
    title: "2025년 누계 수입",
    value: "34,750,000",
    unit: "원",
    desc: "환불 금액 -75,000원",
  },
];

const searchField = ref("2025");
</script>
