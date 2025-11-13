<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const SHEETDB_API = "https://sheetdb.io/api/v1/qgf9o9vku818n";
const revInfo = ref([]);
const filteredReviews = ref([]);
const rating = ref(0);
const activeFilter = ref("최신순");
const isLoading = ref(true);
const selectedImage = ref(null);
const showImageModal = ref(false);
const copiedSuccess = ref(false);
const hoverRating = ref(0);
const isMobile = ref(window.innerWidth <= 450);

//  리사이즈 핸들러
const handleResize = () => {
  isMobile.value = window.innerWidth <= 450;
};

onMounted(() => {
  getReviewsInfo();
  console.log(averageScore.value);
  loadLikedReviews();
  window.addEventListener("resize", handleResize);
});

// 해제
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const getReviewsInfo = async () => {
  isLoading.value = true;
  try {
    const response = await fetch(SHEETDB_API);
    const data = await response.json();

    // 타입체크
    if (!Array.isArray(data)) {
      console.error("다른 데이터 형태:", data);
      return;
    }

    // comment가 있는 것만 필터링 후 map
    revInfo.value = data
      .filter((item) => item.REV_COMMENT)
      .map((item) => ({
        id: item.id,
        username: item.USER_NM,
        rating: Number(item.REV_RATING) || 0,
        comment: item.REV_COMMENT,
        date: item.REV_DT || "",
        service: item.SERVICE || "",
        likes: Number(item.REV_LIKES) || 0,
        images: item.REV_IMG ? item.REV_IMG.split(",").map((img) => img.trim()) : [],
        userImage: item.USER_IMG ? item.USER_IMG : [],
      }));

    filteredReviews.value = [...revInfo.value];
    console.log("리뷰 불러오기 확인:", revInfo.value);
    console.log("리뷰 개수:", revInfo.value.length);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    isLoading.value = false;
  }
};

// //////-----------------
// 카드형 리뷰 데이터
const reviewCards = ref([
  {
    profileImg: "/images/profile.png",
    username: "진** 고객님",
    date: "2025.09.16",
    service: "카이저제빙기 디테일 클리어서비스 이용",
    mainImage: "/images/review/1.png",
    description:
      "퓨어러스는 제빙기 내부에 있는 모든 오염들에 대해 완벽한 케어를 목표로 하고 있습니다. 전문적인 장비와 기술로 깨끗하게 청소해주셔서 정말 만족스럽습니다.",
  },
  {
    profileImg: "/images/profile.png",
    username: "최** 고객님",
    date: "2025.09.16",
    service: "카이저제빙기 디테일 클리어서비스 이용",
    mainImage: "/images/review/2.png",
    description:
      "퓨어러스는 제빙기 내부에 있는 모든 오염들에 대해 완벽한 케어를 목표로 하고 있습니다. 전문적인 장비와 기술로 깨끗하게 청소해주셔서 정말 만족스럽습니다.",
  },
  {
    profileImg: "/images/profile.png",
    username: "김** 고객님",
    date: "2025.09.16",
    service: "카이저제빙기 디테일 클리어서비스 이용",
    mainImage: "/images/review/3.png",
    description:
      "퓨어러스는 제빙기 내부에 있는 모든 오염들에 대해 완벽한 케어를 목표로 하고 있습니다. 전문적인 장비와 기술로 깨끗하게 청소해주셔서 정말 만족스럽습니다.",
  },
  {
    profileImg: "/images/profile.png",
    username: "이** 고객님",
    date: "2025.09.16",
    service: "카이저제빙기 디테일 클리어서비스 이용",
    mainImage: "/images/review/4.png",
    description:
      "퓨어러스는 제빙기 내부에 있는 모든 오염들에 대해 완벽한 케어를 목표로 하고 있습니다. 전문적인 장비와 기술로 깨끗하게 청소해주셔서 정말 만족스럽습니다.",
  },
]);

//  이미지 여러개일떄 짤라서

// 총 리뷰 개수
const totalReviews = computed(() => revInfo.value?.length || 0);

// 별점별 개수 계산
const getRatingCounts = computed(() => {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  revInfo.value.forEach((review) => {
    counts[Math.ceil(review.rating)]++;
  });

  return counts;
});

