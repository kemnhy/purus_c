<template>
  <!-- 고객 리뷰 관리 -->
  <div class="p-4">
    <!-- 통계 카드 -->
    <DashboardStats :stats="stats" />
  </div>
</template>

<script setup>
import DashboardStats from "@/components/admin/DashboardStats.vue";

// 고객 리뷰 더미
const stats = [
  {
    title: "전체 예약",
    value: "120",
    change: "+12%",
    icon: "fas fa-calendar-check",
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "전체 사용자",
    value: "50",
    change: "+5%",
    icon: "fas fa-users",
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "평균 평점",
    value: "4.8",
    change: "+0.2",
    icon: "fas fa-star",
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    title: "평균 평점",
    value: "4.8",
    change: "+0.2",
    icon: "fas fa-star",
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    title: "평균 평점",
    value: "4.8",
    change: "+0.2",
    icon: "fas fa-star",
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
];
</script>
