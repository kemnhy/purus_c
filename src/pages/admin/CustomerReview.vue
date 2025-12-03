<template>
  <!-- 고객 리뷰 관리 -->
  <div class="p-4">
    <!-- 통계 카드 -->
    <DashboardStats :stats="stats" />

    <!-- 알림 목록 -->
    <h1 class="mb-2 text-lg text-[#092857] font-bold">목록</h1>
    <!-- 테이블 영역 -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-center">
        <!-- 테이블 헤드 -->
        <thead>
          <tr class="border-b border-t border-[#8888] bg-[#F4F4F4]">
            <th class="py-3 font-medium opacity-70 border-r border-[#8888]">번호</th>
            <th class="py-3 font-medium opacity-70 border-r border-[#8888]">리뷰 내용</th>
            <th class="py-3 font-medium opacity-70 border-r border-[#8888]">작성일</th>
            <th class="py-3 font-medium opacity-70 border-r border-[#8888]">평점</th>
            <th class="py-3 font-medium opacity-70 border-r border-[#8888]">고객명</th>
            <th class="py-3 font-medium opacity-70 border-r border-[#8888]">연락처</th>
            <th class="py-3 font-medium opacity-70 border-r border-[#8888]">쿠폰상태</th>
            <th class="py-3 font-medium opacity-70">관리</th>
          </tr>
        </thead>
        <!-- 테이블 바디 -->
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id" class="border-b border-[#8888]">
            <td class="py-4 opacity-80 border-r border-[#8888]">{{ item.id }}</td>
            <td class="py-4 pl-3 opacity-80 border-r border-[#8888] text-left">
              {{ item.content }}
            </td>
            <td class="py-4 opacity-80 border-r border-[#8888]">{{ item.date }}</td>
            <td class="py-4 opacity-80 border-r border-[#8888]">{{ item.rating }}</td>
            <td class="py-4 opacity-80 border-r border-[#8888]">{{ item.customer }}</td>
            <td class="py-4 opacity-80 border-r border-[#8888]">{{ item.contact }}</td>
            <td class="py-1 border-r border-[#8888] opacity-80">
              <button
                class="px-3 py-1 rounded-md"
                :class="{
                  'text-[#888888] font-bold': item.status === 'complete',
                  'bg-[#f1f1f1] font-bold': item.status === 'waiting',
                  'bg-[#296af1] text-white font-bold': item.status === 'planning',
                }">
                {{
                  item.status === "complete"
                    ? "사용 완료"
                    : item.status === "waiting"
                    ? "지급 완료"
                    : item.status === "planning"
                    ? "지급 예정"
                    : ""
                }}
              </button>
            </td>
            <!-- 관리 -->
            <td class="py-3 flex justify-center gap-3">
              <button @click="delReview(item)" class="opacity-60 cursor-pointer">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 페이지네이션 -->
    <div class="flex justify-between items-center mt-4 text-sm px-5">
      <span class="text-gray-500">페이지 {{ currentPage }} / {{ totalPages }}</span>
      <div class="flex gap-2">
        <button
          type="button"
          @click="goPrev"
          :class="[
            'px-3 py-1 rounded-lg border',
            currentPage === 1
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-gray-300 hover:bg-gray-50 cursor-pointer',
          ]">
          이전
        </button>
        <button
          type="button"
          @click="goNext"
          :class="[
            'px-3 py-1 rounded-lg border',
            currentPage === totalPages
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-gray-300 hover:bg-gray-50 cursor-pointer',
          ]">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import DashboardStats from "@/components/admin/DashboardStats.vue";
import { computed, ref } from "vue";

// 고객 리뷰 상태 더미
const stats = [
  {
    title: "총점 현황",
    value: "4.9",
    unit: "점",
  },
  {
    title: "총 리뷰수",
    value: "233",
    unit: "건",
  },
  {
    title: "리뷰 작성률",
    value: "63",
    unit: "%",
  },
  {
    title: "쿠폰 지급 예정",
    value: "1",
    unit: "건",
  },
  {
    title: "재방문 신청",
    value: "3",
    unit: "건",
  },
];

const reviews = ref([
  {
    id: 1,
    content: "청소가 매우 꼼꼼하게 잘 되어 만족합니다.",
    date: "2025-01-03",
    rating: 5,
    customer: "김사장",
    contact: "010-1234-5678",
    status: "complete",
  },
  {
    id: 2,
    content: "약간 늦게 도착했지만 서비스는 좋았습니다.",
    date: "2025-01-05",
    rating: 4,
    customer: "이사장",
    contact: "010-2345-6789",
    status: "complete",
  },
  {
    id: 3,
    content: "예약 시간 변경이 가능해서 편리했습니다.",
    date: "2025-01-08",
    rating: 4,
    customer: "최사장",
    contact: "010-3456-7890",
    status: "complete",
  },
  {
    id: 4,
    content: "청소 후 냄새가 조금 남았습니다.",
    date: "2025-01-10",
    rating: 3,
    customer: "박사장",
    contact: "010-4567-8901",
    status: "complete",
  },
  {
    id: 5,
    content: "직원분이 친절하고 설명도 잘 해주셨습니다.",
    date: "2025-01-12",
    rating: 5,
    customer: "진사장",
    contact: "010-5678-9012",
    status: "waiting",
  },
  {
    id: 6,
    content: "서비스는 좋았지만 시간이 조금 부족했습니다.",
    date: "2025-01-14",
    rating: 4,
    customer: "문사장",
    contact: "010-6789-0123",
    status: "waiting",
  },
  {
    id: 7,
    content: "다음에 또 이용하고 싶습니다.",
    date: "2025-01-16",
    rating: 5,
    customer: "윤사장",
    contact: "010-7890-1234",
    status: "waiting",
  },
  {
    id: 8,
    content: "처음 이용했는데 만족스럽습니다.",
    date: "2025-01-19",
    rating: 4,
    customer: "한사장",
    contact: "010-8901-2345",
    status: "waiting",
  },
  {
    id: 9,
    content: "청소 중 일부 장비가 고장났습니다.",
    date: "2025-01-22",
    rating: 3,
    customer: "강사장",
    contact: "010-9012-3456",
    status: "planning",
  },
  {
    id: 10,
    content: "다음 예약이 기대됩니다.",
    date: "2025-01-25",
    rating: 5,
    customer: "은사장",
    contact: "010-0123-4567",
    status: "planning",
  },
]);

// 페이지 관련 상태
const pageSize = 8; // 한 페이지에 8개
const currentPage = ref(1);

// 총 페이지 수
const totalPages = computed(() => Math.ceil(reviews.value.length / pageSize));

// 현재 페이지에 보여줄 데이터
const paginatedData = computed(() => {
  const sorted = [...reviews.value].sort((a, b) => b.id - a.id); // id 기준 내림차순
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return sorted.slice(start, end);
});

// 페이지 이동 함수
const goPrev = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const goNext = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// 리뷰 삭제
const delReview = (item) => {
  const isConfirmed = confirm("공지사항을 삭제하시겠습니까?");
  if (isConfirmed) {
    reviews.value = reviews.value.filter((n) => n.id !== item.id);
    alert("삭제되었습니다."); // 선택 사항
  }
};
</script>
