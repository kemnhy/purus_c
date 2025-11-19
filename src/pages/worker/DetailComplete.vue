<template>
  <!-- 완료된 예약 상세 -->
  <div class="mb-[68px]">
    <!-- 지도 API -->
    <!-- 지도를 표시할 div 입니다 -->
    <div id="map" class="w-full h-[250px]"></div>
    <!-- 시간 / 상태 -->
    <div
      class="flex items-center justify-between border-b border-[#f1f1f1] py-5"
    >
      <p class="text-[#296af1] font-bold text-[18px]">
        {{ reservationDetail.date }}
        {{ reservationDetail.time }}
      </p>
      <p class="text-[#296af1] font-bold">
        청소완료
        <i class="fa-solid fa-circle-check"></i>
      </p>
    </div>
    <!-- 상세 내용 -->
    <div class="flex flex-col gap-10 py-4">
      <!-- 섹션1 / 고객정보 -->
      <div>
        <div class="flex justify-between">
          <h5 class="text-lg font-bold text-[#092857] pb-4">고객정보</h5>
          <i class="fa-solid fa-phone opacity-60" @click="openCallModal"></i>
        </div>
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
        <div class="flex w-full justify-between">
          <span class="opacity-60">주소</span
          ><span class="font-bold">{{ reservationDetail.addr }}</span>
        </div>
        <div class="flex w-full justify-between">
          <span class="opacity-60">요청사항</span
          ><span class="font-bold">{{ reservationDetail.notice }}</span>
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
      </div>
      <!-- 섹션3-1 / 서비스 상세 -->
      <div>
        <h5 class="text-lg font-bold text-[#092857] pb-4">서비스 상세</h5>
        <p>{{ serviceText }}</p>
      </div>
      <!-- 섹션3-2 / 첨부한 파일 -->
      <div>
        <h5 class="text-lg font-bold text-[#092857] pb-4">첨부한 파일</h5>
        <img :src="file" class="w-[50%] rounded" />
      </div>
      <!-- 섹션4 / 서명 -->
      <div>
        <h5 class="text-lg font-bold text-[#092857] pb-4">고객 확인 서명</h5>
        <img src="/public/images/sign.png" alt="sign" />
      </div>
    </div>
    <!-- 고객통화 모달 -->
    <div
      v-if="showCallModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex justify-center items-center z-50"
      @click="showCallModal = false"
    >
      <div
        class="bg-white w-[300px] rounded-2xl shadow-lg text-center px-5 py-6"
      >
        <p class="text-[20px] text-[#000000]">통화하기</p>

        <p class="mt-2 text-[30px] font-extrabold tracking-wide">
          010.1234.5678
        </p>

        <button
          class="mt-4 w-full py-3 rounded-full bg-[#1667F2] text-white text-[16px] font-semibold flex justify-center items-center gap-2 shadow-md"
          @click="callCenter"
        >
          <i class="fa-solid fa-phone text-[16px]"></i>
          전화 연결
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import customerDataRaw from "@/data/customer.json";

const route = useRoute();
const customerData = ref(customerDataRaw);
const showCallModal = ref(false);

// 통화모달 띄우기
const openCallModal = () => {
  showCallModal.value = true;
};

// textarea 받아오기
const serviceText = route.query.text;
// 파일 받아오기const text = route.query.text;
const file = route.query.file; // base64 이미지

// route.params.id를 사용해서 reservationDetail 가져오기
const reservationDetail = computed(() =>
  customerData.value.find((c) => String(c.id) === String(route.params.id))
);

// 지도
const map = ref(null);

onMounted(() => {
  if (!reservationDetail.value) return;

  // Kakao Maps API 로드 후 실행
  window.kakao.maps.load(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(35.868813, 128.594944),
      level: 3,
    };

    // 지도 객체 생성
    map.value = new kakao.maps.Map(container, options);

    // Geocoder 생성 (반드시 maps.load 안에서)
    const geocoder = new kakao.maps.services.Geocoder();

    // 마커 이미지
    const imageSrc = "/images/location.png";
    const imageSize = new kakao.maps.Size(20, 30);
    const imageOption = { offset: new kakao.maps.Point(15, 40) };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    // 주소로 좌표 검색 후 마커 표시
    geocoder.addressSearch(reservationDetail.value.addr, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        const marker = new kakao.maps.Marker({
          map: map.value,
          position: coords,
          image: markerImage,
        });

        map.value.setCenter(coords);
      } else {
        console.error("주소 검색 실패:", status);
      }
    });
  });
});
</script>
