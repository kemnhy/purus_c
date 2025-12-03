<template>
  <!-- 통계 -->
  <div class="p-4">
    <!-- 통계 카드 -->
    <DashboardStats :stats="stats" />

    <div class="mt-10 bg-white rounded-2xl border border-gray-200 p-6">
      <!-- 헤더 -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">월별 예약</h2>
        <!-- 년도 선택 -->
         
      </div>
    </div>
  </div>
</template>

<script setup>
import DashboardStats from "@/components/admin/DashboardStats.vue";

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
</script>
