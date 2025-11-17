<template>
  <!-- 서비스 상세 고객 서명 -->
  <h2>청소 상세 내역</h2>
  <p>이름: {{ reservationDetail.name }}</p>
  <p>전화번호: {{ reservationDetail.phone }}</p>
  <p>주소: {{ reservationDetail.addr }}</p>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import customerDataRaw from "@/data/customer.json";

const route = useRoute();
const customerData = ref(customerDataRaw);

// route.params.id를 사용해서 reservationDetail 가져오기
const reservationDetail = computed(() =>
  customerData.value.find((c) => String(c.id) === String(route.params.id))
);
</script>
