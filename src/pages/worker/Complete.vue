<template>
  <div class="w-full min-h-screen flex justify-center">
    <div class="w-full max-w-[440px] min-h-screen bg-white flex flex-col items-center pb-10">
      <!-- 상단 바 -->
      <div class="w-full flex items-center justify-between px-5 py-4">
        <button class="text-2xl"></button>

        <div class="flex items-center space-x-4 text-2xl">
          <div class="relative"></div>
        </div>
      </div>

      <!-- 체크로고영역 -->
      <div class="mt-6">
        <div class="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
          <i class="fa-solid fa-check text-white text-5xl"></i>
        </div>
      </div>

      <!-- 타이틀 -->
      <p class="text-4xl font-bold text-center mt-6 leading-snug">
        청소가
        <br />
        완료되었습니다!
      </p>

      <!-- 정보 박스 -->
      <div class="w-full px-10 mt-10 text-lg">
        <div class="flex justify-between py-2">
          <span class="text-gray-400">이름</span>
          <span class="text-black">김사장</span>
        </div>

        <div class="flex justify-between py-2">
          <span class="text-gray-400">전화번호</span>
          <span class="text-black">010.1234.5678</span>
        </div>

        <div class="flex justify-between py-2">
          <span class="text-gray-400">매장명</span>
          <span class="text-black">메가카페</span>
        </div>

        <div class="flex justify-between py-2">
          <span class="text-gray-400">모델명</span>
          <span class="text-black">IMK-3051(카이저)</span>
        </div>

        <div class="flex justify-between py-2">
          <span class="text-gray-400">완료시간</span>
          <span class="text-black">2025.11.20(목) PM 17:00</span>
        </div>
      </div>

      <!-- 버튼  -->
      <div class="flex mt-10 space-x-4 w-full px-10">
        <button class="flex-1 border border-blue-500 text-blue-500 py-3 rounded-full text-xl">
          내역보기
        </button>

        <button class="flex-1 bg-blue-500 text-white py-3 rounded-full text-xl">홈으로 가기</button>
      </div>
    </div>
  </div>
</template>

<script setup></script>
