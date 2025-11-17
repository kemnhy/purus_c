<template>
  <!-- 기사 홈 -->
  <div class="bg-[#f0faff]">
    <!-- 상단 -->
    <div class="flex flex-col gap-2">
      <!-- 기사님 이름 -->
      <div class="flex flex-col">
        <p class="text-[30px] text-[#092857] leading-none">안녕하세요,</p>
        <p class="text-[30px] font-bold text-[#296af1]">{{ dataWorker[0].name }}기사님</p>
      </div>
      <!-- 오늘 날짜 -->
      <p class="text-[16px] font-bold text-[#092857]">오늘은 {{ todayText }}입니다.</p>
    </div>
    <!-- 오늘 / 전체 -->
    <div class="mt-8">
      <!-- 탭버튼 -->
      <div class="w-full flex">
        <button
          @click="reservationTab = 'today'"
          :class="
            reservationTab === 'today'
              ? 'text-[#092857] font-bold border-b-3 border-[#296af1]'
              : 'text-[#888888] border-b-3 border-[#f1f1f1]'
          "
          class="flex-1 py-3">
          오늘의 예약
        </button>
        <button
          @click="reservationTab = 'all'"
          :class="
            reservationTab === 'all'
              ? 'text-[#092857] font-bold border-b-3 border-[#296af1]'
              : 'text-[#888888] border-b-3 border-[#f1f1f1]'
          "
          class="flex-1 py-3">
          전체 예약
        </button>
      </div>
      <!-- 오늘의 예약 -->
      <div v-if="reservationTab === 'today'" class="overflow-y-auto max-h-[60vh]">
        <!-- 남은 예약 / 전체 예약 -->
        <div>
          <p class="py-2 text-[14px] text-[#888888] font-bold text-right">
            남은 예약
            <span class="text-[#296af1]">{{ waitingReser }}건</span>
            / 전체 {{ dataCustomer.length }}건
          </p>
          <!-- 오늘의 예약 목록 -->
          <div
            v-for="customer in dataCustomer"
            :key="customer.id"
            @click="goDetail(customer.id)"
            class="p-4 rounded-2xl bg-white flex flex-col mb-3">
            <!-- 예약 시간 / 진행상태 -->
            <div class="flex justify-between">
              <p class="text-[#888888] font-bold">{{ customer.time }}</p>
              <p
                :class="
                  customer.status === 'waiting' ? 'text-[#296af1] font-bold' : 'text-[#888888]'
                ">
                {{ customer.status === "waiting" ? "청소 예정" : "청소 완료" }}
                <i class="fa-solid fa-circle-check"></i>
              </p>
            </div>
            <div class="flex flex-col gap-2 mt-2">
              <!-- 주소 -->
              <div class="flex items-center">
                <p class="px-2 rounded-full bg-[#dce7fb]">
                  <i class="fa-solid fa-location-dot text-[12px] text-[#092857]"></i>
                </p>
                <p class="ml-2 text-[14px] font-bold text-[#555555]">{{ customer.addr }}</p>
              </div>
              <!-- 이름 / 카페이름 -->
              <div class="flex items-center">
                <p class="px-2 rounded-full bg-[#dce7fb]">
                  <i class="fa-solid fa-user text-[12px] text-[#092857]"></i>
                </p>
                <p class="ml-2 text-[14px] text-[#555555]">
                  {{ customer.name }}({{ customer.cafename }})
                </p>
              </div>
              <!-- 모델명 -->
              <div class="flex items-center">
                <p class="px-2 rounded-full bg-[#dce7fb]">
                  <i class="fa-solid fa-cube text-[12px] text-[#092857]"></i>
                </p>
                <p class="ml-2 text-[14px] text-[#555555]">{{ customer.model }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 전체 예약 -->
      <div v-if="reservationTab === 'all'" class="overflow-y-auto max-h-[61vh]">
        <!-- 날짜 선택 -->
        <!-- 월 선택 -->
        <div class="flex items-center justify-center gap-2 py-3">
          <i class="fa-solid fa-square-caret-left text-[#296af1]" @click="prevMonth"></i>
          <span class="font-bold text-[18px]">{{ currentYear }}년 {{ currentMonth + 1 }}월</span>
          <i class="fa-solid fa-square-caret-right text-[#296af1]" @click="nextMonth"></i>
        </div>
        <!-- 요일 -->
        <div class="grid grid-cols-7 text-center">
          <span
            v-for="day in weekDays"
            class="text-[#888888]"
            :key="day"
            :class="day === '일' ? 'text-red-500' : '' || day === '토' ? 'text-blue-500' : ''">
            {{ day }}
          </span>
        </div>
        <!-- 한 주 날짜 -->
        <div class="grid grid-cols-7 gap-2 mb-2">
          <button
            v-for="(date, index) in weekDates"
            :key="index"
            @click="selectDate(date)"
            :class="getDateClass(date, index)">
            {{ date }}
          </button>
        </div>
        <!-- 전체 예약 목록 -->
        <div
          v-if="selectedDate === todayDate"
          v-for="customer in dataCustomer"
          :key="customer.id"
          class="p-4 rounded-2xl bg-white mb-2 grid grid-cols-2">
          <!-- 왼쪽 목록 -->
          <div class="flex flex-col">
            <!-- 시간 -->
            <div class="flex items-center mb-1">
              <p
                class="px-2 rounded-full"
                :class="
                  customer.status === 'waiting'
                    ? 'text-[#092857] font-bold bg-[#dce7fb]'
                    : 'text-[#888888] bg-[#f1f1f1]'
                ">
                <i class="fa-solid fa-clock text-[11px]"></i>
              </p>
              <p
                :class="
                  customer.status === 'waiting' ? 'text-[#296af1] font-bold' : 'text-[#888888]'
                "
                class="ml-2 text-[14px]">
                {{ customer.time }} | {{ customer.status === "waiting" ? "예정" : "완료" }}
              </p>
            </div>
            <!-- 장소 -->
            <div class="flex items-center">
              <p
                class="px-2 rounded-full"
                :class="
                  customer.status === 'waiting'
                    ? 'text-[#092857] font-bold bg-[#dce7fb]'
                    : 'text-[#888888] bg-[#f1f1f1]'
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
          </div>
          <!-- 오른쪽 목록 -->
          <div class="flex flex-col">
            <!-- 이름 -->
            <div class="flex items-center mb-1">
              <p
                class="px-2 rounded-full"
                :class="
                  customer.status === 'waiting'
                    ? 'text-[#092857] font-bold bg-[#dce7fb]'
                    : 'text-[#888888] bg-[#f1f1f1]'
                ">
                <i class="fa-solid fa-user text-[12px]"></i>
              </p>
              <p
                :class="customer.status === 'waiting' ? 'text-[#092857]' : 'text-[#888888]'"
                class="ml-2 text-[14px]">
                {{ customer.name }}({{ customer.cafename }})
              </p>
            </div>

            <!-- 모델명 -->
            <div class="flex">
              <p
                class="px-2 rounded-full"
                :class="
                  customer.status === 'waiting'
                    ? 'text-[#092857] font-bold bg-[#dce7fb]'
                    : 'text-[#888888] bg-[#f1f1f1]'
                ">
                <i class="fa-solid fa-cube text-[12px]"></i>
              </p>
              <p
                :class="customer.status === 'waiting' ? 'text-[#092857]' : 'text-[#888888]'"
                class="ml-2 text-[14px]">
                {{ customer.model }}
              </p>
            </div>
          </div>
        </div>
        <!-- 오늘 날짜가 아니라면 안내 문구 표시 -->
        <p v-else class="text-center text-gray-500 py-4">선택된 날짜에는 예약이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import customerData from "@/data/customer.json";
import workerData from "@/data/worker.json";
import { useRouter } from "vue-router";

const router = useRouter();

const reservationTab = ref("today");
// 더미데이터 불러오기
const dataCustomer = ref(customerData);
const dataWorker = ref(workerData);

// 남은 예약 계산
const waitingReser = computed(() => {
  return dataCustomer.value.filter((c) => c.status === "waiting").length;
});

const today = new Date();
// 오늘 날짜에 표시
const todayDate = today.getDate();
const todayDay = today.getDay();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());
const selectedDate = ref(todayDate);
const selectedPeriod = ref(null);

