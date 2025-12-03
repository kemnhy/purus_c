<template>
  <div>
    <!-- 헤더영역 -->
    <Header_w lineColor="#092857" />
    <Side_menu />
    <!-- 헤더 구분선 -->
    <hr class="header_line" />
    <!-- 견적확인 -->
    <div class="esti_check esti_inner inner">
      <div class="esti_wrap">
        <!-- 영역 이름 -->
        <div class="esti_title">
          <router-link to="/estimate"><i class="fa-solid fa-arrow-left"></i></router-link>
          <p>예약하기</p>
          <p></p>
        </div>
        <!-- 게이지 -->
        <div class="esti_gauge">
          <span :style="{ width: gaugeWidth }"></span>
        </div>
        <div class="input_w">
          <!-- 개인정보 입력 -->
          <div class="personal_data">
            <div class="user_name">
              <p>
                고객님의 성함을 입력해주세요.
                <span>(필수)</span>
              </p>
              <input type="text" v-model="userName" placeholder="이름을 입력해주세요." />
            </div>
            <div class="user_number">
              <p>
                고객님의 연락처를 입력해주세요.
                <span>(필수)</span>
              </p>
              <input
                type="text"
                v-model="userPhone"
                placeholder="전화번호를 입력해주세요. (예: 01012345678)" />
            </div>
          </div>
          
          <!-- 유의사항 안내 (버튼으로 변경) -->
          <div class="notice_wrap">
            <p class="notice">
              유의사항 안내
              <span>(필수)</span>
            </p>
            <button class="agree_btn" @click="openNoticeModal" :class="{ checked: selectAgree1 }">
              <span v-if="selectAgree1">
                <i class="fa-solid fa-check"></i>
                유의사항을 확인하고 동의하였습니다.
              </span>
              <span v-else>
                유의사항 확인 및 동의하기
                <i class="fa-solid fa-chevron-right"></i>
              </span>
            </button>
          </div>
          
          <!-- 개인정보 수집 동의 (버튼으로 변경) -->
          <div class="agree_wrap">
            <p class="agree_title">
              개인정보 수집·이용 동의
              <span>(필수)</span>
            </p>
            <button class="agree_btn" @click="openPrivacyModal" :class="{ checked: selectAgree2 }">
              <span v-if="selectAgree2">
                <i class="fa-solid fa-check"></i>
                개인정보 수집·이용에 동의하였습니다.
              </span>
              <span v-else>
                개인정보 수집·이용 동의 확인하기
                <i class="fa-solid fa-chevron-right"></i>
              </span>
            </button>
          </div>
          
          <p class="small_txt">
            * 귀하는 위와 같은 일반 개인정보의 수집 및 이용을 거부할 수 있습니다. 다만, 일반
            개인정보의 필수적 수집 및 이용에 동의하지 않을 경우 서비스 이용이 불가능합니다.
          </p>
        </div>
      </div>
    </div>
    
    <!-- 다음 버튼 -->
    <div class="fixed_btn">
      <div class="esti_inner inner">
        <div class="buttons">
          <button :class="{ active: selectAgree2 }" class="btn" @click="pushMessage">
            견적만 받기
          </button>
          <button :class="{ active: selectAgree2 }" @click="goNextPage" class="btn">
            동의하고 가능한 일정 선택하기
          </button>
        </div>
      </div>
    </div>

    <!-- 유의사항 모달 -->
    <div v-if="showNoticeModal" class="modal_overlay" @click="closeNoticeModal">
      <div class="modal_content" @click.stop>
        <div class="modal_header">
          <h3>유의사항 안내</h3>
          <button class="close_btn" @click="closeNoticeModal">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal_body">
          <ul>
            <li>
              1. 서비스 범위 안내
              <p>• 제빙기 완전 분해 후 청소, 재조립하여 정상 작동을 확인 후 완료됩니다.</p>
              <p>• 제빙기 외 다른 제품들은 제외됩니다.</p>
            </li>
            <li>
              2. 예약 변경 및 취소 규정
              <p>• 서비스 전날 취소 및 일정변경: 총 요금의 30% 위약금 발생됩니다.</p>
              <p>• 서비스 당일 취소 및 일정변경: 총 요금의 50% 위약금 발생됩니다.</p>
            </li>
            <li>
              3. 현장 안내 및 추가 비용
              <p>• 서비스 1~2일 전 담당자가 연락드리며, 출입 방법을 알려주세요.</p>
              <p>
                • 접수 내용과 현장 상황이 다를 경우 추가 비용이 발생하거나, 서비스가 제한될 수
                있습니다.
              </p>
              <p>• 고객 사정으로 청소 시작 지연 시 서비스가 불가할 수 있습니다.</p>
            </li>
            <li>
              4. 결제 안내
              <p>
                • 서비스 당일 대표번호(1234-5678)로 결제 링크가 발송되며, 청소 전 결제
                부탁드립니다.
              </p>
            </li>
            <li>
              5. 현장 검수 및 AS 안내
              <p>
                • 결제 링크와 함께 검수 체크리스트가 발송되며, 담당자와 함께 현장 검수해주세요.
              </p>
              <p>• 현장 검수 완료 이후에는 추가 AS 불가합니다.</p>
            </li>
          </ul>
        </div>
        <div class="modal_footer">
          <button class="modal_agree_btn" @click="agreeNotice">
            위 내용을 모두 확인하였으며, 안내에 동의합니다.
          </button>
        </div>
      </div>
    </div>

    <!-- 개인정보 수집 동의 모달 -->
    <div v-if="showPrivacyModal" class="modal_overlay" @click="closePrivacyModal">
      <div class="modal_content" @click.stop>
        <div class="modal_header">
          <h3>개인정보 수집·이용 동의</h3>
          <button class="close_btn" @click="closePrivacyModal">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal_body">
          <ul class="privacy_list">
            <li>1. 개인정보 수집목적 및 이용목적 : 전문청소 견적 및 서비스 제공</li>
            <li>2. 수집하는 개인정보 항목 : 성명, 전화번호, 주소</li>
            <li>3. 개인정보의 보유기간 및 이용기간 : 1년간 서비스 이용이 없으면 개인정보 파기</li>
          </ul>
        </div>
        <div class="modal_footer">
          <button class="modal_agree_btn" @click="agreePrivacy">
            위 내용을 모두 확인하였으며, 안내에 동의합니다.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header_w from "@/components/Header_w.vue";
