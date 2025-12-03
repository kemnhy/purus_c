<template>
  <div class="event_banner">
    <img src="/images/eventbanner.png" alt="배너배경" />
    <div class="event_text inner">
      <div class="event_left">
        <!-- <img src="/images/logo.png" alt="로고" /> -->
        <p>
          <span class="highlight">퓨어러스 1회 케어 무상 제공</span>
          이벤트를 확인해보세요!
        </p>
      </div>
      <button @click="goReview" class="btn-check btn">
        <span>리뷰 작성하러 가기</span>
        <span><i class="fa-solid fa-arrow-right"></i></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goReview = () => {
  router.push("/review");
};
</script>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.event_banner {
  position: relative;
}

.event_text {
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: space-between;
  align-items: center;
  .event_left {
    display: flex;
    align-items: center;
    gap: 10px;
    p {
      font-size: 36px;
      color: #fff;
      font-weight: 500;
      //   padding-top: 7px;

      // 강조 부분 (제빙기 청소)
      .highlight {
        font-size: 40px;
        font-weight: 700;
        color: $sub-color;
        font-family: "Pretendard-Bold", sans-serif;
      }
    }
    img {
      width: 200px;
    }
  }
}

// 견적확인 박스
.btn-check {
  background-color: $point-color;
  color: #fff;
  border: transparent;
  border-radius: 10px;
  padding: 10px 24px;
  display: flex;
  align-items: baseline;
  gap: 30px;
  cursor: pointer;
  font-size: 25px;
  font-weight: bold;

  span {
    padding-top: 1px;
    // padding-bottom: 2.5px;
  }
  &:hover {
    background-color: #2358ca;
  }
}
</style>
