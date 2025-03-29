<template>
    <div class="tramites-container">
      <div class="page-actions">
        <div class="search-container">
          <i class="fas fa-search search-icon"></i>
          <input type="text" placeholder="Buscar trámite..." v-model="searchQuery" class="search-input">
        </div>
        <button class="new-button" @click="openNewTramiteModal">
          <i class="fas fa-plus"></i> Nuevo Trámite
        </button>
      </div>
  
      <div class="filter-section">
        <div class="filter-group">
          <label>Estado:</label>
          <select v-model="selectedStatus" class="filter-select">
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="en-proceso">En Proceso</option>
            <option value="completado">Completado</option>
            <option value="rechazado">Rechazado</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Fecha:</label>
          <select v-model="selectedDateRange" class="filter-select">
            <option value="today">Hoy</option>
            <option value="week">Última semana</option>
            <option value="month">Último mes</option>
            <option value="year">Último año</option>
            <option value="custom">Personalizado</option>
          </select>
        </div>
        <div class="filter-group" v-if="selectedDateRange === 'custom'">
          <input type="date" v-model="startDate" class="date-input">
          <span class="date-separator">a</span>
          <input type="date" v-model="endDate" class="date-input">
        </div>
      </div>
  
      <div class="tramites-list card-container">
        <table class="tramites-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título del Trámite</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Responsable</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tramite in filteredTramites" :key="tramite.id">
              <td>{{ tramite.id }}</td>
              <td>{{ tramite.titulo }}</td>
              <td>{{ formatDate(tramite.fecha) }}</td>
              <td>
                <span :class="'status-badge ' + tramite.estado">
                  {{ getStatusLabel(tramite.estado) }}
                </span>
              </td>
              <td>{{ tramite.responsable }}</td>
              <td class="actions-cell">
                <button class="action-icon" @click="viewTramite(tramite.id)">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="action-icon" @click="editTramite(tramite.id)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-icon" @click="deleteTramite(tramite.id)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="pagination">
        <button class="pagination-button" :disabled="currentPage === 1" @click="currentPage--">
          <i class="fas fa-chevron-left"></i>
        </button>
        <span class="pagination-info">Página {{ currentPage }} de {{ totalPages }}</span>
        <button class="pagination-button" :disabled="currentPage === totalPages" @click="currentPage++">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Tramites',
    data() {
      return {
        searchQuery: '',
        selectedStatus: '',
        selectedDateRange: 'month',
        startDate: '',
        endDate: '',
        currentPage: 1,
        itemsPerPage: 10,
        tramites: [
          { 
            id: 'TRM-001', 
            titulo: 'Solicitud de Certificado', 
            fecha: new Date(2025, 2, 15), 
            estado: 'pendiente', 
            responsable: 'Juan Pérez' 
          },
          { 
            id: 'TRM-002', 
            titulo: 'Renovación de Licencia', 
            fecha: new Date(2025, 2, 20), 
            estado: 'en-proceso', 
            responsable: 'María López' 
          },
          { 
            id: 'TRM-003', 
            titulo: 'Autorización de Comercio', 
            fecha: new Date(2025, 2, 25), 
            estado: 'completado', 
            responsable: 'Carlos Gómez' 
          },
          { 
            id: 'TRM-004', 
            titulo: 'Solicitud de Permiso', 
            fecha: new Date(2025, 2, 28), 
            estado: 'rechazado', 
            responsable: 'Laura Torres' 
          },
          { 
            id: 'TRM-005', 
            titulo: 'Registro de Propiedad', 
            fecha: new Date(2025, 3, 1), 
            estado: 'pendiente', 
            responsable: 'Roberto Sánchez' 
          }
        ]
      };
    },
    computed: {
      filteredTramites() {
        let filtered = [...this.tramites];
        
        // Filtrar por búsqueda
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          filtered = filtered.filter(t => 
            t.id.toLowerCase().includes(query) || 
            t.titulo.toLowerCase().includes(query) ||
            t.responsable.toLowerCase().includes(query)
          );
        }
        
        // Filtrar por estado
        if (this.selectedStatus) {
          filtered = filtered.filter(t => t.estado === this.selectedStatus);
        }
        
        // Filtrar por rango de fechas
        if (this.selectedDateRange) {
          const today = new Date();
          let startDateFilter;
          
          switch(this.selectedDateRange) {
            case 'today':
              startDateFilter = new Date(today.setHours(0, 0, 0, 0));
              filtered = filtered.filter(t => t.fecha >= startDateFilter);
              break;
            case 'week':
              startDateFilter = new Date(today);
              startDateFilter.setDate(today.getDate() - 7);
              filtered = filtered.filter(t => t.fecha >= startDateFilter);
              break;
            case 'month':
              startDateFilter = new Date(today);
              startDateFilter.setMonth(today.getMonth() - 1);
              filtered = filtered.filter(t => t.fecha >= startDateFilter);
              break;
            case 'year':
              startDateFilter = new Date(today);
              startDateFilter.setFullYear(today.getFullYear() - 1);
              filtered = filtered.filter(t => t.fecha >= startDateFilter);
              break;
            case 'custom':
              if (this.startDate && this.endDate) {
                const start = new Date(this.startDate);
                const end = new Date(this.endDate);
                end.setHours(23, 59, 59, 999);
                filtered = filtered.filter(t => t.fecha >= start && t.fecha <= end);
              }
              break;
          }
        }
        
        return filtered;
      },
      totalPages() {
        return Math.ceil(this.filteredTramites.length / this.itemsPerPage);
      }
    },
    methods: {
      formatDate(date) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
      },
      getStatusLabel(status) {
        const statusMap = {
          'pendiente': 'Pendiente',
          'en-proceso': 'En Proceso',
          'completado': 'Completado',
          'rechazado': 'Rechazado'
        };
        return statusMap[status] || status;
      },
      openNewTramiteModal() {
        alert('Función para crear nuevo trámite');
      },
      viewTramite(id) {
        alert(`Ver detalles del trámite ${id}`);
      },
      editTramite(id) {
        alert(`Editar trámite ${id}`);
      },
      deleteTramite(id) {
        if (confirm(`¿Está seguro que desea eliminar el trámite ${id}?`)) {
          // Implementar lógica de eliminación
          alert(`Trámite ${id} eliminado`);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .tramites-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .page-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .search-container {
    position: relative;
    flex: 1;
    max-width: 400px;
  }
  
  .search-input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    background-color: var(--white-color);
    font-size: 14px;
  }
  
  .search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--light-color);
  }
  
  .new-button {
    background-color: var(--primary-color);
    color: var(--white-color);
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
  }
  
  .new-button i {
    margin-right: 8px;
  }
  
  .new-button:hover {
    background-color: var(--accent-color);
  }
  
  .filter-section {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .filter-group {
    display: flex;
    align-items: center;
  }
  
  .filter-group label {
    margin-right: 10px;
    font-size: 14px;
    color: var(--secondary-color);
  }
  
  .filter-select, .date-input {
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    background-color: var(--white-color);
    font-size: 14px;
  }
  
  .date-separator {
    margin: 0 10px;
    color: var(--secondary-color);
  }
  
  .card-container {
    background-color: var(--white-color);
    border-radius: 8px;
    box-shadow: var(--shadow);
    padding: 20px;
    margin-bottom: 20px;
    flex: 1;
    overflow: auto;
  }
  
  .tramites-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .tramites-table th, .tramites-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .tramites-table th {
    font-weight: 600;
    color: var(--secondary-color);
    background-color: rgba(0, 0, 0, 0.02);
  }
  
  .status-badge {
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .status-badge.pendiente {
    background-color: #fff8e5;
    color: #ffc107;
  }
  
  .status-badge.en-proceso {
    background-color: #e8f4fd;
    color: #2196f3;
  }
  
  .status-badge.completado {
    background-color: #e6f9e6;
    color: #4caf50;
  }
  
  .status-badge.rechazado {
    background-color: #ffebee;
    color: #f44336;
  }
  
  .actions-cell {
    white-space: nowrap;
  }
  
  .action-icon {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
    color: var(--secondary-color);
    transition: var(--transition);
  }
  
  .action-icon:hover {
    color: var(--primary-color);
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    padding: 15px 0;
  }
  
  .pagination-button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--white-color);
    border: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .pagination-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  .pagination-button:not(:disabled):hover {
    background-color: var(--primary-color);
    color: var(--white-color);
    border-color: var(--primary-color);
  }
  
  .pagination-info {
    margin: 0 15px;
    font-size: 14px;
    color: var(--secondary-color);
  }
  
  @media (max-width: 768px) {
    .page-actions {
      flex-direction: column;
      align-items: stretch;
    }
    
    .search-container {
      max-width: 100%;
      margin-bottom: 15px;
    }
    
    .filter-section {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .filter-group {
      width: 100%;
      margin-bottom: 10px;
    }
    
    .filter-select {
      width: 100%;
    }
  }
  </style>