import Side_menu from "@/components/Side_menu.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

// 모달 상태 관리
const showNoticeModal = ref(false);
const showPrivacyModal = ref(false);

// 동의 상태
const selectAgree1 = ref(false);
const selectAgree2 = ref(false);

// 모달 열기/닫기
const openNoticeModal = () => {
  showNoticeModal.value = true;
};

const closeNoticeModal = () => {
  showNoticeModal.value = false;
};

const openPrivacyModal = () => {
  showPrivacyModal.value = true;
};

const closePrivacyModal = () => {
  showPrivacyModal.value = false;
};

// 동의 처리
const agreeNotice = () => {
  selectAgree1.value = true;
  closeNoticeModal();
};

const agreePrivacy = () => {
  selectAgree2.value = true;
  closePrivacyModal();
};

// 견적만 받기
const pushMessage = () => {
  alert("입력하신 연락처로 견적서를 보내드립니다.");
  router.push("/"); // 홈('/')으로 이동
};

// 입력한 정보 받기
const userName = ref("");
const userPhone = ref("");

// 다음 페이지로 넘어가면서 정보 보내기
const goNextPage = () => {
  if (userName.value === "" || userPhone.value === "") {
    return alert("이름과 전화번호를 모두 입력해주세요.");
  } else if (!isNaN(userName.value) || userPhone.value.length <= 8) {
    return alert("이름과 전화번호를 올바르게 입력해주세요.");
  } else {
    router.push({
      path: "/estimate03",
      query: {
        name: userName.value,
        phone: userPhone.value,
      },
    });
  }
};
</script>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.esti_inner {
  max-width: 1000px;
  margin: auto;
  margin-bottom: 50px;
}

// 견적 확인
.esti_title {
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $grey-color;
  margin-bottom: 15px;
  p,
  i {
    font-size: $esti-large-txt;
    font-weight: bold;
    color: $font-color;
  }
}

// 게이지
.esti_gauge {
  position: relative;
  margin-bottom: 30px;
  width: 100%;
  height: 15px;
  border-radius: 10px;
  background-color: #ebebeb;
  overflow: hidden;

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: $point-color;
    border-radius: 10px;
    transition: width 0.4s ease;
  }
}

.input_w {
  max-height: calc(100dvh - 280px);
  overflow-y: auto;
  padding-bottom: 20px;
}

// 개인정보 입력
.personal_data {
  display: flex;
  gap: $web-spacing;
  justify-content: space-between;
  .user_name,
  .user_number {
    flex: 1;
    p {
      font-size: $esti-medium-txt;
      span {
        font-size: 16px;
        color: $point-color;
      }
    }
    input {
      border: 1px solid $border-color;
      border-radius: 8px;
      padding: 10px 8px;
      margin-top: 10px;
      width: 100%;
    }
  }
}

// 동의 버튼 스타일
.notice_wrap,
.agree_wrap {
  margin-top: 50px;
  .notice,
  .agree_title {
    margin-bottom: 15px;
    font-size: $esti-medium-txt;
    span {
      font-size: 16px;
      color: $point-color;
    }
  }
}

