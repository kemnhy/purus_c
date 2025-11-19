<template>
  <div class="w-full max-w-[440px] mx-auto min-h-screen bg-white">
    <!-- 상단 네비 -->
    <header class="flex justify-between items-center px-5 py-4">
      <div class="relative"></div>
    </header>

    <!-- 프로필 -->
    <section class="flex flex-col justify-center items-center mt-6">
      <img
        src="/public/images/Editinfo.png"
        alt="기사 프로필"
        class="w-[139px] h-[139px] rounded-2xl object-cover"
      />
      <h2 class="mt-3 text-[30px] font-semibold text-[#296af1]">
        이깨끗기사님
      </h2>
    </section>

    <!-- 3개 메뉴 버튼 -->
    <section
      class="bg-[#1667F2] mx-5 mt-6 rounded-2xl text-white flex justify-around py-4"
    >
      <div class="flex flex-col items-center">
        <div
          class="flex flex-col items-center"
          @click="$router.push('/worker/dashboard/editinfo')"
        >
          <i class="fa-regular fa-pen-to-square text-[22px]"></i>
          <p class="mt-1 text-[14px]">내정보 수정</p>
        </div>
      </div>

      <div class="flex flex-col items-center relative">
        <i class="fa-regular fa-clipboard text-[22px]"></i>
        <p class="mt-1 text-[14px]">전체 내역 조회</p>

        <span
          class="absolute -top-2 right-5 bg-red-500 text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex justify-center items-center"
        >
          36
        </span>
      </div>

      <!-- 고객센터 버튼 -->
      <div class="flex flex-col items-center" @click="openCallModal">
        <i class="fa-solid fa-headset text-[22px]"></i>
        <p class="mt-1 text-[14px]">고객센터</p>
      </div>
    </section>

    <!-- 정보 카드 -->
    <section
      class="bg-[#E8F4FF] mx-5 mt-6 rounded-2xl px-5 py-4 text-[#092857]"
    >
      <div
        class="flex justify-between py-3 border-b border-gray-300 text-[18px]"
      >
        <p class="text-[#888888]">나의 소득</p>
        <p class="font-semibold">2,150,000원</p>
      </div>

      <div
        class="flex justify-between py-3 border-b border-gray-300 text-[18px]"
      >
        <p class="text-[#888888]">10월 완료 건수</p>
        <p class="font-semibold">33건</p>
      </div>

      <div class="flex justify-between py-3 text-[18px]">
        <p class="text-[#888888]">평점</p>
        <p class="font-semibold">4.9점</p>
      </div>
    </section>

    <!-- 고객센터 모달 -->
    <div
      v-if="showCallModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex justify-center items-center z-50"
      @click.self="closeCallModal"
    >
      <div
        class="bg-white w-[300px] rounded-2xl shadow-lg text-center px-5 py-6"
      >
        <p class="text-[20px] text-[#000000]">고객센터</p>

        <p class="mt-2 text-[30px] font-extrabold tracking-wide">
          010.1234.5678
        </p>

        <button
          class="mt-4 w-full py-3 rounded-full bg-[#1667F2] text-white text-[16px] font-semibold flex justify-center items-center gap-2 shadow-md"
        >
          <i class="fa-solid fa-phone text-[16px]"></i>
          전화 연결
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showCallModal = ref(false);

const openCallModal = () => {
  showCallModal.value = true;
};

const closeCallModal = () => {
  showCallModal.value = false;
};

</script>