// 평균 점수 계산 (소수점 1자리)
const averageScore = computed(() => {
  if (totalReviews.value === 0) return 0;
  const sum = revInfo.value.reduce((acc, review) => acc + review.rating, 0);
  console.log(sum);

  return (sum / totalReviews.value).toFixed(1);
});

// // 별점별 비율 계산 (퍼센트)
// const getRatingPercentage = (rating) => {
//   if (totalReviews.value === 0) return 0;
//   starCnt.value = Math.round((ratingCounts.value[rating] / totalReviews.value) * 100);
//   return;
// };

// 좋아요 상태 관리
const likedReviews = ref(new Set());

// 좋아요 불러오기
const loadLikedReviews = () => {
  try {
    const saved = localStorage.getItem("likedReviews");
    if (saved) {
      likedReviews.value = new Set(JSON.parse(saved));
    }
  } catch (error) {
    console.error("좋아요 불러오기 실패:", error);
  }
};

// 좋아요 토글
const toggleLike = (reviewId) => {
  const review = revInfo.value.find((r) => r.id === reviewId);
  if (!review) return;

  if (likedReviews.value.has(reviewId)) {
    review.likes--;
    likedReviews.value.delete(reviewId);
  } else {
    review.likes++;
    likedReviews.value.add(reviewId);
  }

  localStorage.setItem("likedReviews", JSON.stringify([...likedReviews.value]));
};

// 좋아요 상태 확인
const isLiked = (reviewId) => {
  return likedReviews.value.has(reviewId);
};

// 필터 기능들
const seqLast = () => {
  activeFilter.value = "최신순";
  filteredReviews.value = [...revInfo.value];
};

const seqBest = () => {
  activeFilter.value = "추천순";
  filteredReviews.value = [...revInfo.value].sort((a, b) => b.likes - a.likes);
};

const selPhoto = () => {
  activeFilter.value = "사진 리뷰";
  filteredReviews.value = revInfo.value.filter(
    (review) => review.images && review.images.length > 0
  );
};

// 이미지 모달
const openImageModal = (imageUrl) => {
  selectedImage.value = imageUrl;
  showImageModal.value = true;
  document.body.style.overflow = "hidden";
};

const closeImageModal = () => {
  showImageModal.value = false;
  selectedImage.value = null;
  document.body.style.overflow = "";
};

// 리뷰 작성 폼 데이터
const formData = ref({
  rating: 0,
  service: "",
  comment: "",
  images: [],
});

// 쿠폰 모달 관련
const showCouponModal = ref(false);
const generatedCouponCode = ref("");

// 폼 유효성 검사
const isFormValid = computed(() => {
  return (
    formData.value.rating > 0 && formData.value.service && formData.value.comment.trim().length > 0
  );
});

// 별점 설정
const setRating = (rating) => {
  formData.value.rating = rating;
};

// 별점 호버
const setHoverRating = (rating) => {
  hoverRating.value = rating;
};

const resetHoverRating = () => {
  hoverRating.value = 0;
};