// 오늘 날짜
const todayText = new Date().toLocaleDateString("ko-KR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

// 전달 다음달
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  selectedDate.value = null;
  selectedPeriod.value = null;
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  selectedDate.value = null;
  selectedPeriod.value = null;
};

// 한 주의 날짜들
const weekDates = computed(() => {
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(todayDate - todayDay); // 이번 주 일요일 날짜

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(firstDayOfWeek);
    date.setDate(firstDayOfWeek.getDate() + i);
    return date.getDate();
  });
});

// 날짜 선택
const selectDate = (date) => {
  selectedDate.value = date;
  // console.log("선택된 날짜:", date);
};

// 날짜별 클래스
const getDateClass = (date, index) => {
  const isSelected = date === selectedDate.value;
  const isSunday = index === 0;
  const isSaturday = index === 6;
  const isToday = date === todayDate;

  return [
    "aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all",
    isSelected ? "bg-[#296af1] text-white shadow-md" : "hover:bg-[#dce7fb]",
    isToday && !isSelected ? "border border-[#296af1] font-bold text-[#296af1]" : "",
    !isSelected && isSunday && "text-red-500",
    !isSelected && isSaturday && "text-[#296af1]",
    !isSelected && !isSunday && !isSaturday && "text-[#555555]",
  ];
};

// 오늘의 예약에서 목록 클릭 시 그 예약 상세정보 페이지로 이동
const goDetail = (id) => {
  const customer = dataCustomer.value.find((c) => c.id === id); // 클릭한 예약 찾기
  if (!customer) return; // 혹시 데이터가 없으면 함수 종료

  if (customer.status === "waiting") {
    router.push({ name: "ReservationDetail", params: { id } });
  } else {
    router.push({ name: "DetailComplete", params: { id } });
  }
};
</script>
