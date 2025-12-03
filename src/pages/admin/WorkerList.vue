<template>
  <!-- 기사목록 전체 wrap -->
  <div class="p-4">
    <!-- 필터링 검색 박스 -->
    <div class="pb-4 flex justify-between">
      <div class="flex gap-3">
        <select
          class="w-30 h-10 bg-white border border-[#8888] rounded-md py-1 px-2 text-[#888]"
          v-model="searchField">
          <option value="name">이름</option>
          <option value="number">번호</option>
          <option value="phone">연락처</option>
        </select>
        <input
          type="text"
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
      <!-- 정렬 / 엑셀파일 다운로드 버튼 -->
      <div class="flex gap-3 justify-end">
        <select
          class="w-30 h-10 bg-white border border-[#8888] rounded-md py-1 px-2 text-[#888]"
          v-model="sortType">
          <option value="recent">최근 등록순</option>
          <option value="old">오래된 등록순</option>
          <option value="rating">평점 높은순</option>
        </select>
        <button
          class="py-1.5 px-4 rounded-md bg-[#296af1] text-white cursor-pointer"
          @click="goNewWorker">
          신규 등록
        </button>
        <button class="h-10 px-4 border rounded-md border-[#57A353] text-[#57A353]">
          <i class="fa-solid fa-file-excel mr-1.5"></i>
          엑셀파일 다운로드
        </button>
      </div>
    </div>
    <!-- 테이블 영역 -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-center">
        <!-- 테이블 헤드 -->
        <thead>
          <tr class="border-b border-t border-[#8888] bg-[#F4F4F4]">
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">번호</th>
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">이름</th>
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">평점</th>
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">연락처</th>
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">이메일</th>
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">주소</th>
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">등록일</th>
            <th class="py-3 px-3 font-medium opacity-70 border-r border-[#8888]">상세</th>
            <th class="py-3 px-3 font-medium opacity-70">관리</th>
          </tr>
        </thead>
        <!-- 테이블 바디 -->
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id" class="border-b border-[#8888]">
            <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
              {{ item.id }}
            </td>
            <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
              {{ item.name }}
            </td>
            <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
              {{ item.rating }}
            </td>
            <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
              {{ item.phone }}
            </td>
            <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
              {{ item.email }}
            </td>
            <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
              {{ item.addr }}
            </td>
            <td class="py-3 px-3 opacity-80 border-r border-[#8888]">
              {{ item.startDate }}
            </td>
            <!-- 상세 -->
            <td class="py-3 px-3 border-r border-[#8888]">
              <button
                class="cursor-pointer py-1.5 px-4 rounded-md bg-[#296af1] text-white text-sm"
                @click="detailModal = true">
                보기
              </button>
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
  <!-- 기사 상세 모달 -->
  <!-- 오버레이 -->
  <div class="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.85)]" v-if="detailModal">
    <!-- 닫기 버튼 -->
    <button
      class="cursor-pointer absolute top-4 right-6 text-white text-2xl"
      @click="detailModal = false">
      × 닫기
    </button>
    <!-- 내용 -->
    <div class="w-[65%] m-auto pt-14">
      <!-- 타이틀 박스 -->
      <div class="flex justify-between pb-8 items-center">
        <h1 class="text-white text-4xl font-bold">기사 상세 정보</h1>
        <!-- 기사프로필 -->
        <div class="flex items-center gap-4">
          <img src="/images/workerProfile.png" alt="기사프로필" class="w-24" />
          <span class="text-white text-3xl font-bold">이깨끗</span>
        </div>
      </div>
      <!-- 플렉스 박스 -->
      <div class="flex justify-between gap-8">
        <!-- 소득누계 / 예약진행률 -->
        <div class="flex flex-col gap-8 flex-1">
          <!-- 소득누계 카드 -->
          <div class="rounded-[40px] p-10 bg-linear-to-t from-[#BDE9FF] to-white to-70%">
            <!-- 배정 / 정산일 -->
            <div class="mb-26">
              <p class="text-lg font-semibold">
                배정 :
                <span class="font-bold text-[#092857]">38</span>
                건
              </p>
              <p class="text-lg font-semibold">
                정산일 :
                <span class="font-bold text-[#092857]">15</span>
                일
              </p>
            </div>
            <!-- 기사 소득 누계 -->
            <div class="flex flex-col gap-4 items-center">
              <p class="text-2xl font-bold text-[#092857]">기사 소득 누계</p>
              <h2 class="text-4xl font-bold text-[#296AF1]">2,150,000 원</h2>
              <p class="text-2xl font-bold text-[#092857]">
                완료
                <span class="text-[#296AF1]">33</span>
                건
              </p>
            </div>
          </div>
          <!-- 예약진행률 카드 -->
          <div class="bg-white rounded-[40px] p-10">
            <div class="flex items-center justify-between text-center">
              <!-- 왼쪽 // 진행률 그래프 -->
              <div>
                <h3 class="text-xl font-bold text-[#092857] mb-3">예약 진행률</h3>
                <!-- 그래프 -->
                <div class="relative border-8 w-30 h-30 rounded-full border-[#ccc]">
                  <!-- 진행률 액티브 바 -->
                  <div
                    class="absolute -top-2 -left-2 border-8 w-30 h-30 rounded-full border-[#296AF1]"></div>
                  <!-- 진행률 숫자 -->
                  <p
                    class="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-2xl font-bold text-[#092857]">
                    100
                  </p>
                </div>
              </div>
              <!-- 오른쪽 // 구분 -->
              <div class="flex flex-col gap-2 mt-6">
                <!-- 전체예약 -->
                <div class="flex items-center gap-2">
                  <div class="bar w-10 h-2 rounded-full bg-[#ccc]"></div>
                  <span>전체예약</span>
                </div>
                <!-- 완료건수 -->
                <div class="flex items-center gap-2">
                  <div class="bar w-10 h-2 rounded-full bg-[#296AF1]"></div>
                  <span>완료건수</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 예약목록 -->
        <div class="bg-white rounded-[50px] flex-[1.3]">
          <!-- 전체 예약 목록 -->
          <div class="p-10">
            <!-- 타이틀 -->
            <h2 class="text-[#092857] text-[24px] font-bold pb-8">예약 목록</h2>
            <div
              v-for="customer in dataCustomer"
              :key="customer.id"
              class="flex flex-col p-4 rounded-2xl bg-[#f1f1f1] mb-3 gap-2">
              <!-- 시간 -->
              <div class="flex items-center">
                <p
                  class="px-1.5 rounded-full"
                  :class="
                    customer.status === 'waiting'
                      ? 'text-[#092857] font-bold bg-[#dce7fb]'
                      : 'text-[#888888] bg-white'
                  ">
                  <i class="fa-solid fa-clock text-[11px]"></i>
                </p>
                <p
                  :class="
                    customer.status === 'waiting' ? 'text-[#296af1] font-bold' : 'text-[#888888]'
                  "
                  class="ml-2 text-[14px]">
                  {{ customer.date }} | {{ customer.time }}
                </p>
              </div>
              <div class="grid grid-cols-2">
                <!-- 장소 -->
                <div class="flex items-center">
                  <p
                    class="px-1.5 rounded-full"
                    :class="
                      customer.status === 'waiting'
                        ? 'text-[#092857] font-bold bg-[#dce7fb]'
                        : 'text-[#888888] bg-white'
                    ">
                    <i class="fa-solid fa-location-dot text-[12px]"></i>
                  </p>
                  <p
                    :class="
                      customer.status === 'waiting' ? 'text-[#092857] font-bold' : 'text-[#888888]'
                    "
                    class="ml-2 text-[14px]">
                    {{ customer.addr }}
                  </p>
                </div>
                <!-- 이름 -->
                <div class="flex items-center">
                  <p
                    class="px-1.5 rounded-full"
                    :class="
                      customer.status === 'waiting'
                        ? 'text-[#092857] font-bold bg-[#dce7fb]'
                        : 'text-[#888888] bg-white'
                    ">
                    <i class="fa-solid fa-user text-[12px]"></i>
                  </p>
                  <p
                    :class="customer.status === 'waiting' ? 'text-[#092857]' : 'text-[#888888]'"
                    class="ml-2 text-[14px]">
                    {{ customer.name }}({{ customer.cafename }})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 캘린더 -->
        <div class="flex-[1.3] bg-white rounded-[50px] flex justify-center">
          <!-- 크기조절용 div -->
          <div class="w-[90%] m-auto">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import workerData from "@/data/worker.json";
import { useRouter } from "vue-router";
import Calendar from "@/components/worker/Calendar.vue";
import customerData from "@/data/customer.json";

const router = useRouter();

// 전체 데이터
const data = workerData;
const dataCustomer = ref(customerData);

// 신규등록 라우터
function goNewWorker() {
  router.push({ name: "NewWorker" });
}

// 모달상태
const detailModal = ref(false);

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
      return item.name.includes(q);
    }
    if (searchField.value === "number") {
      return String(item.id).includes(q);
    }
    if (searchField.value === "phone") {
      return item.phone.includes(q);
    }
    return true;
  });
});

// 페이지 관련 상태
const pageSize = 10; // 한 페이지에 8개
const currentPage = ref(1);

// 총 페이지 수 (필터 후 기준)
const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize) || 1);

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

// 기사목록 관리(delete) 버튼 함수
function deleteList() {}
</script>
