<template>
  <div class="w-full flex justify-center bg-white">
    <!-- 모바일 고정 레이아웃 -->
    <div class="w-full max-w-[440px] bg-white flex flex-col items-center pb-16">
      <!-- 상단 바 -->
      <!-- <div class="w-full flex items-center justify-between px-5 py-4">

      </div> -->

      <!-- 프로필 이미지 -->
      <div class="mt-6 flex flex-col items-center">
        <img
          src="/images/Editinfo.png"
          class="w-36 h-36 rounded-xl object-cover"
          alt="profile" />

        <button
          class="mt-4 border border-gray-300 text-gray-600 text-[] px-4 py-1 rounded-full">
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

        <!-- 계좌 정보 섹션 구분선 -->
        <div class="border-t border-[#e5e5e5] pt-5 mt-2">
          <p class="text-[#888888] text-[14px] mb-4">정산 계좌 정보</p>
        </div>

        <div
          class="flex items-center justify-between cursor-pointer active:opacity-70"
          @click="openAccountModal">
          <span class="text-[#555555] text-[18px]">은행명</span>
          <div class="flex items-center space-x-3">
            <span class="text-[18px]">{{
              accountInfo.bank || "선택 안함"
            }}</span>
            <i class="fa-solid fa-chevron-right text-[#555555] text-sm"></i>
          </div>
        </div>

        <div
          class="flex items-center justify-between cursor-pointer active:opacity-70"
          @click="openAccountModal">
          <span class="text-[#555555] text-[18px]">계좌번호</span>
          <div class="flex items-center space-x-3">
            <span class="text-[18px]">{{
              formatAccountNumber(accountInfo.accountNumber) || "등록 안함"
            }}</span>
            <i class="fa-solid fa-chevron-right text-[#555555] text-sm"></i>
          </div>
        </div>

        <div
          class="flex items-center justify-between cursor-pointer active:opacity-70"
          @click="openAccountModal">
          <span class="text-[#555555] text-[18px]">예금주</span>
          <div class="flex items-center space-x-3">
            <span class="text-[18px]">{{
              accountInfo.accountHolder || dataWorker[0].name
            }}</span>
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

// 계좌 정보
const accountInfo = ref({
  bank: "국민은행",
  accountNumber: "123456789012",
  accountHolder: dataWorker.value[0]?.name || "",
});

const showAccountModal = ref(false);

// 계좌 정보 모달 열기
const openAccountModal = () => {
  showAccountModal.value = true;
};

// 계좌번호 포맷팅 (표시용)
const formatAccountNumber = (accountNumber) => {
  if (!accountNumber) return "";
  // 숫자만 추출
  const numbers = accountNumber.replace(/\D/g, "");
  // 3-4-4 형식으로 포맷팅
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
    7,
    11
  )}`;
};

// 저장버튼 클릭 시 저장 완료 모달
const saveInfo = () => {
  // 계좌 정보 저장 로직 (실제로는 API 호출)
  console.log("전체 정보 저장:", {
    worker: dataWorker.value[0],
    account: accountInfo.value,
  });
  alert("저장이 완료되었습니다.");
  // 다시 마이페이지로 이동
  router.push({ name: "MyPage" });
};
</script>
