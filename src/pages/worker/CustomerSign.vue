<template>
  <!-- 서비스 상세 고객 서명 -->
  <div class="flex flex-col gap-10 mb-[68px]">
    <!-- 타이틀 -->
    <h2 class="text-2xl font-bold text-[#092857]">
      서비스내역을 확인하고<br />서명해주세요
    </h2>
    <!-- 섹션1 / 고객정보 -->
    <div>
      <h5 class="text-lg font-bold text-[#092857] pb-4">고객정보</h5>
      <div class="flex w-full justify-between">
        <span class="opacity-60">이름</span
        ><span class="font-bold">{{ reservationDetail.name }}</span>
      </div>
      <div class="flex w-full justify-between">
        <span class="opacity-60">전화번호</span
        ><span class="font-bold">{{ reservationDetail.phone }}</span>
      </div>
      <div class="flex w-full justify-between">
        <span class="opacity-60">매장명</span
        ><span class="font-bold">{{ reservationDetail.cafename }}</span>
      </div>
    </div>
    <!-- 섹션2 / 서비스 내역 -->
    <div>
      <h5 class="text-lg font-bold text-[#092857] pb-4">서비스 내역</h5>
      <div class="flex w-full justify-between">
        <span class="opacity-60">제빙기 모델명</span
        ><span class="font-bold">{{ reservationDetail.model }}</span>
      </div>
      <div class="flex w-full justify-between">
        <span class="opacity-60">이용서비스</span
        ><span class="font-bold">{{ reservationDetail.service }}</span>
      </div>
      <div class="flex w-full justify-between">
        <span class="opacity-60">담당 기사님</span
        ><span class="font-bold">{{ reservationDetail.worker }}</span>
      </div>
    </div>
    <!-- 폼 -->
    <form @submit.prevent="onSubmit" class="flex flex-col gap-10">
      <!-- 섹션3 / 서비스 상세 -->
      <div>
        <h5 class="text-lg font-bold text-[#092857] pb-4">서비스 상세</h5>
        <textarea
          v-model="textarea"
          class="w-full border-[1px] border-[rgba(0,0,0,0.3)] rounded-lg px-4 py-3 placeholder:opacity-70"
          placeholder="서비스 내용을 입력해주세요"
        ></textarea>
        <label
          class="flex gap-1 items-center justify-center w-full p-1.5 border-2 border-dashed border-[rgba(0,0,0,0.25)] rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50"
        >
          <i class="fa-solid fa-camera opacity-40"></i>
          <span class="opacity-40">{{ fileName || "사진첨부" }}</span>
          <input type="file" class="hidden" @change="onFileChange"
        /></label>
      </div>
      <!-- 섹션4 / 서명 -->
      <div>
        <h5 class="text-lg font-bold text-[#092857] pb-4">서명</h5>
        <!-- 사인패드 -->
        <VueSignaturePad
          height="180px"
          class="w-full border-[1px] rounded-lg border-[rgba(0,0,0,0.3)]"
          ref="signaturePad"
        />
      </div>
      <!-- 확인버튼 -->
      <button
        type="submit"
        class="cursor-pointer text-[20px] font-semibold bg-[#296af1] w-full rounded-full py-1 text-white"
      >
        확인
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import customerDataRaw from "@/data/customer.json";

const router = useRouter();
const route = useRoute();
const customerData = ref(customerDataRaw);

// route.params.id를 사용해서 reservationDetail 가져오기
const reservationDetail = computed(() =>
  customerData.value.find((c) => String(c.id) === String(route.params.id))
);

// 인풋 / 사인패드
const textarea = ref("");
const signaturePad = ref(null);
// 파일 인풋
const fileName = ref("");
const fileBase64 = ref(null);

// 파일변환함수
function onFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  fileName.value = file.name;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    fileBase64.value = reader.result; // base64 저장
  };
}

// 확인버튼
function onSubmit() {
  if (textarea.value && fileBase64.value) {
    router.push({
      name: "DetailComplete",
      query: {
        text: textarea.value,
        file: fileBase64.value,
      },
      params: { id: reservationDetail.value.id },
    });
  } else {
    alert("서비스 내역을 모두 작성해주세요.");
  }
}
</script>
