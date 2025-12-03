<template>
  <!-- 기사 홈 -->
  <div class="">
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
      <div v-if="reservationTab === 'today'" class="">
        <!-- 남은 예약 / 전체 예약 -->
        <div>
          <p class="py-2 text-[14px] text-[#888888] font-bold text-right">
            남은 예약
            <span class="text-[#296af1]">{{ waitingReser }}건</span>
            / 전체 {{ todayReservations.length }}건
          </p>
          <!-- 오늘의 예약 목록 -->
          <div
            v-for="customer in todayReservations"
            :key="customer.id"
            @click="goDetail(customer.id)"
            class="p-4 rounded-2xl flex flex-col mb-3 bg-[#f0faff]">
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
                <p class="ml-2 text-[14px] font-bold text-[#555555]">{{ customer.address }}</p>
              </div>
              <!-- 이름 / 카페이름 -->
              <div class="flex items-center">
                <p class="px-2 rounded-full bg-[#dce7fb]">
                  <i class="fa-solid fa-user text-[12px] text-[#092857]"></i>
                </p>
                <p class="ml-2 text-[14px] text-[#555555]">
                  {{ customer.customerName }}({{ customer.cafeName }})
                </p>
              </div>
              <!-- 모델명 -->
              <div class="flex items-center">
                <p class="px-2 rounded-full bg-[#dce7fb]">
                  <i class="fa-solid fa-cube text-[12px] text-[#092857]"></i>
                </p>
                <p class="ml-2 text-[14px] text-[#555555]">{{ customer.iceMachineModel }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 전체 예약 -->
      <div v-if="reservationTab === 'all'">
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
          @click="goDetail(customer.id)"
          v-for="customer in selectDateReser"
          v-if="selectDateReser.length"
          :key="customer.id"
          class="p-4 rounded-2xl bg-[#f0faff] mb-3">
          <div class="grid grid-cols-2">
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
                {{ customer.customerName }}({{ customer.cafeName }})
              </p>
            </div>
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
              :class="customer.status === 'waiting' ? 'text-[#092857] font-bold' : 'text-[#888888]'"
              class="ml-2 text-[14px]">
              {{ customer.address }}
            </p>
          </div>
        </div>
        <!-- 오늘 날짜가 아니라면 안내 문구 표시 -->
        <p v-else class="text-center text-gray-500 py-4">예약 목록이 없습니다.</p>
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
const dataCustomer = ref(customerData);
const dataWorker = ref(workerData);

const today = new Date();
const todayDate = today.getDate();
const todayDay = today.getDay();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());
const selectedDate = ref(todayDate);
const selectedPeriod = ref(null);

// 오늘 날짜 문자열 (YYYY-MM-DD)
const todayString = today.toISOString().split("T")[0];

// 오늘 날짜 표시
const todayText = today.toLocaleDateString("ko-KR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// 주간 요일
const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

// 오늘 예약만 필터링
const todayReservations = computed(() => {
  return dataCustomer.value.filter((c) => c.reservationDate === todayString);
});

// 선택한 날짜별 예약 필터링
const selectDateReser = computed(() => {
  if (!selectedDate.value) return [];

  // 로컬 기준으로 YYYY-MM-DD 문자열 생성
  const date = new Date(currentYear.value, currentMonth.value, selectedDate.value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const selectedDateString = `${year}-${month}-${day}`;

  return dataCustomer.value.filter((c) => c.reservationDate === selectedDateString);
});

// 남은 예약 계산 (오늘)
const waitingReser = computed(() => {
  return todayReservations.value.filter((c) => c.status === "waiting").length;
});

// 달력 이전/다음 달
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  selectedDate.value = null;
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  selectedDate.value = null;
};

// 이번 주 날짜
const weekDates = computed(() => {
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(todayDate - todayDay); // 이번 주 일요일

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(firstDayOfWeek);
    date.setDate(firstDayOfWeek.getDate() + i);
    return date.getDate();
  });
});

// 날짜 선택
const selectDate = (date) => {
  selectedDate.value = date;
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

// 예약 상세페이지 이동
const goDetail = (id) => {
  const customer = dataCustomer.value.find((c) => c.id === id);
  if (!customer) return;

  if (customer.status === "waiting") {
    router.push({ name: "ReservationDetail", params: { id } });
  } else {
    router.push({ name: "DetailComplete", params: { id } });
  }
};
</script>
