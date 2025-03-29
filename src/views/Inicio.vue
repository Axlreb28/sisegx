<template>
  <div class="app-container">
    <!-- Menú lateral con branding -->
    <aside class="sidebar">
      <div class="branding">
        <h1 class="logo">SISEG</h1>
        <p class="tagline">Sistema de Trámites</p>
      </div>
      
      <div class="user-info">
        <div class="avatar">A</div>
        <div class="user-details">
          <p class="user-name">Admin</p>
          <p class="user-role">Administrador</p>
        </div>
      </div>
      
      <nav class="navigation">
        <ul>
          <li v-for="item in menuItems" :key="item.name" 
              :class="{ active: item.name === selectedSection }" 
              @click="selectedSection = item.name">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </nav>
      
      <div class="logout-container">
        <button class="logout-button" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i> Cerrar sesión
        </button>
      </div>
    </aside>

    <!-- Contenido principal -->
    <main class="main-content">
      <header class="page-header">
        <div class="breadcrumb">
          <h2>{{ getCurrentSectionTitle() }}</h2>
        </div>
        <div class="header-actions">
          <div class="date-display">{{ currentDate }}</div>
          <button class="action-button"><i class="fas fa-bell"></i></button>
          <button class="action-button"><i class="fas fa-cog"></i></button>
        </div>
      </header>

      <!-- Dashboard -->
      <div v-if="selectedSection === 'dashboard'" class="dashboard">
        <!-- Tarjetas de resumen -->
        <div class="summary-cards">
          <div class="summary-card">
            <div class="card-icon" style="background-color: rgba(177, 22, 35, 0.2);">
              <i class="fas fa-file-alt" style="color: #b11623;"></i>
            </div>
            <div class="card-info">
              <h3>325</h3>
              <p>Trámites totales</p>
            </div>
            <div class="card-trend positive">
              <i class="fas fa-arrow-up"></i> 12%
            </div>
          </div>
          
          <div class="summary-card">
            <div class="card-icon" style="background-color: rgba(41, 44, 55, 0.2);">
              <i class="fas fa-check-circle" style="color: #292c37;"></i>
            </div>
            <div class="card-info">
              <h3>246</h3>
              <p>Trámites completados</p>
            </div>
            <div class="card-trend positive">
              <i class="fas fa-arrow-up"></i> 8%
            </div>
          </div>
          
          <div class="summary-card">
            <div class="card-icon" style="background-color: rgba(159, 17, 27, 0.2);">
              <i class="fas fa-clock" style="color: #9f111b;"></i>
            </div>
            <div class="card-info">
              <h3>79</h3>
              <p>Trámites pendientes</p>
            </div>
            <div class="card-trend negative">
              <i class="fas fa-arrow-down"></i> 5%
            </div>
          </div>
          
          <div class="summary-card">
            <div class="card-icon" style="background-color: rgba(0, 0, 0, 0.1);">
              <i class="fas fa-users" style="color: #000000;"></i>
            </div>
            <div class="card-info">
              <h3>92%</h3>
              <p>Satisfacción</p>
            </div>
            <div class="card-trend positive">
              <i class="fas fa-arrow-up"></i> 3%
            </div>
          </div>
        </div>
        
        <!-- Gráficos -->
        <div class="chart-row">
          <div class="chart-container">
            <div class="chart-header">
              <h3>Trámites por mes</h3>
              <div class="chart-actions">
                <button class="chart-action-button"><i class="fas fa-ellipsis-v"></i></button>
              </div>
            </div>
            <Bar :data="barData" :options="barOptions" />
          </div>
          
          <div class="chart-container">
            <div class="chart-header">
              <h3>Distribución de trámites</h3>
              <div class="chart-actions">
                <button class="chart-action-button"><i class="fas fa-ellipsis-v"></i></button>
              </div>
            </div>
            <Pie :data="pieData" :options="pieOptions" />
          </div>
        </div>
        
        <div class="chart-row">
          <div class="chart-container">
            <div class="chart-header">
              <h3>Tendencia anual</h3>
              <div class="chart-actions">
                <button class="chart-action-button"><i class="fas fa-ellipsis-v"></i></button>
              </div>
            </div>
            <Line :data="lineData" :options="lineOptions" />
          </div>
        </div>
        
        <div class="chart-row">
          <div class="chart-container">
            <div class="chart-header">
              <h3>Comparativa por departamento</h3>
              <div class="chart-actions">
                <button class="chart-action-button"><i class="fas fa-ellipsis-v"></i></button>
              </div>
            </div>
            <Bar :data="horizontalBarData" :options="horizontalBarOptions" />
          </div>
          
          <div class="chart-container">
            <div class="chart-header">
              <h3>Rendimiento por trimestre</h3>
              <div class="chart-actions">
                <button class="chart-action-button"><i class="fas fa-ellipsis-v"></i></button>
              </div>
            </div>
            <Doughnut :data="doughnutData" :options="doughnutOptions" />
          </div>
        </div>
      </div>

      <!-- Otras secciones -->
      <div v-else-if="selectedSection === 'tramites'" class="section-content">
        <div class="placeholder-content">
          <h3>Gestión de Trámites</h3>
          <p>Aquí podrás visualizar y gestionar todos los trámites del sistema.</p>
        </div>
      </div>
      
      <div v-else-if="selectedSection === 'reportes'" class="section-content">
        <div class="placeholder-content">
          <h3>Generación de Reportes</h3>
          <p>Genera reportes personalizados según tus necesidades.</p>
        </div>
      </div>
      
      <div v-else-if="selectedSection === 'configuracion'" class="section-content">
        <div class="placeholder-content">
          <h3>Configuración del Sistema</h3>
          <p>Personaliza los parámetros y opciones del sistema.</p>
        </div>
      </div>
    </main>
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
    // Colores del sistema
    const colors = {
      primary: '#b11623',     // Rojo principal
      secondary: '#292c37',   // Gris oscuro
      dark: '#000000',        // Negro
      accent: '#9f111b',      // Rojo oscuro
      light: '#cccccc',       // Gris claro
      white: '#ffffff',       // Blanco
      background: '#f5f7fa'   // Fondo gris claro
    }
    
    // Formatear la fecha actual
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);
    
    return {
      selectedSection: 'dashboard',
      currentDate: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
      menuItems: [
        { name: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-line' },
        { name: 'tramites', label: 'Trámites', icon: 'fas fa-file-alt' },
        { name: 'reportes', label: 'Reportes', icon: 'fas fa-file-contract' },
        { name: 'configuracion', label: 'Configuración', icon: 'fas fa-cog' }
      ],
      
      // 1. Gráfica de barras para trámites por mes
      barData: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
          {
            label: 'Trámites completados',
            backgroundColor: colors.primary,
            data: [40, 60, 80, 20, 55, 70]
          },
          {
            label: 'Trámites pendientes',
            backgroundColor: colors.light,
            data: [20, 10, 15, 40, 20, 10]
          }
        ]
      },
      barOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                family: "'Poppins', sans-serif"
              }
            }
          },
          tooltip: {
            backgroundColor: colors.secondary,
            titleFont: {
              family: "'Poppins', sans-serif",
              size: 14
            },
            bodyFont: {
              family: "'Poppins', sans-serif",
              size: 13
            },
            padding: 10,
            cornerRadius: 6
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              font: {
                family: "'Poppins', sans-serif"
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                family: "'Poppins', sans-serif"
              }
            }
          }
        }
      },
      
      // 2. Gráfica de pastel para distribución
      pieData: {
        labels: ['Categoría A', 'Categoría B', 'Categoría C', 'Categoría D'],
        datasets: [
          {
            backgroundColor: [
              colors.dark,
              colors.accent,
              colors.primary,
              colors.secondary
            ],
            data: [30, 25, 20, 25],
            borderWidth: 0
          }
        ]
      },
      pieOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                family: "'Poppins', sans-serif"
              },
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: colors.secondary,
            titleFont: {
              family: "'Poppins', sans-serif",
              size: 14
            },
            bodyFont: {
              family: "'Poppins', sans-serif",
              size: 13
            },
            padding: 10,
            cornerRadius: 6
          }
        }
      },
      
      // 3. Gráfica de línea para tendencia anual
      lineData: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
          {
            label: '2023',
            borderColor: colors.accent,
            backgroundColor: 'rgba(159, 17, 27, 0.1)',
            tension: 0.4,
            fill: true,
            data: [30, 40, 35, 50, 49, 60, 70, 91, 85, 80, 95, 100],
            pointBackgroundColor: colors.accent,
            pointBorderColor: colors.white,
            pointBorderWidth: 2,
            pointRadius: 4
          },
          {
            label: '2024',
            borderColor: colors.secondary,
            backgroundColor: 'rgba(41, 44, 55, 0.1)',
            tension: 0.4,
            fill: true,
            data: [40, 55, 45, 60, 65, 75, 85, 95, 90, 100, 110, 120],
            pointBackgroundColor: colors.secondary,
            pointBorderColor: colors.white,
            pointBorderWidth: 2,
            pointRadius: 4
          }
        ]
      },
      lineOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                family: "'Poppins', sans-serif"
              }
            }
          },
          tooltip: {
            backgroundColor: colors.secondary,
            titleFont: {
              family: "'Poppins', sans-serif",
              size: 14
            },
            bodyFont: {
              family: "'Poppins', sans-serif",
              size: 13
            },
            padding: 10,
            cornerRadius: 6
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              font: {
                family: "'Poppins', sans-serif"
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                family: "'Poppins', sans-serif"
              }
            }
          }
        }
      },
      
      // 4. Gráfica de barras horizontales para comparativa
      horizontalBarData: {
        labels: ['Departamento A', 'Departamento B', 'Departamento C', 'Departamento D', 'Departamento E'],
        datasets: [
          {
            label: 'Eficiencia (%)',
            backgroundColor: colors.primary,
            data: [85, 75, 90, 60, 95],
            borderRadius: 4
          }
        ]
      },
      horizontalBarOptions: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: colors.secondary,
            titleFont: {
              family: "'Poppins', sans-serif",
              size: 14
            },
            bodyFont: {
              family: "'Poppins', sans-serif",
              size: 13
            },
            padding: 10,
            cornerRadius: 6
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              font: {
                family: "'Poppins', sans-serif"
              }
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                family: "'Poppins', sans-serif"
              }
            }
          }
        }
      },
      
      // 5. Gráfica de dona para rendimiento trimestral
      doughnutData: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            backgroundColor: [
              colors.dark,
              colors.accent, 
              colors.primary,
              colors.secondary
            ],
            data: [25, 30, 20, 25],
            borderWidth: 0,
            cutout: '70%'
          }
        ]
      },
      doughnutOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                family: "'Poppins', sans-serif"
              },
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: colors.secondary,
            titleFont: {
              family: "'Poppins', sans-serif",
              size: 14
            },
            bodyFont: {
              family: "'Poppins', sans-serif",
              size: 13
            },
            padding: 10,
            cornerRadius: 6
          }
        }
      }
    }
  },
  methods: {
    getCurrentSectionTitle() {
      const section = this.menuItems.find(item => item.name === this.selectedSection);
      return section ? section.label : '';
    },
    handleLogout() {
      // Limpiar datos de sesión
      localStorage.removeItem('user');
      // Redirigir a la página de login
      this.$router.push('/');
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

:root {
  --primary-color: #b11623;
  --secondary-color: #292c37;
  --dark-color: #000000;
  --accent-color: #9f111b;
  --light-color: #cccccc;
  --background-color: #f5f7fa;
  --white-color: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.app-container {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: var(--background-color);
}

/* Sidebar */
.sidebar {
  width: 260px;
  height: 100%;
  background-color: var(--white-color);
  box-shadow: var(--shadow);
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.branding {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.tagline {
  font-size: 14px;
  color: var(--secondary-color);
  font-weight: 300;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: var(--white-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 15px;
}

.user-details {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 2px;
}

.user-role {
  font-size: 12px;
  color: var(--light-color);
}

.navigation {
  flex: 1;
  padding: 20px 0;
}

.navigation ul {
  list-style: none;
}

.navigation li {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--secondary-color);
  transition: var(--transition);
  margin-bottom: 5px;
  border-left: 3px solid transparent;
}

.navigation li:hover {
  background-color: rgba(177, 22, 35, 0.05);
  color: var(--primary-color);
}

.navigation li.active {
  background-color: rgba(177, 22, 35, 0.1);
  color: var(--primary-color);
  border-left: 3px solid var(--primary-color);
  font-weight: 500;
}

.navigation li i {
  margin-right: 15px;
  font-size: 18px;
  width: 20px;
  text-align: center;
}

.logout-container {
  padding: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.logout-button {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: rgba(177, 22, 35, 0.1);
  color: var(--primary-color);
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-button:hover {
  background-color: var(--primary-color);
  color: var(--white-color);
}

.logout-button i {
  margin-right: 10px;
}

/* Main Content */
.main-content {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.breadcrumb h2 {
  font-size: 22px;
  font-weight: 600;
  color: var(--secondary-color);
}

.header-actions {
  display: flex;
  align-items: center;
}

.date-display {
  margin-right: 15px;
  color: var(--secondary-color);
  font-size: 14px;
}

.action-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--white-color);
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.action-button:hover {
  background-color: var(--primary-color);
  color: var(--white-color);
}

/* Dashboard */
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.summary-card {
  background-color: var(--white-color);
  border-radius: 10px;
  padding: 20px;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.card-icon i {
  font-size: 24px;
}

.card-info {
  flex: 1;
}

.card-info h3 {
  font-size: 22px;
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 5px;
}

.card-info p {
  font-size: 13px;
  color: var(--light-color);
}

.card-trend {
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.card-trend.positive {
  color: #2ecc71;
}

.card-trend.negative {
  color: #e74c3c;
}

.card-trend i {
  margin-right: 5px;
  font-size: 12px;
}

.chart-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-row:nth-child(3) {
  grid-template-columns: 1fr;
}

.chart-container {
  background-color: var(--white-color);
  border-radius: 10px;
  box-shadow: var(--shadow);
  padding-left: 45px;
  padding-top: 20px;
  padding-bottom: 60px;
  padding-right: 45px;
  height: 350px;
  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--secondary-color);
}

.chart-action-button {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.chart-action-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Placeholder para otras secciones */
.section-content {
  background-color: var(--white-color);
  border-radius: 10px;
  box-shadow: var(--shadow);
  padding: 30px;
}

.placeholder-content {
  text-align: center;
  padding: 40px 0;
}

.placeholder-content h3 {
  font-size: 24px;
  color: var(--secondary-color);
  margin-bottom: 15px;
}

.placeholder-content p {
  color: var(--light-color);
  max-width: 500px;
  margin: 0 auto;
}

/* Responsive */
@media (max-width: 1200px) {
  .summary-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .chart-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
  }
  
  .summary-cards {
    grid-template-columns: 1fr;
  }
  
  .navigation li {
    padding: 10px 15px;
  }
  
  .main-content {
    height: auto;
  }
}
</style>