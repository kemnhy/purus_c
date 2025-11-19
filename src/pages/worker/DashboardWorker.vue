<template>
  <div class="max-w-md m-auto">
    <!-- 헤더 -->
    <header
      :class="
        $route.path !== '/worker/dashboard/home' ? 'bg-white' : 'bg-[#f0faff]'
      "
      class="bg-[#f0faff] h-15 border-b-white flex px-10 justify-between items-center"
    >
      <!-- 뒤로가기 -->
      <div>
        <button @click="goBack" v-if="$route.path !== '/worker/dashboard/home'">
          <!-- 홈이 아닐때만 보이기 -->
          <i
            class="fa-solid fa-angle-left text-xl text-[#092857] cursor-pointer"
          ></i>
        </button>
      </div>
      <!-- 알림 아이콘 -->
      <div @click="openNotice = true" class="relative">
        <i class="fa-solid fa-bell text-[#092857] text-xl cursor-pointer"></i>
        <span
          v-if="notices"
          class="text-[12px] px-1.5 bg-[#F12929] absolute rounded-full text-white top-[-6px] left-[11px]"
        >
          {{ notices.length }}
        </span>
      </div>
    </header>
    <WorkerNotice v-if="openNotice" @close="openNotice = false" />
    <!-- 메인 > 라우터 불러옴 -->
    <main>
      <router-view class="px-10 py-6"></router-view>
    </main>
    <!-- 하단고정메뉴 -->
    <nav
      class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#f0faff] h-17 z-10"
    >
      <div class="h-full grid grid-cols-3">
        <!-- 이달의 청소-->
        <router-link
          class="relative flex flex-col items-center justify-center text-2xl"
          :class="
            $route.name === 'Month'
              ? 'text-[#296af1] dark:text-blue-400'
              : 'text-[#888888] dark:text-gray-400'
          "
          :to="{ name: 'Month' }"
        >
          <i class="fa-solid fa-calendar"></i>
        </router-link>
        <!-- 홈 -->
        <router-link
          class="relative flex flex-col items-center justify-center text-2xl"
          :class="
            $route.name === 'WorkerHome'
              ? 'text-[#296af1] dark:text-blue-400'
              : 'text-[#888888] dark:text-gray-400'
          "
          :to="{ name: 'WorkerHome' }"
        >
          <i class="fa-solid fa-house"></i>
        </router-link>
        <!-- 마이페이지 -->
        <router-link
          class="relative flex flex-col items-center justify-center text-2xl"
          :class="
            $route.name === 'MyPage'
              ? 'text-[#296af1] dark:text-blue-400'
              : 'text-[#888888] dark:text-gray-400'
          "
          :to="{ name: 'MyPage' }"
        >
          <i class="fa-solid fa-user"></i>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script setup>
import WorkerNotice from "@/components/worker/WorkerNotice.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 뒤로가기 버튼
const goBack = () => {
  router.back();
};

// 알림창 열기
const openNotice = ref(false);

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
];
</script>
