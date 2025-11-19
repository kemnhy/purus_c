<template>
  <div class="w-full max-w-[440px] mx-auto bg-white">
    <!-- 상단 네비 -->
    <!-- <header class="flex justify-between items-center px-5 py-4">
      <div class="relative"></div>
    </header> -->

    <!-- 프로필 -->
    <section class="flex flex-col justify-center items-center mt-6">
      <img
        src="/images/Editinfo.png"
        alt="기사 프로필"

        class="w-36 h-36 rounded-2xl object-cover" />
      <h2 class="mt-3 text-[30px] font-semibold text-[#296af1]">{{ dataWorker[0].name }}기사님</h2>
    </section>

    <!-- 3개 메뉴 버튼 -->
    <section class="bg-[#296af1] mt-6 rounded-2xl text-white flex justify-around py-4">
      <div class="flex flex-col items-center">
        <div
          class="flex flex-col items-center gap-2"
          @click="$router.push('/worker/dashboard/editinfo')">
          <i class="fa-solid fa-pen-to-square text-[22px] mt-1"></i>
          <p class="text-[14px]">내정보 수정</p>
        </div>
      </div>

      <div class="flex flex-col items-center relative gap-2">
        <i class="fa-solid fa-table-list text-[22px] mt-1"></i>
        <p class="text-[14px]">전체 내역 조회</p>

        <!-- <span
          class="absolute -top-2 right-5 bg-red-500 text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex justify-center items-center">
          36
        </span> -->
      </div>

      <!-- 고객센터 버튼 -->
      <div class="flex flex-col items-center gap-2 mr-1" @click="openCallModal">
        <i class="fa-solid fa-headset text-[22px] mt-1"></i>
        <p class="text-[14px]">고객센터</p>
      </div>
    </section>

    <!-- 정보 카드 -->
    <section class="bg-[#E8F4FF] mt-6 rounded-2xl px-5 py-5 text-[#092857]">
      <div class="flex justify-between pb-3 border-b border-[#dddddd] text-[18px]">
        <p class="text-[#888888]">나의 소득</p>
        <p class="font-semibold">{{ dataWorker[0].payment }}원</p>
      </div>

      <div class="flex justify-between py-3 border-b border-[#dddddd] text-[18px]">
        <p class="text-[#888888]">이달의 완료 건수</p>
        <p class="font-semibold">{{ dataWorker[0].complete }}건</p>
      </div>

      <div class="flex justify-between pt-3 text-[18px]">
        <p class="text-[#888888]">평점</p>
        <p class="font-semibold">{{ dataWorker[0].rating }}점</p>
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
import workerData from "@/data/worker.json";

// 기사 더미데이터
const dataWorker = ref(workerData);

const showCallModal = ref(false);

const openCallModal = () => {
  showCallModal.value = true;
};

const closeCallModal = () => {
  showCallModal.value = false;
};

const callCenter = () => {
  window.location.href = "tel:01012345678";
};
</script>
