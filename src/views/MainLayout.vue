<template>
    <div class="app-container">
      <!-- Importar el componente Sidebar -->
      <Sidebar />
  
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
  
        <!-- Contenido de la ruta actual -->
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/Sidebar.vue';
  
  export default {
    name: 'MainLayout',
    components: {
      Sidebar
    },
    data() {
      // Formatear la fecha actual
      const today = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = today.toLocaleDateString('es-ES', options);
      
      return {
        currentDate: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
      }
    },
    methods: {
      getCurrentSectionTitle() {
        // Obtener el título basado en la ruta actual
        const routes = {
          '/': 'Dashboard',
          '/tramites': 'Trámites',
          '/reportes': 'Reportes',
          '/configuracion': 'Configuración'
        };
        
        return routes[this.$route.path] || '';
      }
    }
  }
  </script>
  
  <style scoped>
  /* Los estilos del contenido principal los puedes copiar de tu archivo original */
  .app-container {
    display: flex;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background-color: var(--background-color);
  }
  
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
  
  @media (max-width: 768px) {
    .app-container {
      flex-direction: column;
    }
    
    .main-content {
      height: auto;
    }
  }
  </style>