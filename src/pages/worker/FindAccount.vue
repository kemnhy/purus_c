<template>
  <div class="w-full flex justify-center bg-white">
    <!-- 440 고정 모바일 레이아웃 -->
    <div class="w-full max-w-[440px] min-h-screen bg-white flex flex-col items-center pt-10">
      <!-- 탭 메뉴 -->
      <div class="w-full flex justify-center border-b border-gray-300">
        <div class="flex w-[260px] justify-between">
          <!-- 아이디 찾기  -->
          <button
            class="pb-2 text-[17px] font-semibold border-b-2"
            :class="
              tab === 'id' ? 'text-blue-600 border-blue-600' : 'text-gray-400 border-transparent'
            "
            @click="tab = 'id'">
            아이디 찾기
          </button>

          <!-- 비밀번호 재설정  -->
          <button
            class="pb-2 text-[17px] font-semibold border-b-2"
            :class="
              tab === 'pw' ? 'text-blue-600 border-blue-600' : 'text-gray-400 border-transparent'
            "
            @click="tab = 'pw'">
            비밀번호 재설정
          </button>
        </div>
      </div>

      <!-- 내용 -->
      <div class="mt-10 text-center text-gray-600">등록하신 전화번호를 입력해주세요.</div>

      <!-- 전화번호 입력 -->
      <div class="mt-6 w-full flex justify-center">
        <input
          type="text"
          placeholder="전화번호 입력(01012345678)"
          class="w-[260px] h-[44px] px-4 border border-gray-300 rounded-lg text-center text-gray-600 text-[15px] placeholder-gray-400" />
      </div>

      <!-- 버튼 -->
      <button
        class="mt-10 w-[260px] h-[48px] bg-blue-600 text-white text-[16px] font-semibold rounded-full shadow-sm active:scale-95 transition">
        아이디 찾기
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tab = ref("id");
</script>
