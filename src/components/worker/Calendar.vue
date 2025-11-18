<template>
  <div class="calendar w-full h-full py-[50px]">
    <!-- 10월, 좌우 버튼 -->
    <div class="header flex justify-between px-[24px] items-center">
      <span class="text-[#092857] text-[22px] font-bold"
        >{{ month + 1 }}월</span
      >
      <div class="text-[20px] flex items-center gap-2 opacity-70">
        <i class="fa-solid fa-angle-left" @click="prevMonth()"></i
        ><i class="fa-solid fa-angle-right" @click="nextMonth()"></i>
      </div>
    </div>
    <!-- 달력 전체 -->
    <div class="py-[50px]">
      <!-- 요일 -->
      <div class="grid grid-cols-7 text-center text-lg font-semibold">
        <div class="text-red-500">일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div class="text-blue-500">토</div>
      </div>

      <!-- 날짜 -->
      <div class="grid grid-cols-7 mt-3 gap-y-4">
        <template v-for="(day, idx) in days" :key="idx">
          <div v-if="day" class="relative text-center">
            <!--  날짜 하이라이트/선 연결(마킹된 날짜) -->
            <div
              v-if="day.marking && day.marking.type !== 'single'"
              class="absolute top-1/2 left-0 h-7 -translate-y-1/2 z-5"
              :style="rangeLineStyle(day.marking)"
            ></div>
            <!-- 점: transform은 JS에서 제어 (Tailwind의 translate-x 유틸 사용 안 함) -->
            <div
              v-if="day.marking"
              class="absolute w-7 h-7 rounded-full top-1/2 left-1/2 z-10"
              :style="dotStyle(day.marking.type, day.marking.color)"
            ></div>
            <!-- 날짜 숫자 -->
            <span
              class="z-20 relative font-semibold"
              :class="day.marking?.schedule ? 'text-white' : 'text-black'"
              >{{ day.date }}</span
            >
          </div>
          <!-- 일정 없는날 -->
          <div v-else></div>
        </template>
      </div>
    </div>
    <!-- 스케줄별 색상 설명 -->
    <!-- 전체묶음 -->
    <div class="flex justify-center gap-3">
      <!-- 게별 (오전) -->
      <div class="flex gap-1 items-center">
        <div class="w-5 h-5 bg-[#F4C424] rounded-full"></div>
        <span class="opacity-70">오전</span>
      </div>
      <!-- 게별 (오후) -->
      <div class="flex gap-1 items-center">
        <div class="w-5 h-5 bg-[#E37C64] rounded-full"></div>
        <span class="opacity-70">오후</span>
      </div>
      <!-- 게별 (오전) -->
      <div class="flex gap-1 items-center">
        <div class="w-5 h-5 bg-[#296AF1] rounded-full"></div>
        <span class="opacity-70">오전/오후</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const current = ref(new Date());

// 현재 연월
const year = computed(() => current.value.getFullYear());
const month = computed(() => current.value.getMonth());

// 일정 마킹용 데이터
const marking = [
  { date: "2025-11-03", schedule: "am,pm" },
  { date: "2025-11-04", schedule: "am,pm" },
  { date: "2025-11-05", schedule: "am,pm" },
  { date: "2025-11-07", schedule: "am" },
  { date: "2025-11-10", schedule: "am" },
  { date: "2025-11-11", schedule: "am,pm" },
  { date: "2025-11-12", schedule: "am,pm" },
  { date: "2025-11-13", schedule: "am,pm" },
  { date: "2025-11-14", schedule: "am,pm" },
  { date: "2025-11-17", schedule: "pm" },
  { date: "2025-11-18", schedule: "pm" },
  { date: "2025-11-19", schedule: "am" },
  { date: "2025-11-20", schedule: "am,pm" },
  { date: "2025-11-21", schedule: "pm" },
  { date: "2025-11-24", schedule: "am,pm" },
  { date: "2025-11-25", schedule: "am" },
  { date: "2025-11-26", schedule: "am" },
  { date: "2025-11-28", schedule: "am,pm" },
  
];

// 스케줄별 마킹 색상
function getColor(schedule) {
  if (schedule === "am,pm") return "#296AF1";
  if (schedule === "am") return "#F4C424";
  if (schedule === "pm") return "#E37C64";
  return null;
}

// 연속된 날짜 마킹
function groupMarkings(marking) {
  if (!marking.length) return [];

  const sorted = [...marking].sort((a, b) => {
    const A = toLocalDate(a.date);
    const B = toLocalDate(b.date);
    return A - B;
  });

  //   날짜 변환함수
  function toLocalDate(str) {
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  const ranges = [];
  let cur = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const prev = toLocalDate(sorted[i - 1].date);
    const curr = toLocalDate(sorted[i].date);

    const diff = (curr - prev) / (1000 * 60 * 60 * 24);

    if (
      diff === 1 &&
      sorted[i].color === sorted[i - 1].color &&
      sorted[i].schedule === sorted[i - 1].schedule
    ) {
      cur.push(sorted[i]);
    } else {
      ranges.push(cur);
      cur = [sorted[i]];
    }
  }
  ranges.push(cur);
  return ranges;
}

const markingRanges = groupMarkings(marking);

// 점 위치 js로 제어
function dotStyle(type, color) {
  let tx = "-50%";
  //   if (type === "start") tx = "-50%";
  //   else if (type === "end") tx = "-50%";
  return {
    backgroundColor: color,
    transform: `translate(${tx}, -50%)`,
  };
}

// 마킹라인 js로 제어
function rangeLineStyle(mark) {
  let left = "0";
  let right = "0";

  if (mark.type === "start") {
    left = "50%"; // 가운데에서 시작
    right = "0";
  } else if (mark.type === "end") {
    left = "0";
    right = "50%"; // 가운데에서 끝남
  }

  return {
    backgroundColor: mark.color,
    // opacity: 0.5,
    left,
    right,
    position: "absolute",
  };
}

// 달력용 날짜 데이터 생성 *********************************************************
function getDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay(); // 0~6
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days = [];

  // 빈칸 채우기
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // 날짜 채우기
  for (let d = 1; d <= lastDate; d++) {
    const dateObj = new Date(year, month, d);
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      d
    ).padStart(2, "0")}`;
    days.push({
      date: d,
      full: dateObj,
      dateStr,
      marking: null, // 여기에 마킹 정보 넣음
    });
  }

  return days;
}
// **********************************************************************************

// days 계산
const days = computed(() => {
  const arr = getDays(year.value, month.value);

  // marking range별 타입(start/middle/end/single) 주입
  markingRanges.forEach((range) => {
    if (range.length === 1) {
      const target = arr.find((d) => d?.dateStr === range[0].date);
      if (target) {
        target.marking = {
          type: "single",
          color: getColor(range[0].schedule),
          schedule: range[0].schedule,
        };
      }
    } else {
      range.forEach((item, index) => {
        const target = arr.find((d) => d?.dateStr === item.date);
        if (!target) return;

        target.marking = {
          color: getColor(item.schedule),
          schedule: item.schedule,
          type:
            index === 0
              ? "start"
              : index === range.length - 1
              ? "end"
              : "middle",
        };
      });
    }
  });

  return arr;
});

// 다음달 / 이전달 이동
function nextMonth() {
  current.value = new Date(year.value, month.value + 1, 1);
}

function prevMonth() {
  current.value = new Date(year.value, month.value - 1, 1);
}
</script>
