<template>
  <div class="w-full max-w-[440px] mx-auto bg-white min-h-screen pb-24">
    <!-- 프로필 섹션 -->
    <section class="flex flex-col justify-center items-center mt-6 relative">
      <div class="relative">
        <img
          src="/images/Editinfo.png"
          alt="기사 프로필"
          class="w-36 h-36 rounded-2xl object-cover shadow-md" />
        <button
          @click="$router.push('/worker/dashboard/editinfo')"
          class="absolute bottom-0 right-0 bg-[#296af1] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-[#1e5dd1] transition-colors">
          <i class="fa-solid fa-camera text-[14px]"></i>
        </button>
      </div>
      <h2 class="mt-3 text-[30px] font-semibold text-[#296af1]">
        {{ dataWorker[0].name }}기사님
      </h2>
    </section>

    <!-- 3개 메뉴 버튼 -->
    <section
      class="bg-[#296af1] mt-6 mx-5 rounded-2xl text-white flex justify-around py-5 shadow-md">
      <div
        class="flex flex-col items-center gap-2 cursor-pointer active:opacity-80 transition-opacity"
        @click="$router.push('/worker/dashboard/editinfo')">
        <i class="fa-solid fa-pen-to-square text-[24px]"></i>
        <p class="text-[14px] font-medium">내정보 수정</p>
      </div>

      <div
        @click="$router.push('/worker/dashboard/customerlist')"
        class="flex flex-col items-center relative gap-2 cursor-pointer active:opacity-80 transition-opacity">
        <i class="fa-solid fa-table-list text-[24px]"></i>
        <p class="text-[14px] font-medium">나의 고객 목록</p>
        <span
          class="absolute -top-1 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex justify-center items-center">
          {{ 5 }}
        </span>
      </div>

      <div
        class="flex flex-col items-center gap-2 cursor-pointer active:opacity-80 transition-opacity"
        @click="openCallModal">
        <i class="fa-solid fa-headset text-[24px]"></i>
        <p class="text-[14px] font-medium">고객센터</p>
      </div>
    </section>

    <!-- 정보 카드 -->
    <section
      class="bg-[#E8F4FF] mt-6 mx-5 rounded-2xl px-5 py-5 text-[#092857] shadow-sm">
      <div
        class="flex justify-between pb-3 border-b border-[#dddddd] text-[18px]">
        <p class="text-[#888888]">이달 소득</p>
        <p class="font-semibold text-[#296af1]">
          {{ formatNumber(dataWorker[0].payment) }}원
        </p>
      </div>

      <div
        class="flex justify-between py-3 border-b border-[#dddddd] text-[18px]">
        <p class="text-[#888888]">완료 건수</p>
        <p class="font-semibold text-[#296af1]">
          {{ dataWorker[0].complete }}건
        </p>
      </div>

      <div class="flex justify-between text-[18px]">
        <p class="text-[#888888]">평점</p>
        <div class="flex items-center gap-2">
          <p class="font-semibold text-[#296af1]">
            {{ dataWorker[0].rating }}점
          </p>
          <div class="flex gap-0.5">
            <i
              v-for="i in 5"
              :key="i"
              :class="
                i <= Math.round(dataWorker[0].rating)
                  ? 'fa-solid fa-star text-yellow-400'
                  : 'fa-regular fa-star text-gray-300'
              "
              class="text-[12px]"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- 최근 활동 -->
    <section class="mt-6 mx-5">
      <h3 class="text-[18px] font-semibold text-[#092857] mb-3">최근 활동</h3>
      <div
        class="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden">
        <div
          v-for="(activity, index) in recentActivities"
          :key="index"
          class="flex items-center justify-between px-4 py-3 border-b border-[#f0f0f0] last:border-b-0">
          <div class="flex items-center gap-3">
            <div
              :class="activity.iconBg"
              class="w-10 h-10 rounded-full flex items-center justify-center">
              <i :class="activity.icon" class="text-white text-[14px]"></i>
            </div>
            <div>
              <p class="text-[14px] font-medium text-[#092857]">
                {{ activity.title }}
              </p>
              <p class="text-[12px] text-[#888888]">{{ activity.time }}</p>
            </div>
          </div>
          <i class="fa-solid fa-chevron-right text-[#cccccc] text-[12px]"></i>
        </div>
      </div>
    </section>

    <!-- 정산 및 수익 -->
    <section class="mt-6 mx-5">
      <h3 class="text-[18px] font-semibold text-[#092857] mb-3">
        정산 및 수익
      </h3>
      <div
        class="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden">
        <!-- 정산 내역 -->
        <div
          class="flex items-center justify-between px-4 py-4 border-b border-[#f0f0f0] cursor-pointer active:bg-[#f8f8f8] transition-colors"
          @click="$router.push('/worker/dashboard/month')">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-receipt text-[#296af1] text-[18px]"></i>
            <p class="text-[15px] text-[#092857]">정산 내역</p>
          </div>
          <i class="fa-solid fa-chevron-right text-[#cccccc] text-[12px]"></i>
        </div>

        <!-- 정산 예정 금액 -->
        <div
          class="flex items-center justify-between px-4 py-4 border-b border-[#f0f0f0]">
          <div class="flex items-center gap-3">
            <i
              class="fa-solid fa-money-bill-wave text-[#296af1] text-[18px]"></i>
            <p class="text-[15px] text-[#092857]">정산 예정 금액</p>
          </div>
          <p class="text-[15px] text-[#296af1] font-semibold">
            {{ formatNumber(pendingSettlement) }}원
          </p>
        </div>

        <!-- 정산일 안내 -->
        <div class="flex items-center justify-between px-4 py-4">
          <div class="flex items-center gap-3">
            <i
              class="fa-solid fa-calendar-check text-[#296af1] text-[18px]"></i>
            <p class="text-[15px] text-[#092857]">다음 정산일</p>
          </div>
          <p class="text-[14px] text-[#888888] font-medium">매월 15일</p>
        </div>
      </div>
    </section>

    <!-- 업무 도움말 -->
    <section class="mt-6 mx-5">
      <h3 class="text-[18px] font-semibold text-[#092857] mb-3">업무 도움말</h3>
      <div
        class="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden">
        <!-- 작업 매뉴얼 -->
        <div
          class="flex items-center justify-between px-4 py-4 border-b border-[#f0f0f0] cursor-pointer active:bg-[#f8f8f8] transition-colors"
          @click="openManual">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-book text-[#296af1] text-[18px]"></i>
            <p class="text-[15px] text-[#092857]">작업 매뉴얼</p>
          </div>
          <i class="fa-solid fa-chevron-right text-[#cccccc] text-[12px]"></i>
        </div>

        <!-- 공지사항 -->
        <div
          class="flex items-center justify-between px-4 py-4 border-b border-[#f0f0f0] cursor-pointer active:bg-[#f8f8f8] transition-colors"
          @click="openNotice">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-bullhorn text-[#296af1] text-[18px]"></i>
            <p class="text-[15px] text-[#092857]">공지사항</p>
            <span
              v-if="newNotices > 0"
              class="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
              {{ newNotices }}
            </span>
          </div>
          <i class="fa-solid fa-chevron-right text-[#cccccc] text-[12px]"></i>
        </div>

        <!-- 긴급 연락처 -->
        <div
          class="flex items-center justify-between px-4 py-4 cursor-pointer active:bg-[#f8f8f8] transition-colors"
          @click="openEmergencyContact">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-phone-volume text-[#ff4444] text-[18px]"></i>
            <p class="text-[15px] text-[#092857]">긴급 연락처</p>
          </div>
          <i class="fa-solid fa-chevron-right text-[#cccccc] text-[12px]"></i>
        </div>
      </div>
    </section>

    <!-- 설정 -->
    <section class="mt-6 mx-5 mb-6">
      <h3 class="text-[18px] font-semibold text-[#092857] mb-3">설정</h3>
      <div
        class="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden">
        <!-- 알림 설정 -->
        <div
          class="flex items-center justify-between px-4 py-4 border-b border-[#f0f0f0] cursor-pointer active:bg-[#f8f8f8] transition-colors"
          @click="openNotificationSettings">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-bell text-[#296af1] text-[18px]"></i>
            <p class="text-[15px] text-[#092857]">알림 설정</p>
          </div>
          <i class="fa-solid fa-chevron-right text-[#cccccc] text-[12px]"></i>
        </div>

        <!-- 앱 버전 -->
        <div class="flex items-center justify-between px-4 py-4">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-mobile-screen text-[#296af1] text-[18px]"></i>
            <p class="text-[15px] text-[#092857]">앱 버전</p>
          </div>
          <p class="text-[14px] text-[#888888]">v1.0.0</p>
        </div>
      </div>
    </section>

    <!-- 로그아웃 버튼 -->
    <section class="mx-5 mb-6">
      <button
        @click="handleLogout"
        class="w-full py-4 rounded-2xl bg-[#f5f5f5] text-[#ff4444] text-[16px] font-semibold active:bg-[#eeeeee] transition-colors shadow-sm">
        <i class="fa-solid fa-right-from-bracket mr-2"></i>
        로그아웃
      </button>
    </section>

    <!-- 고객센터 모달 -->
    <div
      v-if="showCallModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex justify-center items-center z-50"
      @click.self="closeCallModal">
      <div
        class="bg-white w-[300px] rounded-2xl shadow-lg text-center px-5 py-6">
        <p class="text-[20px] text-[#000000] font-semibold">고객센터</p>

        <p class="mt-2 text-[30px] font-extrabold tracking-wide text-[#296af1]">
          010.1234.5678
        </p>

        <p class="mt-2 text-[14px] text-[#888888]">평일 09:00 - 18:00</p>

        <button
          @click="callCenter"
          class="mt-4 w-full py-3 rounded-full bg-[#1667F2] text-white text-[16px] font-semibold flex justify-center items-center gap-2 shadow-md active:bg-[#0d5bd9] transition-colors">
          <i class="fa-solid fa-phone text-[16px]"></i>
          전화 연결
        </button>

        <button
          @click="closeCallModal"
          class="mt-2 w-full py-2 text-[14px] text-[#888888] active:opacity-70">
          취소
        </button>
      </div>
    </div>

    <!-- 로그아웃 확인 모달 -->
    <div
      v-if="showLogoutModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex justify-center items-center z-50"
      @click.self="showLogoutModal = false">
      <div
        class="bg-white w-[300px] rounded-2xl shadow-lg text-center px-5 py-6">
        <p class="text-[18px] text-[#000000] font-semibold">로그아웃</p>
        <p class="mt-2 text-[14px] text-[#888888]">
          정말 로그아웃 하시겠습니까?
        </p>

        <div class="flex gap-3 mt-5">
          <button
            @click="showLogoutModal = false"
            class="flex-1 py-2.5 rounded-full bg-[#f5f5f5] text-[#092857] text-[14px] font-medium active:bg-[#eeeeee]">
            취소
          </button>
          <button
            @click="confirmLogout"
            class="flex-1 py-2.5 rounded-full bg-[#ff4444] text-white text-[14px] font-medium active:bg-[#dd3333]">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import workerData from "@/data/worker.json";

const router = useRouter();

// 기사 더미데이터
const dataWorker = ref(workerData);

const showCallModal = ref(false);
const showLogoutModal = ref(false);

const newNotices = ref(2); // 새 공지사항 수

// 정산 예정 금액 (다음 정산일에 받을 금액)
const pendingSettlement = ref(1850000); // 예시 데이터

// 최근 활동 데이터
const recentActivities = ref([
  {
    title: "작업 완료 처리",
    time: "2시간 전",
    icon: "fa-solid fa-check-circle",
    iconBg: "bg-green-500",
  },
  {
    title: "새 예약 배정",
    time: "5시간 전",
    icon: "fa-solid fa-calendar-plus",
    iconBg: "bg-blue-500",
  },
  {
    title: "이수해야 할 안전교육",
    time: "3일 남음",
    icon: "fa-solid fa-shield-halved",
    iconBg: "bg-orange-500",
  },
]);

// 숫자 포맷팅 (천 단위 콤마)
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 고객센터 모달
const openCallModal = () => {
  showCallModal.value = true;
};

const closeCallModal = () => {
  showCallModal.value = false;
};

const callCenter = () => {
  window.location.href = "tel:01012345678";
  closeCallModal();
};

// 로그아웃
const handleLogout = () => {
  showLogoutModal.value = true;
};

const confirmLogout = () => {
  // 로그아웃 로직 (예: 토큰 삭제, 상태 초기화 등)
  localStorage.removeItem("workerToken");
  localStorage.removeItem("workerData");

  // 로그인 페이지로 이동
  router.push("/worker");
  showLogoutModal.value = false;
};

const openEmergencyContact = () => {
  // 긴급 연락처 모달 열기
  showCallModal.value = true;
};

const openNotificationSettings = () => {
  // 알림 설정 페이지로 이동 또는 모달 열기
  alert("알림 설정 기능은 준비 중입니다.");
};
</script>
