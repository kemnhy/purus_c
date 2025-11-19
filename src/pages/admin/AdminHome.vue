<template>
  <div class="min-h-screen dark:bg-gray-900">
    <!-- 사이드바 -->
    <div class="fixed inset-y-0 left-0 w-64 bg-[#092857] shadow-lg">
      <div class="flex flex-col h-full">
        <!-- 로고 -->
        <div class="flex justify-between items-center px-4 py-4 border-b border-[#53698A]">
          <h1 class="text-xl font-bold text-white">Purus Manager</h1>
        </div>
        <!-- 네비게이션 메뉴 -->
        <nav class="flex-1 p-4 space-y-2">
          <router-link
            v-for="(link, i) in links"
            class="flex items-center px-4 py-2 text-[#aac0df] rounded-lg hover:bg-[#53698A] transition-colors"
            :key="i"
            :to="link.path"
            :class="{
              'bg-[#53698A]  text-white ': isActive(link.path),
            }">
            <i :class="[link.icon, 'mr-2']"></i>
            {{ link.name }}
          </router-link>
        </nav>
        <!-- 로그아웃 버튼 -->
        <div class="p-4 border-t border-[#53698A]">
          <button
            @click="logout"
            class="w-full flex items-center justify-center px-4 py-2 text-white rounded-lg hover:bg-[#53698A] transition-colors">
            <i class="fas fa-sign-out-alt mr-3"></i>
            로그아웃
          </button>
        </div>
      </div>
    </div>
    <!-- 오른쪽 내용 -->
    <div class="ml-64 min-h-screen">
      <!-- 로고 헤더 -->
      <!-- <AdminHeader /> -->
      <!-- 타이틀 -->
      <div class="border-b border-[#f1f1f1] p-4">
        <h1 class="text-[20px] font-bold text-[#092857]">{{ currentTitle }}</h1>
      </div>
      <!-- 라우터 보이는 영역 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
// import AdminHeader from "@/components/admin/AdminHeader.vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

// 사이드메뉴 라우터
const links = [
  { name: "통합 모니터링", path: "/admin/dashboard", icon: "fa-solid fa-clipboard" },
  { name: "금일 예약 관리", path: "/admin/reservation", icon: "fa-solid fa-calendar-day" },
  { name: "예약 신청 목록", path: "/admin/reservationlist", icon: "fa-solid fa-list-ul" },
  { name: "기사 목록", path: "/admin/workerlist", icon: "fa-solid fa-user" },
  { name: "신규 기사 등록", path: "/admin/newworker", icon: "fa-solid fa-user-plus" },
  { name: "알림 관리", path: "/admin/notice", icon: "fa-solid fa-bell" },
  { name: "고객 리뷰 관리", path: "/admin/customerreview", icon: "fa-solid fa-pen-to-square" },
  { name: "통계", path: "/admin/result", icon: "fa-solid fa-chart-simple" },
];

// 현재 선택된 메뉴
const isActive = (path) => route.path === path;

// 선택된 목록의 이름을 오른쪽 상단에 출력
const currentTitle = computed(() => {
  const title = links.find((link) => link.path === route.path);
  return title ? title.name : "";
});

// 로그아웃
const logout = () => {
  router.push("/admin");
};
</script>
