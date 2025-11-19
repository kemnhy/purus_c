<template>
  <div class="w-full flex justify-center bg-white">
    <!-- 모바일 고정 레이아웃 -->
    <div class="w-full max-w-[440px] bg-white flex flex-col items-center pb-16">
      <!-- 상단 바 -->
      <!-- <div class="w-full flex items-center justify-between px-5 py-4">
        <div class="relative"></div>
      </div> -->

      <!-- 프로필 이미지 -->
      <div class="mt-6 flex flex-col items-center">
        <img src="/images/Editinfo.png" class="w-36 h-36 rounded-xl object-cover" alt="profile" />

        <button class="mt-4 border border-gray-300 text-gray-600 text-[] px-4 py-1 rounded-full">
          사진변경
        </button>
      </div>

      <!-- 정보 리스트 -->
      <div class="flex flex-col w-full mt-10 px-6 text-[15px] gap-5">
        <div class="flex items-center justify-between">
          <span class="text-[#555555] text-[18px]">이름</span>
          <div class="flex items-center space-x-3">
            <span class="text-[18px]">{{ dataWorker[0].name }}</span>
            <i class="fa-solid fa-chevron-right text-[#555555] text-sm"></i>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-[#555555] text-[18px]">생년월일</span>
          <div class="flex items-center space-x-3">
            <span class="text-[18px]">{{ dataWorker[0].birth }}</span>
            <i class="fa-solid fa-chevron-right text-[#555555] text-sm"></i>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-[#555555] text-[18px]">휴대폰 번호</span>
          <div class="flex items-center space-x-3">
            <span class="text-[18px]">{{ dataWorker[0].phone }}</span>
            <i class="fa-solid fa-chevron-right text-[#555555] text-sm"></i>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-[#555555] text-[18px]">이메일</span>
          <div class="flex items-center space-x-3">
            <span class="text-[18px]">{{ dataWorker[0].email }}</span>
            <i class="fa-solid fa-chevron-right text-[#555555] text-sm"></i>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-[#555555] text-[18px]">주소</span>
          <div class="flex items-center space-x-3">
            <span class="text-[18px]">{{ dataWorker[0].addr }}</span>
            <i class="fa-solid fa-chevron-right text-[#555555] text-sm"></i>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-[#555555] text-[18px]">비밀번호</span>
          <div class="flex items-center space-x-3">
            <span class="text-[18px]">*******</span>
            <i class="fa-solid fa-chevron-right text-[#555555] text-sm"></i>
          </div>
        </div>
      </div>

      <!-- 저장하기-->
      <div class="w-full px-6 mt-10">
        <button
          @click="saveInfo"
          class="text-[20px] font-bold bg-[#296af1] w-full rounded-full py-1 text-white mt-9">
          저장하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import workerData from "@/data/worker.json";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 기사 더미데이터
const dataWorker = ref(workerData);

// 저장버튼 클릭 시 저장 완료 모달
const saveInfo = () => {
  alert("저장이 완료되었습니다.");
  // 다시 마이페이지로 이동
  router.push({ name: "MyPage" });
};
</script>