.agree_btn {
  width: 100%;
  padding: 20px;
  background-color: #ebebeb;
  border: 2px solid #ebebeb;
  border-radius: 10px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: $point-color;
    background-color: rgba($sub-color, 0.2);
  }

  &.checked {
    background-color: rgba($sub-color, 0.5);
    border-color: $point-color;
    color: $point-color;
    font-weight: 600;

    i {
      margin-right: 10px;
    }
  }

  i {
    font-size: 14px;
  }
}

.small_txt {
  font-size: 14px;
  margin-top: 40px;
}

// 모달 스타일
.modal_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal_content {
  background-color: #fff;
  border-radius: 15px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  border-bottom: 1px solid #ebebeb;

  h3 {
    font-size: 22px;
    font-weight: 600;
    color: $font-color;
  }

  .close_btn {
    background: none;
    border: none;
    font-size: 24px;
    color: #666;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
      color: $font-color;
    }
  }
}

.modal_body {
  padding: 30px;
  overflow-y: auto;
  flex: 1;

  ul {
    display: flex;
    flex-direction: column;
    gap: 15px;

    li {
      font-size: 16px;
      line-height: 1.6;
      color: #333;

      p {
        font-size: 14px;
        margin-left: 10px;
        color: #666;
        line-height: 1.8;

        &:first-child {
          margin-top: 8px;
        }
      }
    }
  }

  .privacy_list {
    gap: 10px;

    li {
      font-size: 15px;
    }
  }
}

.modal_footer {
  padding: 20px 30px;
  border-top: 1px solid #ebebeb;

  .modal_agree_btn {
    width: 100%;
    padding: 15px;
    background-color: $point-color;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: darken($point-color, 10%);
    }
  }
}

// 다음 버튼
.fixed_btn {
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 30px;
  .esti_inner {
    margin-bottom: 30px;
    .buttons {
      display: flex;
      gap: 20px;
      .btn {
        flex: 1;
        font-weight: 600;
        text-align: center;
        background-color: $grey-color;
        color: $border-color;
        &.active {
          background-color: $point-color;
          color: #fff;
        }
      }
    }
  }
}

// 반응형
@media screen and (max-width: 768px) {
  .esti_inner {
    max-width: 600px;
  }

  .input_w {
    overflow-y: auto;
    padding-bottom: 20px;
  }
  .personal_data {
    flex-direction: column;
    gap: 30px;
  }
  .notice_wrap,
  .agree_wrap {
    margin-top: 30px;
  }
  
  .modal_content {
    max-width: 90%;
  }
  
  .fixed_btn {
    padding-top: 20px;
    .esti_inner {
      margin-bottom: 20px;
      .buttons {
        flex-direction: column;
        gap: 15px;
      }
    }
  }
}

@media screen and (max-width: 450px) {
  .esti_inner {
    max-width: 280px;
  }
  
  .esti_title {
    height: 50px;
    margin-bottom: 10px;
    p,
    i {
      font-size: $esti-medium-txt;
    }
  }
  
  .esti_gauge {
    height: 7px;
  }

  .input_w {
    max-height: calc(100dvh - (45px + 50px + 170px + 50px));
    overflow-y: auto;
    padding-bottom: 20px;
  }
  
  .personal_data {
    gap: 25px;
    .user_name,
    .user_number {
      p {
        font-size: 16px;
        span {
          font-size: 12px;
        }
      }
      input {
        font-size: 12px;
      }
    }
  }
  
  .notice_wrap,
  .agree_wrap {
    margin-top: 25px;
    .notice,
    .agree_title {
      margin-bottom: 10px;
      font-size: 16px;
      span {
        font-size: 12px;
      }
    }
  }
  
  .agree_btn {
    padding: 15px;
    font-size: 14px;
  }
  
  .modal_content {
    max-width: 95%;
    max-height: 85vh;
  }
  
  .modal_header {
    padding: 20px;
    
    h3 {
      font-size: 18px;
    }
  }
  
  .modal_body {
    padding: 20px;
    
    ul li {
      font-size: 13px;
      
      p {
        font-size: 12px;
      }
    }
  }
  
  .modal_footer {
    padding: 15px 20px;
    
    .modal_agree_btn {
      font-size: 14px;
      padding: 12px;
    }
  }
  
  .small_txt {
    font-size: 12px;
    margin-top: 25px;
  }
  
  .fixed_btn {
    padding-top: 30px;
    .esti_inner {
      margin-bottom: 30px;
      .buttons {
        gap: 20px;
        .btn {
          font-size: 18px;
        }
      }
    }
  }
}
</style>