// 이미지 업로드 처리
const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);
  files.forEach((file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        formData.value.images.push({
          file: file,
          preview: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  });
};

// 이미지 제거
const removeImage = (index) => {
  formData.value.images.splice(index, 1);
};

// 쿠폰 코드 생성
const generateCouponCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// 리뷰 제출
const submitReview = () => {
  if (!isFormValid.value) return;

  // 실제로는 여기서 서버에 리뷰 데이터를 전송
  console.log("리뷰 제출:", formData.value);

  // 쿠폰 코드 생성 및 모달 표시
  generatedCouponCode.value = generateCouponCode();
  showCouponModal.value = true;

  // 폼 초기화
  formData.value = {
    rating: 0,
    service: "",
    comment: "",
    images: [],
  };
};

// 쿠폰 코드 복사
const copyCouponCode = async () => {
  try {
    await navigator.clipboard.writeText(generatedCouponCode.value);
    copiedSuccess.value = true;
    setTimeout(() => {
      copiedSuccess.value = false;
    }, 2000);
  } catch (err) {
    console.error("복사 실패:", err);
    alert("쿠폰 코드가 복사되었습니다!");
  }
};

// 쿠폰 모달 닫기
const closeCouponModal = () => {
  showCouponModal.value = false;
};
</script>

<template>
  <div class="inner rev-con">
    <!-- 타이틀 -->
    <div class="title-section">
      <h2>고객후기</h2>
      <p>퓨어러스의 제빙기 케어 사례를 확인하세요.</p>
    </div>
    <!-- 카드형 리뷰 섹션 (60%) -->
    <div class="review-cards-section" v-if="!isMobile">
      <div class="review-card" v-for="(card, index) in reviewCards" :key="index">
        <div class="card-header">
          <img :src="card.profileImg" alt="프로필" class="card-profile-img" />
          <div class="card-user-info">
            <div class="card-stars">
              <i v-for="star in 5" :key="star" class="fas fa-star"></i>
            </div>
            <span class="card-username">{{ card.username }}</span>
          </div>
        </div>
        <div class="card-service-info">{{ card.date }} · {{ card.service }}</div>
        <div class="card-image">
          <img :src="card.mainImage" alt="리뷰 이미지" />
        </div>
        <div class="card-description">{{ card.description }}</div>
      </div>
    </div>
    <div class="postrev">
      <div class="postrev-cnt">리뷰 수 {{ totalReviews }}</div>

      <button @click="openModal" class="postrev-btn">리뷰 남기기</button>
    </div>
    <!-- 메인 콘텐츠 레이아웃 -->
    <div class="main-content-layout">
      <div class="review-form-left">
        <div class="show-review">
          <!-- 총 만족도 ==========================-->
          <div class="rating-section">
            <div class="rating-summary">
              <div class="rating-score">
                <i class="score-text">{{ averageScore }}</i>
                <div class="stars-container">
                  <!-- 배경 (빈 별) -->
                  <div class="stars stars-bg">
                    <i v-for="star in 5" :key="`bg-${star}`" class="fas fa-star"></i>
                  </div>
                  <!-- 채워진 별 (평점만큼) -->
                  <div class="stars stars-fill" :style="{ width: `${(averageScore / 5) * 100}%` }">
                    <i v-for="star in 5" :key="`fill-${star}`" class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <div class="divider-line"></div>
            </div>

            <div class="allscore">
              <i class="stats-title">총 만족도</i>
              <div class="stat-item" v-for="ratingCnt in [5, 4, 3, 2, 1]" :key="ratingCnt">
                <div class="stat-label">
                  <span class="point">{{ ratingCnt }}</span>
                  <span class="unit">점</span>
                </div>
                <!-- <div class="stat-count" v-if="ratingCounts.counts.le === ">{{ }}</div> -->
                <div class="stat-count">{{ getRatingCounts[ratingCnt] }}</div>
                <!-- 개수 바 -->
                <div class="stat-bar-container">
                  <div class="stat-bar-bg"></div>
                  <div
                    class="stat-bar-fill"
                    :style="{
                      width: `${
                        totalReviews ? (getRatingCounts[ratingCnt] / totalReviews) * 100 : 0
                      }%`,
                    }"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- 리뷰 목록 -->
          <div class="review-list">
            <div class="divider"></div>
            <div class="grp-btn">
              <!-- 필터 버튼 -->
              <div class="filter-tabs">
                <!-- <div class="filler-icon"></div> -->
                <button class="filter-btn active" @click="seqLast">최신순</button>
                <button class="filter-btn" @click="seqBest">추천순</button>
                <button class="filter-btn photo" @click="selPhoto">
                  <div class="img-icon"></div>
                  사진 리뷰
                </button>
              </div>

              <!--  상세 필터 ===============================-->
              <!-- <div class="filter-detail">
          <i class="fa-solid fa-filter"></i>
          <button class="filter-btn">상세 필터</button>
        </div> -->
            </div>

            <div class="divider"></div>

            <!-- 리뷰 아이템 -->
            <div class="review-item" v-for="review in revInfo" :key="review.id">
              <!-- 사용자 정보 -->
              <div class="user-info">
                <img
                  v-if="review.userImage"
                  :src="review.userImage"
                  alt="프로필"
                  class="profile-img" />
                <!-- 개별 점수 -->
                <div class="user-details">
                  <span class="username">{{ review.username }}</span>
                  <div class="stars-container">
                    <div class="stars stars-bg">
                      <i v-for="star in 5" :key="`bg-${star}`" class="fas fa-star"></i>
                    </div>
                    <div
                      class="stars stars-fill"
                      :style="{ width: `${(review.rating / 5) * 100}%` }">
                      <i v-for="star in 5" :key="`fill-${star}`" class="fas fa-star"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="review-meta">{{ review.date }} ∙ {{ review.service }}</div>

              <!-- 이미지 갤러리 -->
              <div class="image-gallery" v-if="review.images && review.images.length > 0">
                <img
                  v-for="(img, idx) in review.images"
                  :key="idx"
                  :src="img"
                  alt="리뷰 이미지"
                  class="review-img" />
                {{ (img, idx) }}
              </div>

              <!-- 리뷰 내용 -->
              <div class="review-text" v-if="review.comment">
                <p>{{ review.comment }}</p>
              </div>

              <!-- 좋아요 버튼 -->
              <div class="like-div">
                <button
                  class="like-btn"
                  @click="toggleLike(review.id)"
                  :class="{ active: isLiked(review.id) }">
                  <i class="like-icon" :class="{ filled: isLiked(review.id) }"></i>
                  <span>{{ review.likes }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 오른쪽: 리뷰 작성 폼 (40%) -->
      <div class="review-form-section">
        <div class="form-container">
          <h3>리뷰 작성하기</h3>
          <p class="form-subtitle">리뷰를 작성하시면 쿠폰을 드려요!</p>

          <form @submit.prevent="submitReview" class="review-form">
            <!-- 별점 입력 -->
            <div class="form-group">
              <label>만족도</label>
              <div class="star-rating" @mouseleave="resetHoverRating">
                <i
                  v-for="star in 5"
                  :key="star"
                  class="fas fa-star star-input"
                  :class="{
                    active: star <= (hoverRating || formData.rating),
                    hover: hoverRating && star <= hoverRating,
                  }"
                  @click="setRating(star)"
                  @mouseenter="setHoverRating(star)"></i>
              </div>
              <span v-if="formData.rating" class="rating-text">{{ formData.rating }}점 선택됨</span>
            </div>

            <!-- 서비스 선택 -->
            <div class="form-group">
              <label>이용 서비스</label>
              <select v-model="formData.service" class="form-select">
                <option value="">서비스를 선택해주세요</option>
                <option value="카이저제빙기 디테일 클리어서비스">
                  카이저제빙기 디테일 클리어서비스
                </option>
                <option value="제빙기 정기 클리닝">제빙기 정기 클리닝</option>
                <option value="제빙기 긴급 수리">제빙기 긴급 수리</option>
              </select>
            </div>

            <!-- 리뷰 내용 -->
            <div class="form-group">
              <label>리뷰 내용</label>
              <textarea
                v-model="formData.comment"
                placeholder="서비스 이용 후기를 자유롭게 작성해주세요."
                class="form-textarea"
                rows="4"></textarea>
            </div>

            <!-- 이미지 업로드 -->
            <div class="form-group">
              <label>사진 첨부 (선택)</label>
              <div class="image-upload">
                <input
                  type="file"
                  @change="handleImageUpload"
                  accept="image/*"
                  multiple
                  class="file-input"
                  id="image-upload" />
                <label for="image-upload" class="upload-btn">
                  <i class="fas fa-camera"></i>
                  <span>사진 추가</span>
                </label>
                <div v-if="formData.images.length > 0" class="uploaded-images">
                  <div v-for="(img, index) in formData.images" :key="index" class="uploaded-img">
                    <img :src="img.preview" alt="업로드된 이미지" />
                    <button type="button" @click="removeImage(index)" class="remove-btn">×</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 제출 버튼 -->
            <button type="submit" class="submit-btn" :disabled="!isFormValid">
              <i class="fas fa-gift"></i>
              리뷰 작성하고 쿠폰 받기
            </button>
          </form>
        </div>
      </div>
    </div>
    <!-- 쿠폰 발급 모달 -->
    <Teleport to="body">
      <div v-if="showCouponModal" class="coupon-modal-overlay" @click="closeCouponModal">
        <div class="coupon-modal" @click.stop>
          <div class="modal-header">
            <button @click="closeCouponModal" class="close-btn">×</button>
          </div>
          <div class="modal-content">
            <div class="coupon-icon">
              <i class="fas fa-gift"></i>
            </div>
            <h3>🎉 쿠폰이 발급되었습니다!</h3>
            <p class="coupon-message">
              리뷰 작성 감사합니다.
              <br />
              다음 서비스 이용 시 사용하실 수 있는 쿠폰을 발급해드렸습니다.
            </p>
            <div class="coupon-code">
              <span class="code-label">쿠폰 코드</span>
              <div class="code-value">{{ generatedCouponCode }}</div>
              <button @click="copyCouponCode" class="copy-btn" :class="{ copied: copiedSuccess }">
                <i :class="copiedSuccess ? 'fas fa-check' : 'fas fa-copy'"></i>
                {{ copiedSuccess ? "복사 완료!" : "복사하기" }}
              </button>
            </div>
            <div class="coupon-details">
              <div class="detail-item">
                <span class="detail-label">할인율</span>
                <span class="detail-value">10% 할인</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">유효기간</span>
                <span class="detail-value">30일</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">사용조건</span>
                <span class="detail-value">최소 5만원 이상</span>
              </div>
            </div>
            <button @click="closeCouponModal" class="confirm-btn">확인</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/_variables" as *;

