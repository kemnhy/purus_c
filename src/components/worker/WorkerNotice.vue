<template>
  <!-- 알림창 -->
  <div
    class="z-50 max-w-md w-screen m-auto h-screen bg-white absolute top-0 left-50% transform translate-x-0.5"
  >
    <!-- 헤더 -->
    <header
      class="bg-white h-15 border-b-white flex px-10 justify-between items-center"
    >
      <!-- 뒤로가기 -->
      <div>
        <button @click="goBack">
          <!-- 홈이 아닐때만 보이기 -->
          <i
            class="fa-solid fa-angle-left text-xl text-[#092857] cursor-pointer"
          ></i>
        </button>
      </div>
    </header>
    <!-- 메인 -->
    <div class="flex flex-col px-10 py-6 gap-8">
      <!-- 알림 타이틀 -->
      <h2 class="text-[24px] font-bold">알림</h2>
      <!-- 새로운알림 -->
      <div class="flex flex-row items-center gap-1">
        <p class="text-[20px] font-semibold">새로운 알림</p>
        <span
          v-if="notices"
          class="text-[14px] px-1.5 bg-[#F12929] rounded-full text-white"
        >
          {{ notices.length }}
        </span>
      </div>
      <!-- 알림 리스트 -->
      <div
        @click="goPath(notice)"
        class="flex gap-4 items-center cursor-pointer"
        v-for="notice in notices"
        :key="notice.id"
      >
        <!-- 아이콘 -->
        <i
          :class="notice.icon"
          class="text-[#092857] opacity-75 text-[24px] w-12 h-12 bg-gray-200 text-center flex content-center rounded-2xl"
        ></i>
        <div class="text-[16px]">
          <!-- 알림메시지 -->
          <p class="font-semibold">{{ notice.message }}</p>
          <!-- 알림 내용 -->
          <p class="opacity-70">{{ notice.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import { useRouter } from "vue-router";
const emit = defineEmits(["close"]);

// 라우터
const router = useRouter();

// 뒤로가기 버튼
const goBack = () => {
  emit("close");
};

// 리스트 클릭시 해당패스로 이동함수
function goPath(notice) {
  if (notice.name) {
    router.push({ name: notice.name });
    emit("close"); //notice 창닫기
  }
}

// 알림 목록 더미
const notices = [
  {
    id: 1,
    message: "새로운 예약이 있습니다!",
    desc: "오늘의 예약을 확인해주세요.",
    icon: "fa-solid fa-bell",
    name: "WorkerHome",
  },
  {
    id: 2,
    message: "새로운 리뷰가 있습니다!",
    desc: "마이페이지에서 확인해주세요.",
    icon: "fa-solid fa-thumbs-up",
    name: "MyPage",
  },
  {
    id: 3,
    message: "새로운 예약이 있습니다!",
    desc: "오늘의 예약을 확인해주세요.",
    icon: "fa-solid fa-bell",
    name: "WorkerHome",
  },
  {
    id: 4,
    message: "새로운 예약이 있습니다!",
    desc: "오늘의 예약을 확인해주세요.",
    icon: "fa-solid fa-bell",
    name: "WorkerHome",
  },
  {
    id: 5,
    message: "새로운 리뷰가 있습니다!",
    desc: "마이페이지에서 확인해주세요.",
    icon: "fa-solid fa-thumbs-up",
    name: "MyPage",
  },
  {
    id: 6,
    message: "오늘은 정산일 입니다!",
    desc: "마이페이지에서 확인해주세요.",
    icon: "fa-solid fa-dollar-sign",
    name: "MyPage",
  },
  {
    id: 7,
    message: "새로운 리뷰가 있습니다!",
    desc: "마이페이지에서 확인해주세요.",
    icon: "fa-solid fa-thumbs-up",
    name: "MyPage",
  },
];
</script>
