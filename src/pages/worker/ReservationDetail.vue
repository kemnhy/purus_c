<template>
  <!-- 기사 예약 상세 정보 -->
  <div class="overflow-y-auto max-h-[85vh]">
    <div>
      <!-- 지도 API -->
      <!-- 지도를 표시할 div 입니다 -->
      <div id="map" class="w-full h-[250px]"></div>
      <!-- 시간 / 상태 -->
      <div class="flex items-center justify-between border-b border-[#f1f1f1] py-5">
        <p
          :class="
            reservationDetail.status === 'waiting'
              ? 'text-[#296af1] font-bold text-[18px]'
              : 'text-[#888888]'
          ">
          {{ reservationDetail.time }}
        </p>
        <p
          :class="
            reservationDetail.status === 'waiting'
              ? 'text-[#888888] font-bold text-[16px]'
              : 'text-[#296af1]'
          ">
          {{ reservationDetail.status === "waiting" ? "청소 예정" : "청소 완료" }}
          <i class="fa-solid fa-circle-check"></i>
        </p>
      </div>
      <!-- 상세 내용 -->
      <div>
        <!-- 고객 정보 -->
        <div class="flex items-center justify-between mt-6 mb-3">
          <h3 class="text-[#092857] font-bold text-[18px]">고객 정보</h3>
          <i class="fa-solid fa-phone text-[#555555]"></i>
        </div>
        <ul class="flex flex-col gap-2">
          <li class="flex justify-between">
            <p class="text-[#555555]">이름</p>
            <p class="text-black font-semibold">{{ reservationDetail.customerName }}</p>
          </li>
          <li class="flex justify-between">
            <p class="text-[#555555]">전화번호</p>
            <p class="text-black font-semibold">{{ reservationDetail.phone }}</p>
          </li>
          <li class="flex justify-between">
            <p class="text-[#555555]">매장명</p>
            <p class="text-black font-semibold">{{ reservationDetail.cafeName }}</p>
          </li>
          <li class="flex justify-between">
            <p class="text-[#555555]">주소</p>
            <p class="text-black font-semibold">{{ reservationDetail.address }}</p>
          </li>
          <li class="flex justify-between">
            <p class="text-[#555555]">요청사항</p>
            <p class="text-black font-semibold">{{ reservationDetail.notice }}</p>
          </li>
        </ul>
        <!-- 서비스 내역 -->
        <h3 class="text-[#092857] font-bold text-[18px] mt-6 mb-3">서비스 내역</h3>
        <ul class="flex flex-col gap-2">
          <li class="flex justify-between">
            <p class="text-[#555555]">제빙기 모델명</p>
            <p class="text-black font-semibold">{{ reservationDetail.iceMachineModel }}</p>
          </li>
          <li class="flex justify-between">
            <p class="text-[#555555]">이용서비스</p>
            <p class="text-black font-semibold">{{ reservationDetail.service }}</p>
          </li>
        </ul>
      </div>
      <!-- 고객 싸인 페이지 이동 -->
      <button
        @click="goSign"
        class="text-[20px] font-bold bg-[#296af1] w-full rounded-full py-1 text-white mt-9">
        청소 상세 내역 입력하기
      </button>
    </div>
  </div>
</template>

<script setup>
import customerDataRaw from "@/data/customer.json";
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const customerData = ref(customerDataRaw); // ref로 감싸기

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
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // 주소로 좌표 검색 후 마커 표시
    geocoder.addressSearch(reservationDetail.value.address, (result, status) => {
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

// 다음페이지로 아이디 전달
const goSign = () => {
  router.push({ name: "CustomerSign", params: { id: reservationDetail.value.id } });
};
</script>