.rev-con {
  // width: 100%;
  height: auto;
  // background-color: #f19797;
  font-style: normal;
  .inner {
    width: 90% !important;
    margin: 0 !important;
  }
}

// 타이틀 박스
.title-section {
  padding: 100px 0;
  // height: max-content;
  text-align: center;
  color: $font-color;

  h2 {
    font-size: $main-title;
    margin-bottom: 30px;
  }

  p {
    font-size: $esti-medium-txt;
    color: #666;
  }
}

// 메인 콘텐츠 레이아웃
.main-content-layout {
  display: flex;
  gap: 40px;
  margin-bottom: 60px;
}

// 카드형 리뷰 섹션 (60%)
.review-cards-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.review-card {
  // flex: 1;
  background-color: #f8f9fa;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.card-profile-img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.card-user-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-stars {
  display: flex;
  gap: 2px;

  i {
    color: $point-color;
    font-size: 14px;
  }
}

.card-username {
  font-size: 14px;
  font-weight: 500;
  color: #6b7684;
}

.card-service-info {
  font-size: 13px;
  color: #999;
  margin-bottom: 16px;
}

.card-image {
  margin-bottom: 16px;

  img {
    width: 100%;
    // height: 200px;
    border-radius: 12px;
    object-fit: cover;
  }
}

