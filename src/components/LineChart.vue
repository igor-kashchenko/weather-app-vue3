<template>
  <Line :data="chartData" :options="options" v-if="weatherForecast"/>

  <div class="d-flex justify-center align-center h-100" v-else>
    <v-progress-circular indeterminate></v-progress-circular>
  </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type TooltipItem
} from 'chart.js';
import { computed, watchEffect } from 'vue';
import { Line } from 'vue-chartjs';
import { useRoute } from 'vue-router';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const route = useRoute();
const name = route.params.name as string;

const store = useWeatherStore();

const cityWeatherForecasts = store.cityWeatherForecasts;

const weatherForecast = computed(() => {
  return cityWeatherForecasts.find((cityWeather) => cityWeather.address === name);
});

const chartData = {
  labels: [] as string[],
  datasets: [
    {
      label: 'Temperature',
      backgroundColor: '#f87979',
      data: [] as number[],
    }
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem: TooltipItem<'line'>) {
          let label = tooltipItem.dataset.label || '';
          if (label) {
            label += ' ';
          }
          if (tooltipItem.parsed.y !== null) {
            label += tooltipItem.parsed.y + '°C';
          }
          return label;
        },
      },
    },
  },
  scales: {
    y: {
      min: 0,
      max: 30,
      ticks: {
        stepSize: 1,
        callback: function (tickValue: number | string) {
          return tickValue + '°C';
        },
      },
    },
  },
};

const updateChartData = () => {
  const labels = weatherForecast.value?.hoursData.map((hour) => hour.datetime) || [];
  const data = weatherForecast.value?.hoursData.map((hour) => hour.temp) || [];
  const minTemp = Math.min(...data);
  const maxTemp = Math.max(...data);

  chartData.labels = labels;
  chartData.datasets[0].data = data;
  options.scales.y.min = minTemp - 2;
  options.scales.y.max = maxTemp + 2;
};

watchEffect(() => {
  updateChartData();
});
</script>

<style scoped>

</style>