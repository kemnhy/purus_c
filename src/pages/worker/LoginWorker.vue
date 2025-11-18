<template>
  <div
    class="w-screen h-screen max-w-md bg-gradient-to-b from-white to-[#F0FAFF] m-auto"
  >
    <!-- 로고 및 서브타이틀 -->
    <div class="flex flex-col items-center gap-4 pt-[120px] pb-[80px]">
      <img src="/public/images/logo.png" alt="logo" class="w-[200px]" />
      <p class="font-bold text-[#3079DB] text-[20px]">기사 전용 App</p>
    </div>
    <!-- 인풋박스 -->
    <div
      class="bg-white w-[87%] h-[calc(100%-296px)] rounded-t-[30px] shadow-[1px_4px_30px_rgba(0,0,0,0.11)] m-auto pt-[60px] px-[35px]"
    >
      <!-- 폼 -->
      <form @submit.prevent="logIn">
        <!-- 인풋 -->
        <div class="flex flex-col gap-5">
          <input
            v-model="workerId"
            type="text"
            placeholder="ID"
            class="w-full border border-[#bbb] py-[5px] px-[12px] rounded-sm placeholder:opacity-70 focus:border-[#296af1] focus:outline-none"
          />
          <input
            v-model="password"
            type="password"
            placeholder="PASSWORD"
            class="w-full border border-[#bbb] py-[5px] px-[12px] rounded-sm placeholder:opacity-70 focus:border-[#296af1] focus:outline-none"
          />
        </div>
        <!-- 로그인 버튼 -->
        <button
          type="submit"
          class="cursor-pointer text-[20px] font-semibold bg-[#296af1] w-full rounded-full py-1 text-white mt-9 mb-5"
        >
          Log In
        </button>
      </form>
      <!-- 아이디 / 비밀번호 찾기 -->
      <button
        @click="goFindAccount"
        class="w-full opacity-60 text-center cursor-pointer"
      >
        아이디 / 비밀번호 찾기
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// router
const router = useRouter();

// 아이디 / 비밀번호 인풋
const workerId = ref("");
const password = ref("");

// 로그인 함수
function logIn() {
  if (workerId.value && password.value) {
    alert("로그인 되었습니다.");
    router.push({ name: "WorkerHome" });
  } else {
    alert("아이디와 비밀번호를 모두 입력해주세요.");
  }
}

// 아이디 / 비밀번호찾기
function goFindAccount() {
  router.push({ name: "FindAccount" });
}
</script>