.card-description {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

// 리뷰 작성 폼 섹션 (40%)
.review-form-section {
  flex: 0 0 40%;
}

.form-container {
  background-color: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  position: sticky;
  top: 20px;
}

.form-container h3 {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.form-subtitle {
  font-size: 14px;
  color: $point-color;
  margin-bottom: 24px;
  font-weight: 500;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

// 별점 입력
.star-rating {
  display: flex;
  gap: 8px;
  font-size: 28px;

  .star-input {
    color: #ddd;
    cursor: pointer;
    transition: all 0.2s ease;

    &.active {
      color: $point-color;
    }

    &.hover {
      transform: scale(1.1);
    }

    &:hover {
      transform: scale(1.2);
      color: $point-color;
    }
  }
}

.rating-text {
  display: inline-block;
  font-size: 14px;
  color: $point-color;
  font-weight: 600;
  margin-top: 8px;
  animation: fadeIn 0.3s ease;
}

// 폼 입력 요소들
.form-select,
.form-textarea {
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  background-color: #fff;

  &:focus {
    outline: none;
    border-color: $point-color;
  }
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

// 이미지 업로드
.image-upload {
  .file-input {
    display: none;
  }

  .upload-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border: 2px dashed #ddd;
    border-radius: 8px;
    background-color: #f8f9fa;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    color: #666;

    &:hover {
      border-color: $point-color;
      background-color: rgba($point-color, 0.05);
      color: $point-color;
    }

    i {
      font-size: 16px;
    }
  }

  .uploaded-images {
    display: flex;
    gap: 10px;
    margin-top: 12px;
    flex-wrap: wrap;
  }

  .uploaded-img {
    position: relative;
    width: 80px;
    height: 80px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }

    .remove-btn {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #ff4757;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

// 제출 버튼
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 24px;
  background: linear-gradient(135deg, $point-color);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba($point-color, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  i {
    font-size: 18px;
  }
}

// 쿠폰 모달
.coupon-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

.coupon-modal {
  background-color: white;
  border-radius: 20px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f1f3f4;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e8eaed;
  }
}

.modal-content {
  padding: 0 30px 30px;
  text-align: center;
}

.coupon-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, $point-color, #5f8ff5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;

  i {
    font-size: 32px;
    color: white;
  }
}

.modal-content h3 {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
}

.coupon-message {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 30px;
}

.coupon-code {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  border: 2px dashed #ddd;
}

.code-label {
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 8px;
}

.code-value {
  font-size: 24px;
  font-weight: 700;
  color: $point-color;
  font-family: "Courier New", monospace;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.copy-btn {
  background-color: $point-color;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba($point-color, 0.3);
  }

  &.copied {
    background-color: #10b981;
  }

  i {
    font-size: 14px;
  }
}

.coupon-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.detail-label {
  font-size: 14px;
  color: #666;
}

.detail-value {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.confirm-btn {
  width: 100%;
  padding: 16px;
  background-color: $point-color;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2156c7;
  }
}

// 평점 섹션 =========================
.rating-section {
  display: flex;
  // align-items: center;

  // padding: 30px 90px;
  border-radius: 16px;
  background-color: $main-color;
  margin-top: 15px;
  margin-bottom: 30px;
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: 50px;
}

.rating-score {
  width: 150px;
  text-align: center;

  .score-text {
    font-size: $medium-txt-1;
    font-weight: 700;
    font-style: normal;
    display: block;
    margin-bottom: 10px;
  }
}

.allscore {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 2%;

  .stats-title {
    color: #333;
    font-size: $small-txt;
    font-weight: 600;
    font-style: normal;
    margin-bottom: 5px;
  }
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;

  .stat-label {
    width: 31px;
    font-size: 15px;
    color: #6b7684;

    .point {
      font-size: 15px;
    }

    .unit {
      font-size: 14px;
    }
  }

  .stat-count {
    position: absolute;
    right: 0;
    font-size: 14px;
    color: #6b7684;
    width: 30px;
    text-align: right;
  }

  .stat-bar-container {
    flex: 1;
    height: 10px;
    position: relative;
    margin: 0 45px 0 7px;
  }

  .stat-bar-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    border-radius: 16px;
    background-color: #dce7fb;
  }

  .stat-bar-fill {
    position: absolute;
    // width: 100px;
    top: 0;
    left: 0;
    height: 10px;
    border-radius: 16px;
    background-color: $point-color;
  }
}

.divider-line {
  width: 1px;
  height: 120px;
  background-color: #d9d9d9;
}
// end 평정 섹션 =====================

//리뷰 남기기 버튼 ============================
.postrev {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 30px 10px;
  // margin-bottom: 10px;
  .postrev-cnt {
    font-size: $small-txt;
    font-weight: bold;
    color: #333;
  }

  .postrev-btn {
    color: $point-color;
    font-size: $small-txt;
    font-weight: bold;
    background: transparent;
    border: transparent;
    text-align: right;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }
}
// ========================================

//
.modal_bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal_section {
  background-color: #fff;
  width: 560px;
  // height: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999999;
  border-radius: 30px;
  padding: 40px 50px 50px;
  .x-mark {
    position: absolute;
    right: 30px;
    top: 30px;
    font-size: $medium-txt-2;
    cursor: pointer;
  }
}

// 리뷰 목록
.review-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 40px;
}
.grp-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;

  // 필터 버튼
  .filter-tabs {
    display: flex;
    gap: 20px;
    align-items: center;

    &.active {
      color: $point-color;
      .img-icon {
        color: $point-color;
      }
    }

    &.hover {
      color: $point-color;
      .img-icon {
        color: $point-color;
      }
    }
  }

  .filter-detail {
    gap: 10px;
    display: flex;
    justify-content: left;
    align-items: center;
    color: $border-color;
    .fa-filter {
      font-family: "Font Awesome 5 Free";
      padding-top: 6px;
    }
  }

  .filter-btn {
    display: flex;
    justify-content: right;
    align-items: center;
    background: transparent;
    border: none;
    font-weight: 600;
    color: $border-color;
    cursor: pointer;
    font-size: $small-txt;
    padding: 8px 16px;
    border-radius: 20px;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba($point-color, 0.1);
      color: $point-color;
    }

    &.active {
      color: $point-color;
      font-weight: 700;
    }

    &.photo {
      gap: 8px;
      align-items: center;
      .img-icon {
        font-size: 14px;
      }
    }
  }
}

