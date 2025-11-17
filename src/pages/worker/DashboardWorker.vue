<template>
  <div class="max-w-md m-auto">
    <!-- 헤더 -->
    <header
      :class="$route.path !== '/worker/dashboard/home' ? 'bg-white' : 'bg-[#f0faff]'"
      class="bg-[#f0faff] h-15 border-b-white flex px-10 justify-between items-center">
      <!-- 뒤로가기 -->
      <div>
        <button @click="goBack" v-if="$route.path !== '/worker/dashboard/home'">
          <!-- 홈이 아닐때만 보이기 -->
          <i class="fa-solid fa-angle-left text-xl text-[#092857]"></i>
        </button>
      </div>
      <!-- 알림 아이콘 -->
      <div @click="openNotice" class="relative">
        <i class="fa-solid fa-bell text-[#092857] text-xl"></i>
        <span v-if="notice" class="w-3 h-3 bg-[#F12929] absolute rounded-full text-white">
          {{}}
        </span>
      </div>
    </header>
    <WorkerNotice />
    <!-- 메인 > 라우터 불러옴 -->
    <main>
      <router-view class="px-10 py-6"></router-view>
    </main>
    <!-- 하단고정메뉴 -->
    <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#f0faff] h-17 z-10">
      <div class="h-full grid grid-cols-3">
        <!-- 이달의 청소-->
        <router-link
          class="relative flex flex-col items-center justify-center text-2xl"
          :class="
            $route.name === 'Month'
              ? 'text-[#296af1] dark:text-blue-400'
              : 'text-[#888888] dark:text-gray-400'
          "
          :to="{ name: 'Month' }">
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
          :to="{ name: 'WorkerHome' }">
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
          :to="{ name: 'MyPage' }">
          <i class="fa-solid fa-user"></i>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script setup>
import WorkerNotice from "@/components/worker/WorkerNotice.vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 뒤로가기 버튼
const goBack = () => {
  router.back();
};
</script>
