<template>
  <div class="h-110">
    <canvas ref="lineChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js에서 필요한 기능들 등록
Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const lineChart = ref(null);

onMounted(() => {
  new Chart(lineChart.value, {
    type: "line",
    data: {
      labels: [
        "25.01",
        "25.02",
        "25.03",
        "25.04",
        "25.05",
        "25.06",
        "25.07",
        "25.08",
        "25.09",
        "25.10",
        "25.11",
        "25.12",
      ],
      datasets: [
        {
          label: "월별 수치",
          data: [12, 18, 30, 45, 72, 90, 53, 30, 38, 56, 28, 8],
          borderColor: "#296AF1",
          backgroundColor: "#296AF1",
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false, // 이거 중요!!!
      plugins: {
        tooltip: { enabled: true },
        legend: { display: false },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
});
</script>