// 로딩 스피너
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 20px;

  p {
    color: #666;
    font-size: 16px;
  }
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid $point-color;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// 구분선
.divider {
  height: 1px;
  background-color: #d9d9d9;
  width: 100%;
}

// 리뷰 아이템
.review-item {
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 30px;
  &:last-child {
    border: none;
  }
}

// 사용자 정보
.user-info {
  display: flex;
  align-content: start;
  align-items: end;
  gap: 11px;
  font-size: $small-txt;
}

.profile-img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  gap: 5px;
}

.username {
  color: #6b7684;
  font-weight: 500;
}

.review-meta {
  color: #999;
  font-size: $small-txt;
}

.image-gallery {
  display: flex;
  gap: 10px;
  // justify-content: flex-start;
  flex-wrap: wrap;
}

.review-img {
  width: 140px;
  height: 140px;
  border-radius: 16px;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}

// 리뷰 텍스트
.review-text {
  color: $sub-font-color;
  line-height: 1.6;
}

// 좋아요 버튼
.like-div {
  .like-btn {
    color: $border-color;
    padding: 10px 20px;
    border: 1px solid $border-color;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    background: transparent;
    font-size: $esti-medium-txt;
    border-radius: 50px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: $point-color;
      color: $point-color;
      background-color: rgba($point-color, 0.05);
      transform: translateY(-2px);
      .like-icon {
        color: $point-color;
        transform: scale(1.1);
      }
    }

    &.active {
      border-color: $point-color;
      color: $point-color;
      background-color: rgba($point-color, 0.1);
      font-weight: bold;
      .like-icon {
        color: $point-color;
      }
    }

    .like-icon {
      font-style: normal;
      font-family: "Font Awesome 5 Free";
      color: $border-color;
      transition: all 0.3s ease;
    }
  }
}
.review-form-left {
  width: 60%;
}

