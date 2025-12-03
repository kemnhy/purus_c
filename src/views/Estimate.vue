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
          <p></p>
          <p>견적 확인</p>
          <p></p>
        </div>
        <!-- 게이지 -->
        <div class="esti_gauge">
          <span :style="{ width: gaugeWidth }"></span>
        </div>
        <!-- 선택영역 -->
        <div class="esti_select">
          <!-- 브랜드 선택 -->
          <div class="esti_brand">
            <div class="select_header">
              <p>
                제빙기의 브랜드를 선택해주세요.
                <span>(필수)</span>
              </p>
              <button 
                v-if="selectedIndex !== null && !isBrandOpen" 
                @click="isBrandOpen = true"
                class="edit_btn">
                변경
              </button>
            </div>
            
            <!-- 선택된 항목만 표시 -->
            <div v-if="selectedIndex !== null && !isBrandOpen" class="selected_item">
              <label class="brand_list active">
                <input type="radio" name="brand" checked disabled />
                {{ brandList[selectedIndex].name }}
              </label>
            </div>
            
            <!-- 전체 목록 표시 -->
            <div v-else>
              <label
                v-for="(brand, index) in brandList"
                :key="index"
                :class="{ active: selectedIndex === index }"
                class="brand_list">
                <input 
                  type="radio" 
                  name="brand" 
                  :value="index" 
                  v-model="selectedIndex"
                  @change="onBrandChange" />
                {{ brand.name }}
              </label>
            </div>
          </div>

          <!-- 용량 선택 -->
          <div v-if="selectedIndex !== null" class="esti_size">
            <div class="select_header">
              <p>
                제빙기의 용량을 선택해주세요.
                <span>(필수)</span>
              </p>
              <button 
                v-if="selectedI !== null && !isSizeOpen" 
                @click="isSizeOpen = true"
                class="edit_btn">
                변경
              </button>
            </div>
            
            <!-- 선택된 항목만 표시 -->
            <div v-if="selectedI !== null && !isSizeOpen" class="selected_item">
              <label class="size_list active">
                <input type="radio" name="size" checked disabled />
                {{ sizeList[selectedI].size }}
              </label>
            </div>
            
            <!-- 전체 목록 표시 -->
            <div v-else>
              <label
                v-for="(size, index) in sizeList"
                :key="index"
                :class="{ active: selectedI === index }"
                class="size_list">
                <input 
                  type="radio" 
                  name="size" 
                  :value="index" 
                  v-model="selectedI"
                  @change="onSizeChange" />
                {{ size.size }}
              </label>
            </div>
          </div>

          <!-- 모델 이름 입력 -->
          <div v-if="selectedI !== null" class="esti_model">
            <p>
              제빙기의 모델명을 입력해주세요.
              <span>(필수)</span>
            </p>
            <span>ex) IMK-3051</span>
            <input type="text" v-model="modelName" :placeholder="placeholderTxt" />
          </div>
        </div>
      </div>
    </div>
    <!-- 견적 금액 -->
    <div class="esti_price">
      <div class="esti_inner inner">
        <div class="price_txt">
          <div class="price_title">
            <p>견적 금액</p>
            <span>(VAT 포함)</span>
          </div>
          <div class="price_num">
            {{ typeof totalPrice === "number" ? totalPrice.toLocaleString() + "원" : totalPrice }}
          </div>
        </div>
        <button :class="{ active: modelName }" @click="goNextPage" class="btn">
          가능한 일정 확인하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header_w from "@/components/Header_w.vue";
import Side_menu from "@/components/Side_menu.vue";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

// 브랜드 목록
const brandList = [
  { name: "카이저(KAISER)", price: 90000 },
  { name: "호시자키(HOSHIZAKI)", price: 100000 },
  { name: "아이스트로(ICETRO)", price: 80000 },
  { name: "라셀르(Lassele)", price: 90000 },
  { name: "그 외", price: "유선 상담" },
];
const selectedIndex = ref(null);
const isBrandOpen = ref(true); // 브랜드 목록 열림/닫힘 상태

const sizeList = [
  { size: "~ 20kg", price: 0 },
  { size: "21 ~ 30kg", price: 10000 },
  { size: "31 ~ 50kg", price: 20000 },
  { size: "51kg ~", price: 30000 },
];
const selectedI = ref(null);
const isSizeOpen = ref(true); // 용량 목록 열림/닫힘 상태

// 브랜드 선택 시 목록 닫기
const onBrandChange = () => {
  isBrandOpen.value = false;
  // 브랜드 변경 시 용량과 모델명 초기화
  selectedI.value = null;
  isSizeOpen.value = true;
  modelName.value = "";
};

// 용량 선택 시 목록 닫기
const onSizeChange = () => {
  isSizeOpen.value = false;
};

// 게이지 계산 (단계별로 3단계)
const gaugeWidth = computed(() => {
  if (selectedI.value !== null) return "95%"; // 3단계
  if (selectedIndex.value !== null) return "66%"; // 2단계
  return "33%"; // 1단계 (브랜드 선택 시작)
});

// 💰 견적 금액 계산
const totalPrice = computed(() => {
  if (selectedIndex.value === null) return 0;

  const brandPrice = brandList[selectedIndex.value]?.price;
  const sizePrice = selectedI.value !== null ? sizeList[selectedI.value]?.price || 0 : 0;

  // 브랜드가 '그 외'면 문자열 반환
  if (typeof brandPrice !== "number") return brandPrice;

  return brandPrice + sizePrice;
});

