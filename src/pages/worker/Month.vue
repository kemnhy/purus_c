<template>
  <!-- 이달의 청소 -->
  <div>
    <!-- 탭버튼 -->
    <div class="w-full flex">
      <button
        @click="calendarTab = 'list'"
        :class="
          calendarTab === 'list'
            ? 'text-[#092857] font-bold border-b-3 border-[#296af1]'
            : 'text-[#888888] border-b-3 border-[#f1f1f1]'
        "
        class="flex-1 py-3">
        이달의 예약 목록
      </button>
      <button
        @click="calendarTab = 'calendar'"
        :class="
          calendarTab === 'calendar'
            ? 'text-[#092857] font-bold border-b-3 border-[#296af1]'
            : 'text-[#888888] border-b-3 border-[#f1f1f1]'
        "
        class="flex-1 py-3">
        달력
      </button>
    </div>
    <!-- 예약 목록 -->
    <!-- 전체 예약 -->
    <div v-if="calendarTab === 'list'" class="overflow-y-auto max-h-[61vh] pt-[50px]">
      <!-- 전체 예약 목록 -->
      <div
        v-for="customer in dataCustomer"
        :key="customer.id"
        class="p-4 rounded-2xl bg-[#f1f1f1] mb-2 grid grid-cols-2 gap-2">
        <!-- 왼쪽 목록 -->
        <div class="flex flex-col">
          <!-- 시간 -->
          <div class="flex items-center mb-1">
            <p
              class="px-1.5 rounded-full"
              :class="
                customer.status === 'waiting'
                  ? 'text-[#092857] font-bold bg-[#dce7fb]'
                  : 'text-[#888888] bg-white'
              ">
              <i class="fa-solid fa-clock text-[11px]"></i>
            </p>
            <p
              :class="customer.status === 'waiting' ? 'text-[#296af1] font-bold' : 'text-[#888888]'"
              class="ml-2 text-[12px]">
              {{ customer.date }} | {{ customer.time }}
            </p>
          </div>
          <!-- 장소 -->
          <div class="flex items-center">
            <p
              class="px-1.5 rounded-full"
              :class="
                customer.status === 'waiting'
                  ? 'text-[#092857] font-bold bg-[#dce7fb]'
                  : 'text-[#888888] bg-white'
              ">
              <i class="fa-solid fa-location-dot text-[12px]"></i>
            </p>
            <p
              :class="customer.status === 'waiting' ? 'text-[#092857] font-bold' : 'text-[#888888]'"
              class="ml-2 text-[12px]">
              {{ customer.addr }}
            </p>
          </div>
        </div>
        <!-- 오른쪽 목록 -->
        <div class="flex flex-col">
          <!-- 이름 -->
          <div class="flex items-center mb-1">
            <p
              class="px-1.5 rounded-full"
              :class="
                customer.status === 'waiting'
                  ? 'text-[#092857] font-bold bg-[#dce7fb]'
                  : 'text-[#888888] bg-white'
              ">
              <i class="fa-solid fa-user text-[12px]"></i>
            </p>
            <p
              :class="customer.status === 'waiting' ? 'text-[#092857]' : 'text-[#888888]'"
              class="ml-2 text-[12px]">
              {{ customer.name }}({{ customer.cafename }})
            </p>
          </div>

          <!-- 모델명 -->
          <div class="flex">
            <p
              class="px-1.5 rounded-full"
              :class="
                customer.status === 'waiting'
                  ? 'text-[#092857] font-bold bg-[#dce7fb]'
                  : 'text-[#888888] bg-white'
              ">
              <i class="fa-solid fa-cube text-[12px]"></i>
            </p>
            <p
              :class="customer.status === 'waiting' ? 'text-[#092857]' : 'text-[#888888]'"
              class="ml-2 text-[12px]">
              {{ customer.model }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 달력 -->
    <Calendar v-if="calendarTab === 'calendar'" />
  </div>
</template>

<script setup>
import Calendar from "@/components/worker/Calendar.vue";
import customerData from "@/data/customer.json";
import { ref } from "vue";

// 더미데이터 불러오기
const dataCustomer = ref(customerData);

const calendarTab = ref("list");
</script>
