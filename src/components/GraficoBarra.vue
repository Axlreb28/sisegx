<template>
  <div class="dashboard">
    <div class="chart-container">
      <h2>Trámites por mes</h2>
      <Bar :data="barData" :options="barOptions" />
    </div>
    
    <div class="chart-container">
      <h2>Distribución de trámites</h2>
      <Pie :data="pieData" :options="pieOptions" />
    </div>
    
    <div class="chart-container">
      <h2>Tendencia anual</h2>
      <Line :data="lineData" :options="lineOptions" />
    </div>
    
    <div class="chart-container">
      <h2>Comparativa por departamento</h2>
      <Bar :data="horizontalBarData" :options="horizontalBarOptions" />
    </div>
    
    <div class="chart-container">
      <h2>Rendimiento por trimestre</h2>
      <Doughnut :data="doughnutData" :options="doughnutOptions" />
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
} from 'chart.js'
import { Bar, Pie, Line, Doughnut } from 'vue-chartjs'

ChartJS.register(
  Title, 
  Tooltip, 
  Legend, 
  BarElement, 
  CategoryScale, 
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
)

export default {
  components: { 
    Bar, 
    Pie,
    Line,
    Doughnut
  },
  data() {
    // Colores definidos
    const colors = {
      color1: '#000000',
      color2: '#9f111b',
      color3: '#b11623',
      color4: '#292c37',
      color5: '#cccccc'
    }
    
    return {
      // 1. Gráfica de barras para trámites por mes
      barData: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
          {
            label: 'Trámites completados',
            backgroundColor: colors.color3,
            data: [40, 60, 80, 20, 55, 70]
          },
          {
            label: 'Trámites pendientes',
            backgroundColor: colors.color5,
            data: [20, 10, 15, 40, 20, 10]
          }
        ]
      },
      barOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: false,
            text: 'Trámites por mes'
          }
        }
      },
      
      // 2. Gráfica de pastel para distribución
      pieData: {
        labels: ['Categoría A', 'Categoría B', 'Categoría C', 'Categoría D'],
        datasets: [
          {
            backgroundColor: [
              colors.color1,
              colors.color2,
              colors.color3,
              colors.color4
            ],
            data: [30, 25, 20, 25]
          }
        ]
      },
      pieOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      },
      
      // 3. Gráfica de línea para tendencia anual
      lineData: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
          {
            label: '2023',
            borderColor: colors.color2,
            backgroundColor: 'rgba(159, 17, 27, 0.2)',
            tension: 0.4,
            fill: true,
            data: [30, 40, 35, 50, 49, 60, 70, 91, 85, 80, 95, 100]
          },
          {
            label: '2024',
            borderColor: colors.color4,
            backgroundColor: 'rgba(41, 44, 55, 0.2)',
            tension: 0.4,
            fill: true,
            data: [40, 55, 45, 60, 65, 75, 85, 95, 90, 100, 110, 120]
          }
        ]
      },
      lineOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      
      // 4. Gráfica de barras horizontales para comparativa
      horizontalBarData: {
        labels: ['Departamento A', 'Departamento B', 'Departamento C', 'Departamento D', 'Departamento E'],
        datasets: [
          {
            label: 'Eficiencia (%)',
            backgroundColor: colors.color3,
            data: [85, 75, 90, 60, 95]
          }
        ]
      },
      horizontalBarOptions: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100
          }
        }
      },
      
      // 5. Gráfica de dona para rendimiento trimestral
      doughnutData: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            backgroundColor: [
              colors.color1,
              colors.color2, 
              colors.color3,
              colors.color4
            ],
            data: [25, 30, 20, 25],
            borderWidth: 0
          }
        ]
      },
      doughnutOptions: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    }
  }
}
</script>

<!-- <style scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
}

.chart-container {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.chart-container h2 {
  color: #292c37;
  font-size: 18px;
  margin-bottom: 15px;
  text-align: center;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}
</style> -->