const modelName = ref("");
// 다음 페이지 넘어가기
const goNextPage = () => {
  if (selectedI.value === null && selectedIndex.value === null) {
    alert("모든 옵션을 선택해주세요.");
  } else if (modelName.value === "") {
    alert("모델명을 입력해주세요.");
  } else {
    router.push("/estimate02");
  }
};

// 390px일때 모델명 placeholder 생기기
const placeholderTxt = ref("");
const updatePlaceholder = () => {
  placeholderTxt.value = window.innerWidth <= 390 ? "ex) IMK-3051" : "";
};

onMounted(() => {
  updatePlaceholder();
  window.addEventListener("resize", updatePlaceholder);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updatePlaceholder);
});
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

.esti_inner {
  max-width: 1000px;
  margin: auto;
}
// 견적 확인
// 영역 이름
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
    height: 100%;
    background-color: $point-color;
    border-radius: 10px;
    transition: width 0.4s ease;
  }
}
// 영역에 스크롤
.esti_select {
  max-height: calc(100vh - 390px);
  overflow-y: auto;
  padding-bottom: 20px;
}

// 선택 헤더 (제목 + 변경 버튼)
.select_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  p {
    font-size: $esti-medium-txt;
    span {
      font-size: 16px;
      color: $point-color;
    }
  }
}

.edit_btn {
  padding: 8px 20px;
  background-color: #fff;
  border: 1px solid $point-color;
  color: $point-color;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: $point-color;
    color: #fff;
  }
}

// 선택된 항목 표시
.selected_item {
  margin-bottom: 30px;
  
  .brand_list,
  .size_list {
    input {
      pointer-events: none;
    }
  }
}

// 브랜드 선택, 용량 선택
.esti_brand,
.esti_size {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  
  > div:not(.select_header) {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .brand_list,
  .size_list {
    font-size: $small-txt;
    padding: 20px;
    border: 1px solid $border-color;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    input {
      margin-right: 15px;
    }
    
    &.active {
      color: $point-color;
      font-weight: bold;
      border: 1px solid $point-color;
      background-color: rgba($sub-color, 0.5);
    }
    
    &:hover:not(.active) {
      border-color: $point-color;
      background-color: rgba($sub-color, 0.2);
    }
  }
}

// 모델명 입력
.esti_model {
  p {
    font-size: $esti-medium-txt;
    margin-bottom: 15px;
    span {
      font-size: 16px;
      color: $point-color;
      display: inline;
    }
  }
  span {
    color: $border-color;
    font-size: 16px;
    display: block;
  }
  input {
    border: 1px solid $border-color;
    border-radius: 8px;
    padding: 15px;
    font-size: 16px;
    margin-top: 10px;
    width: 100%;
  }
}

// 견적 금액
.esti_price {
  background-color: #fff;
  width: 100%;
  height: 200px;
  border-top: 1px solid $grey-color;
  position: fixed;
  bottom: 0;
  padding: 20px 0;
  .price_txt {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .price_title {
      p {
        font-size: $esti-large-txt;
        font-weight: 600;
      }
      span {
        font-size: 14px;
      }
    }
    .price_num {
      font-size: $esti-large-txt;
      color: $point-color;
      font-weight: 600;
    }
  }
  .btn {
    background-color: $grey-color;
    color: $border-color;
    display: inline-block;
    text-align: center;
    margin: auto;
    width: 100%;
    font-weight: 600;
    cursor: pointer;
    &.active {
      background-color: $point-color;
      color: #fff;
    }
  }
}

// 반응형
@media screen and (max-width: 768px) {
  .esti_inner {
    max-width: 600px;
  }
}
@media screen and (max-width: 450px) {
  .esti_inner {
    max-width: 280px;
  }
  // 영역 이름
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
  
  .select_header {
    margin-bottom: 10px;
    
    p {
      font-size: 16px;
      span {
        font-size: 12px;
      }
    }
  }
  
  .edit_btn {
    padding: 6px 15px;
    font-size: 12px;
  }
  
  // 브랜드 선택, 용량 선택
  .esti_brand,
  .esti_size {
    margin-bottom: 25px;
    
    > div:not(.select_header) {
      gap: 10px;
    }
    
    .brand_list,
    .size_list {
      font-size: 16px;
      padding: 10px;
      input {
        margin-right: 10px;
      }
    }
  }
  
  .esti_model {
    p {
      font-size: 16px;
      margin-bottom: 10px;
      span {
        font-size: 12px;
      }
    }
    span {
      display: none;
    }
    input {
      padding: 10px 8px;
      font-size: 14px;
    }
  }
  .esti_price {
    height: 170px;
    .price_txt {
      margin-bottom: 15px;
      .price_title {
        p {
          font-size: $esti-medium-txt;
        }
        span {
          font-size: 12px;
        }
      }
      .price_num {
        font-size: $esti-medium-txt;
      }
    }
    .btn {
      font-size: $small-txt;
    }
  }
  .esti_select {
    max-height: calc(100dvh - (45px + 50px + 170px + 57px));
    padding-bottom: 0px;
  }
}
</style>