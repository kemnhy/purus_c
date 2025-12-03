<template>
  <!-- 금일 예약 관리 -->
  <div class="p-4">
    <!-- 통계 카드 -->
    <DashboardStats :stats="stats" />

    <!-- 필터링 검색 박스 -->
    <div class="py-4 flex gap-3">
      <select
        class="w-30 h-10 bg-white border border-[#8888] rounded-md py-1 px-2 text-[#888]"
        v-model="searchField">
        <option value="name">예약자명</option>
        <option value="phone">연락처</option>
      </select>
      <input
        type="text"
        @input="handleInput"
        v-model="searchText"
        class="h-10 w-60 bg-white border border-[#8888] rounded-md py-1 px-2"
        placeholder="검색어를 입력하세요" />
      <button
        class="h-10 px-4 rounded-md bg-[#53698A] text-white cursor-pointer"
        type="button"
        @click="handleSearch">
        검색
      </button>
    </div>
    <!-- 테이블 영역 -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-center">
        <!-- 테이블 헤드 -->
        <thead>
          <tr class="border-b border-t border-[#8888] bg-[#F4F4F4]">
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">예약 일자</th>
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">예약자명</th>
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">연락처</th>
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">주소</th>
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">담당 기사</th>
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">제빙기 모델</th>
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">결제 금액</th>
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">신청일</th>
            <th class="py-3 px-3 font-medium opacity-70">관리</th>
          </tr>
        </thead>
        <!-- 테이블 바디 -->
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id" class="border-b border-[#8888]">
            <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
              {{ item.reservationDate }}
            </td>
            <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
              {{ item.customerName }}
            </td>
            <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
              {{ item.phone }}
            </td>
            <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
              {{ item.address }}
            </td>
            <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
              {{ item.engineer }}
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
            <!-- 관리 -->
            <td class="py-3 px-3">
              <button class="opacity-60 cursor-pointer" @click="deleteList">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 페이지네이션 -->
    <div class="flex justify-between items-center mt-4 text-sm">
      <span className="text-gray-500">페이지 {{ currentPage }} / {{ totalPages }}</span>
      <div className="flex gap-2">
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
import { ref, computed } from "vue";
import customerData from "@/data/reservations.json";

const today = new Date().toLocaleDateString("ko-KR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
// 예약 더미
const stats = [
  {
    title: today,
    value: "64",
    unit: "건",
  },
  {
    title: "진행 중 작업",
    value: "80",
    unit: "%",
  },
  {
    title: "금일 결제액",
    value: "21",
    unit: "건",
  },
  {
    title: "리뷰 현황",
    value: "0",
    unit: "건",
  },
  {
    title: "리뷰 현황",
    value: "30",
    unit: "건",
  },
];

// 전체 데이터
const data = customerData;
// const dataCustomer = ref(customerData);

// 정렬상태
const sortType = ref("recent");

// 검색 상태
const searchField = ref("name"); // name | number | phone
const searchText = ref("");

// 정렬로직
const sortedData = computed(() => {
  let sorted = [...data];

  if (sortType.value === "recent") {
    // 등록일 내림차순 (최근 등록순)
    sorted.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  }

  if (sortType.value === "old") {
    // 등록일 오름차순 (오래된 등록순)
    sorted.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }

  if (sortType.value === "rating") {
    // 평점 높은순
    sorted.sort((a, b) => b.rating - a.rating);
  }

  return sorted;
});

// 검색 필터 로직
const filteredData = computed(() => {
  const q = searchText.value.trim();
  if (!q) return sortedData.value;

  return sortedData.value.filter((item) => {
    if (searchField.value === "name") {
      return item.customerName?.includes(q);
    }
    if (searchField.value === "number") {
      return String(item.id).includes(q);
    }
    if (searchField.value === "phone") {
      return item.phone?.includes(q);
    }
    return true;
  });
});

// 페이지 관련 상태
const pageSize = 8; // 한 페이지에 8개
const currentPage = ref(1);

// 총 페이지 수 (필터 후 기준)
const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize) || 1);

// 한글 입력해도 바로 검색이 되도록 하는 함수
function handleInput(event) {
  searchText.value = event.target.value;
  // 검색 할때는 첫 번째 페이지부터 다시 보기
  currentPage.value = 1;
}

// 현재 페이지에 보여줄 데이터 (필터 + 정렬 후)
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredData.value.slice(start, end);
});

// 검색 버튼 클릭 시 페이지 1로 이동
const handleSearch = () => {
  currentPage.value = 1;
};

// 페이지 이동 함수
const goPrev = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const goNext = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
</script>