// 애니메이션
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 리뷰 아이템 애니메이션
.review-item {
  animation: fadeIn 0.5s ease;
}

// 카드 호버 애니메이션 개선
.review-card,
.form-container {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

// 스크롤바 스타일링
.review-cards-section {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: $point-color;
    border-radius: 10px;

    &:hover {
      background: #2156c7;
    }
  }
}

.review-card {
  scroll-snap-align: start;
}

@media (max-width: 768px) {
  .rev-con {
    .title-section {
      padding: 50px 0;
      h2 {
        font-size: 24px;
        margin-bottom: 15px;
      }
      p {
        font-size: 16px;
      }
    }

    .main-content-layout {
      flex-direction: column;
      gap: 30px;
    }

    .review-cards-section {
      flex: none;
      flex-direction: column;
      gap: 20px;
    }

    .review-card {
      padding: 20px;
    }

    .card-image img {
      height: 150px;
    }

    .review-form-section {
      flex: none;
    }

    .form-container {
      position: static;
      padding: 24px;
    }

    .coupon-modal {
      width: 95%;
      margin: 20px;
    }

    .modal-content {
      padding: 0 20px 20px;
    }

    .coupon-icon {
      width: 60px;
      height: 60px;
      margin-bottom: 16px;

      i {
        font-size: 24px;
      }
    }

    .modal-content h3 {
      font-size: 20px;
    }

    .code-value {
      font-size: 20px;
    }

    .rating-section {
      gap: 20px;
      padding: 30px;
      .rating-summary {
        gap: 35px;
        align-items: center;
        padding-bottom: 10px;
        .rating-score {
          width: 100%;
        }
      }
    }
    .review-list {
      .review-item {
        gap: 15px;
        .review-text {
          p {
            font-size: 16px;
          }
        }
        .like-div {
          .like-btn {
            padding: 5px 10px;
            i,
            span {
              font-size: 16px;
            }
          }
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }
      }
    }
  }
  .review-form-left {
    width: 100%;
  }
  .allscore {
    min-width: 200px;
  }
}

