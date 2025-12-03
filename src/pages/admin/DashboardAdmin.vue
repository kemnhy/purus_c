<template>
  <!-- 통합 모니터링 -->
  <div class="p-4">
    <!-- 통계 카드 -->
    <DashboardStats :stats="stats" />

    <!-- 실시간 예약 현황 -->
    <div class="mt-10 bg-white rounded-2xl border border-gray-200 p-6">
      <!-- 헤더 -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">실시간 예약 현황</h2>
        <button @click="$router.push('reservationlist')" class=" cursor-pointer text-sm text-gray-500 hover:text-gray-700">더보기</button>
      </div>

      <!-- 테이블 -->
      <!-- 테이블 영역 -->
  <div class="overflow-x-auto">
    <table class="min-w-full text-center">
      <!-- 테이블 헤드 -->
      <thead>
        <tr class="border-b border-t border-[#8888] bg-[#D9D9D9]">
          <th
            class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]"
          >
            예약 일자
          </th>
          <th
            class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]"
          >
            예약자명
          </th>
          <th
            class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]"
          >
            연락처
          </th>
          <th
            class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]"
          >
            제빙기 모델
          </th>
          <th
            class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]"
          >
            결제 금액
          </th>
          <th
            class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]"
          >
            신청일
          </th>
          <th
            class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]"
          >
            상태
          </th>
        </tr>
      </thead>
      <!-- 테이블 바디 -->
      <tbody>
        <tr
          v-for="item in paginatedData"
          :key="item.id"
          class="border-b border-[#8888]"
        >
          <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
            {{ item.reservationDate }}
          </td>
          <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
            {{ item.customerName }}({{ item.cafeName }})
          </td>
          <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
            {{ item.phone }}
          </td>
          <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
            {{ item.iceMachineModel }}
          </td>
          <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
            {{ item.paymentAmount }}
          </td>
          <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
            {{ item.requestDate }}
          </td>
          <td class="py-3 px-3 opacity-80 border-r border-[#8888] font-bold">
            <span
              :class="
                item.status === 'waiting'
                  ? 'text-[#296AF1] font-medium'
                  : 'opacity-70 font-medium'
              "
            >
              {{ item.status === "waiting" ? "진행 예정" : "완료" }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    </div>
  </div>
</template>

<script setup>
import DashboardStats from "@/components/admin/DashboardStats.vue";
import { ref, computed } from "vue";
import customerData from "@/data/reservations.json";

const today = new Date().toLocaleDateString("ko-KR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// 통계카드
const stats = [
  {
    title: "오늘 신규 예약",
    date: today,
    value: "8",
    unit: "건",
    desc: "",
    link: "",
  },
  {
    title: "진행 중 작업",
    value: "64",
    unit: "건",
    desc: "처리 완료 12건",
    link: "예약 관리",
  },
  {
    title: "금일 결제액",
    value: "156,000",
    unit: "원",
    desc: "결제 취소 1건 24,000원",
    link: "매출결산",
  },
  {
    title: "리뷰 현황",
    value: "4.8",
    unit: "점",
    desc: "리뷰 작성률 63%",
    link: "고객 리뷰 관리",
  },
];


// 전체 데이터
const data = customerData;

// 페이지 관련 상태
const pageSize = 8; // 한 페이지에 8개
const currentPage = ref(1);

// 현재 페이지에 보여줄 데이터
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return data.slice(start, end);
});
</script>
