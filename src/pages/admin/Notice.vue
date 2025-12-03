<template>
  <div class="p-4">
    <!-- 알림 관리 -->
    <div class="">
      <div class="pb-3 w-full bg-gray-100 flex flex-col items-end">
        <!-- 공지 내용 -->
        <div class="px-5 flex py-3 gap-3 w-full">
          <label for="desc" class="text-[18px] w-25 text-[#555555]">공지 내용</label>
          <textarea
            rows="5"
            v-model="noticeDesc"
            id="desc"
            class="bg-white mt-1 w-full border rounded-md border-gray-400 py-0.5"></textarea>
        </div>
        <!-- 등록 버튼 -->
        <button class="py-1.5 px-10 mr-5 rounded-md bg-[#296af1] text-white">등록</button>
      </div>
    </div>

    <!-- 알림 목록 -->
    <h1 class=" pt-5 mb-2 text-lg text-[#092857] font-bold">목록</h1>
    <!-- 테이블 영역 -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-center">
        <!-- 테이블 헤드 -->
        <thead>
          <tr class="border-b border-t border-[#8888] bg-[#F4F4F4]">
            <th class="py-3 font-medium opacity-70 border-r border-[#8888]">번호</th>
            <th class="py-3 font-medium opacity-70 border-r border-[#8888]">공지 내용</th>
            <th class="py-3 font-medium opacity-70 border-r border-[#8888]">게시일</th>
            <th class="py-3 font-medium opacity-70">관리</th>
          </tr>
        </thead>
        <!-- 테이블 바디 -->
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id" class="border-b border-[#8888]">
            <td class="py-4 opacity-80 border-r border-[#8888]">{{ item.id }}</td>
            <td class="py-4 pl-3 opacity-80 border-r border-[#8888] text-left">
              {{ item.content }}
            </td>
            <td class="py-4 opacity-80 border-r border-[#8888]">{{ item.date }}</td>
            <!-- 관리 -->
            <td class="py-4 flex justify-center gap-3">
              <button @click="delNotice(item)" class="opacity-60 cursor-pointer">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 페이지네이션 -->
    <div class="flex justify-between items-center mt-4 text-sm ">
      <span class="text-gray-500">페이지 {{ currentPage }} / {{ totalPages }}</span>
      <div class="flex gap-2">
        <button
          type="button"
          @click="goPrev"
          :class="[
            'px-3 py-1 rounded-lg border',
            currentPage === 1
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-gray-300 hover:bg-gray-50 cursor-pointer',
          ]">
          이전
        </button>
        <button
          type="button"
          @click="goNext"
          :class="[
            'px-3 py-1 rounded-lg border',
            currentPage === totalPages
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-gray-300 hover:bg-gray-50 cursor-pointer',
          ]">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const notices = ref([
  {
    id: 1,
    content: "12월 정기 소독 점검 일정이 업데이트되었습니다. 방문 전 장비 체크 부탁드립니다.",
    date: "2025-01-03",
  },
  {
    id: 2,
    content: "고객 클레임 증가로 작업 전·후 사진 촬영이 의무화되었습니다.",
    date: "2025-01-05",
  },
  {
    id: 3,
    content: "동절기 출근 시 차량 내 제빙기 용액이 얼 수 있으니 보온 박스 사용 바랍니다.",
    date: "2025-01-08",
  },
  {
    id: 4,
    content: "신규 제빙기 모델(IB-300)의 분해 세척 교육 자료가 업로드되었습니다.",
    date: "2025-01-10",
  },
  {
    id: 5,
    content: "출근 전 장비 소모품 체크리스트가 수정되었습니다. 새 버전 확인 바랍니다.",
    date: "2025-01-12",
  },
  {
    id: 6,
    content: "고객 예약량 증가로 주말 근무 가능 인원 파악 예정입니다. 협조 부탁드립니다.",
    date: "2025-01-14",
  },
  {
    id: 7,
    content: "세척제 공급 업체 변경으로 인해 다음 주부터 새로운 세척제가 지급됩니다.",
    date: "2025-01-16",
  },
  {
    id: 8,
    content: "세척 후 배수 트랩 점검 누락 사례가 보고되었습니다. 작업 마감 전 필수 확인 바랍니다.",
    date: "2025-01-19",
  },
  {
    id: 9,
    content: "제빙기 소음 관련 고객 문의 대응 매뉴얼이 새로 작성되었습니다.",
    date: "2025-01-22",
  },
  {
    id: 10,
    content: "설 연휴 기간 특별 근무 신청서 접수가 시작되었습니다.",
    date: "2025-01-25",
  },
]);

// 페이지 관련 상태
const pageSize = 8; // 한 페이지에 8개
const currentPage = ref(1);

// 총 페이지 수
const totalPages = computed(() => Math.ceil(notices.value.length / pageSize));

// 현재 페이지에 보여줄 데이터
const paginatedData = computed(() => {
  const sorted = [...notices.value].sort((a, b) => b.id - a.id); // id 기준 내림차순
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return sorted.slice(start, end);
});

// 페이지 이동 함수
const goPrev = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const goNext = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// 공지사항 삭제
const delNotice = (item) => {
  const isConfirmed = confirm("공지사항을 삭제하시겠습니까?");
  if (isConfirmed) {
    notices.value = notices.value.filter((n) => n.id !== item.id);
    alert("삭제되었습니다."); // 선택 사항
  }
};
</script>