@media (max-width: 450px) {
  .rev-con {
    .title-section {
      padding: 30px 0;
      h2 {
        font-size: 22px;
        margin-bottom: 15px;
      }
      p {
        font-size: 14px;
      }
    }

    .main-content-layout {
      gap: 20px;
    }

    .review-cards-section {
      gap: 15px;
    }

    .review-card {
      padding: 16px;
    }

    .card-header {
      gap: 10px;
    }

    .card-profile-img {
      width: 36px;
      height: 36px;
    }

    .card-stars i {
      font-size: 12px;
    }

    .card-username {
      font-size: 13px;
    }

    .card-service-info {
      font-size: 12px;
    }

    .card-image img {
      height: 120px;
    }

    .card-description {
      font-size: 13px;
    }

    .form-container {
      padding: 20px;
    }

    .form-container h3 {
      font-size: 18px;
    }

    .form-subtitle {
      font-size: 13px;
    }

    .star-input {
      font-size: 18px;
    }

    .form-select,
    .form-textarea {
      padding: 10px 12px;
      font-size: 13px;
    }

    .submit-btn {
      padding: 14px 20px;
      font-size: 14px;
    }

    .coupon-modal {
      width: 98%;
      margin: 10px;
    }

    .modal-content {
      padding: 0 15px 15px;
    }

    .coupon-icon {
      width: 50px;
      height: 50px;
      margin-bottom: 12px;

      i {
        font-size: 20px;
      }
    }

    .modal-content h3 {
      font-size: 18px;
    }

    .coupon-message {
      font-size: 14px;
    }

    .code-value {
      font-size: 18px;
    }

    .detail-item {
      padding: 10px 12px;
    }

    .detail-label,
    .detail-value {
      font-size: 13px;
    }
    .postrev {
      .postrev-cnt {
        font-size: 14px;
      }
      .postrev-btn {
        font-size: 14px;
      }
    }

    .rating-section {
      flex-direction: column;
      gap: 5px;
      padding: 20px;
      .divider-line {
        display: none;
      }
      .rating-summary {
        gap: 35px;
        align-items: center;
        padding-bottom: 10px;
        .rating-score {
          width: 100%;
          .score-text {
            font-size: 20px;
          }
          .stars-container {
            .stars {
              gap: 3px;
              i {
                font-size: 14px;
              }
            }
          }
        }
      }
      .allscore {
        .stats-title {
          font-size: 14px;
        }
        .stat-label {
          .point,
          .unit {
            font-size: 14px;
          }
        }

        .stat-item {
          gap: 0;
          .stat-count {
            width: 15px;
          }
          .stat-bar-container {
            margin: 0 20px 0 7px;
          }
        }
      }
    }
    .review-list {
      margin-bottom: 20px;
      .grp-btn {
        .filter-tabs {
          gap: 10px;
          .filter-btn {
            font-size: 14px;
            &.photo {
              gap: 5px;
              .img-icon {
                font-size: 12px;
                padding-top: 0;
              }
            }
          }
        }
        .filter-detail {
          gap: 5px;
          .fa-filter {
            font-size: 12px;
            padding-top: 0;
          }
          .filter-btn {
            font-size: 14px;
          }
        }
      }
      .review-item {
        gap: 10px;
        padding-bottom: 15px;
        .review-text {
          p {
            font-size: 16px;
          }
        }
        .like-div {
          .like-btn {
            padding: 5px 10px;
            i,
            span {
              font-size: 16px;
            }
          }
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          .profile-img {
            width: 35px;
            height: 35px;
          }
          .user-details {
            display: flex;
            flex-direction: column;
            gap: 5px;
            .username {
              font-size: 12px;
            }
            // 개별 별점 컨테이너
            .stars-container {
              margin: 0;

              .stars {
                gap: 3px; // 간격 좁게

                i {
                  font-size: 12px; // 개별 별점 크기 (작게)
                }
              }
            }
          }
        }
        .review-meta {
          font-size: 12px;
        }
        .image-gallery {
          flex-wrap: nowrap;
          .review-img {
            width: 120px;
            height: 120px;
            border-radius: 8px;
          }
        }
        .review-text {
          p {
            font-size: 14px;
          }
        }
        .like-div {
          .like-btn {
            padding: 3px 6px;
            gap: 3px;
            .like-icon {
              font-size: 14px;
            }
            span {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}

// ========== 별점 컨테이너 공통 스타일 ==========
.stars-container {
  position: relative;
  width: fit-content;
  margin: 0 auto;
}

.stars {
  display: flex;
}

// 배경 별 (빈 별)
.stars-bg {
  position: relative;

  i {
    color: #dce7fb;
  }
}

// 채워진 별 (평점만큼)
.stars-fill {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  transition: width 0.3s ease;

  i {
    color: $point-color;
  }
}
</style>
