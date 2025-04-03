<template>
    <div class="tramites-container">
      <!-- Encabezado con buscador y botón de nuevo trámite -->
      <div class="page-actions">
        <div class="search-container">
          <input 
            v-model="searchQuery" 
            class="search-input" 
            type="text" 
            placeholder="Buscar trámites..." 
            @input="filterTramites"
          >
          <i class="search-icon fas fa-search"></i>
        </div>
        <button class="new-button" @click="showNewTramiteForm = true">
          <i class="fas fa-plus"></i> Nuevo Trámite
        </button>
      </div>
  
      <!-- Sección de filtros -->
      <div class="filter-section">
        <div class="filter-group">
          <label for="estado-filter">Estado:</label>
          <select id="estado-filter" v-model="estadoFilter" class="filter-select" @change="filterTramites">
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="en-proceso">En Proceso</option>
            <option value="completado">Completado</option>
            <option value="rechazado">Rechazado</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="tipo-filter">Tipo:</label>
          <select id="tipo-filter" v-model="tipoFilter" class="filter-select" @change="filterTramites">
            <option value="">Todos</option>
            <option value="solicitud">Solicitud</option>
            <option value="reclamo">Reclamo</option>
            <option value="consulta">Consulta</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Fecha:</label>
          <input type="date" v-model="fechaInicio" class="date-input" @change="filterTramites">
          <span class="date-separator">a</span>
          <input type="date" v-model="fechaFin" class="date-input" @change="filterTramites">
        </div>
      </div>
  
      <!-- Tabla de trámites -->
      <div class="card-container">
        <table class="tramites-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Asunto</th>
              <th>Solicitante</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tramite in paginatedTramites" :key="tramite.id">
              <td>{{ tramite.id }}</td>
              <td>{{ tramite.tipo }}</td>
              <td>{{ tramite.asunto }}</td>
              <td>{{ tramite.solicitante }}</td>
              <td>{{ formatDate(tramite.fecha) }}</td>
              <td>
                <span :class="['status-badge', tramite.estado]">
                  {{ formatEstado(tramite.estado) }}
                </span>
              </td>
              <td class="actions-cell">
                <button class="action-icon" @click="viewTramite(tramite)">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="action-icon" @click="editTramite(tramite)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-icon" @click="deleteTramite(tramite.id)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="paginatedTramites.length === 0">
              <td colspan="7" class="text-center py-4">No hay trámites que coincidan con los filtros seleccionados.</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Paginación -->
      <div class="pagination">
        <button 
          class="pagination-button" 
          :disabled="currentPage === 1" 
          @click="currentPage--"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <span class="pagination-info">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        <button 
          class="pagination-button" 
          :disabled="currentPage === totalPages" 
          @click="currentPage++"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
  
      <!-- Modal para nuevo trámite -->
      <div v-if="showNewTramiteForm" class="modal">
        <div class="modal-content">
          <h2>Nuevo Trámite</h2>
          <form @submit.prevent="saveTramite">
            <div class="form-group">
              <label for="tipo">Tipo de Trámite:</label>
              <select id="tipo" v-model="newTramite.tipo" required>
                <option value="solicitud">Solicitud</option>
                <option value="reclamo">Reclamo</option>
                <option value="consulta">Consulta</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="asunto">Asunto:</label>
              <input type="text" id="asunto" v-model="newTramite.asunto" required>
            </div>
            
            <div class="form-group">
              <label for="solicitante">Solicitante:</label>
              <input type="text" id="solicitante" v-model="newTramite.solicitante" required>
            </div>
            
            <div class="form-group">
              <label for="descripcion">Descripción:</label>
              <textarea id="descripcion" v-model="newTramite.descripcion" rows="4"></textarea>
            </div>
            
            <div class="modal-actions">
              <button type="button" class="cancel-button" @click="showNewTramiteForm = false">
                Cancelar
              </button>
              <button type="submit" class="submit-button">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TramitesForm',
    data() {
      return {
        // Filtros
        searchQuery: '',
        estadoFilter: '',
        tipoFilter: '',
        fechaInicio: '',
        fechaFin: '',
        
        // Paginación
        currentPage: 1,
        itemsPerPage: 10,
        
        // Modal de nuevo trámite
        showNewTramiteForm: false,
        newTramite: {
          tipo: 'solicitud',
          asunto: '',
          solicitante: '',
          descripcion: ''
        },
        
        // Datos de trámites (simulados)
        tramites: [
          {
            id: 'TRM-001',
            tipo: 'solicitud',
            asunto: 'Solicitud de certificado',
            solicitante: 'Juan Pérez',
            fecha: '2025-03-25',
            estado: 'pendiente'
          },
          {
            id: 'TRM-002',
            tipo: 'reclamo',
            asunto: 'Problema con facturación',
            solicitante: 'María Rodríguez',
            fecha: '2025-03-20',
            estado: 'en-proceso'
          },
          {
            id: 'TRM-003',
            tipo: 'consulta',
            asunto: 'Información sobre documentación',
            solicitante: 'Carlos Sánchez',
            fecha: '2025-03-15',
            estado: 'completado'
          },
          {
            id: 'TRM-004',
            tipo: 'solicitud',
            asunto: 'Cambio de dirección',
            solicitante: 'Ana Gómez',
            fecha: '2025-03-10',
            estado: 'rechazado'
          }
        ],
        filteredTramites: []
      };
    },
    created() {
      // Inicializar los trámites filtrados con todos los trámites
      this.filteredTramites = [...this.tramites];
    },
    computed: {
      // Calcular las páginas totales
      totalPages() {
        return Math.ceil(this.filteredTramites.length / this.itemsPerPage);
      },
      // Obtener los trámites para la página actual
      paginatedTramites() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredTramites.slice(start, end);
      }
    },
    methods: {
      // Filtrar trámites según los criterios
      filterTramites() {
        this.filteredTramites = this.tramites.filter(tramite => {
          // Filtro por texto de búsqueda
          const searchMatch = 
            tramite.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            tramite.asunto.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            tramite.solicitante.toLowerCase().includes(this.searchQuery.toLowerCase());
          
          // Filtro por estado
          const estadoMatch = this.estadoFilter ? tramite.estado === this.estadoFilter : true;
          
          // Filtro por tipo
          const tipoMatch = this.tipoFilter ? tramite.tipo === this.tipoFilter : true;
          
          // Filtro por fecha
          let fechaMatch = true;
          if (this.fechaInicio) {
            fechaMatch = fechaMatch && tramite.fecha >= this.fechaInicio;
          }
          if (this.fechaFin) {
            fechaMatch = fechaMatch && tramite.fecha <= this.fechaFin;
          }
          
          return searchMatch && estadoMatch && tipoMatch && fechaMatch;
        });
        
        // Resetear a la primera página al filtrar
        this.currentPage = 1;
      },
      
      // Formatear fecha para mostrar
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
      },
      
      // Formatear estado para mostrar
      formatEstado(estado) {
        const formatos = {
          'pendiente': 'Pendiente',
          'en-proceso': 'En Proceso',
          'completado': 'Completado',
          'rechazado': 'Rechazado'
        };
        return formatos[estado] || estado;
      },
      
      // Ver detalles de un trámite
      viewTramite(tramite) {
        // Aquí implementarías la lógica para ver detalles
        console.log('Ver trámite:', tramite);
        alert(`Ver detalles del trámite: ${tramite.id}`);
      },
      
      // Editar un trámite
      editTramite(tramite) {
        // Aquí implementarías la lógica para editar
        console.log('Editar trámite:', tramite);
        alert(`Editar trámite: ${tramite.id}`);
      },
      
      // Eliminar un trámite
      deleteTramite(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este trámite?')) {
          this.tramites = this.tramites.filter(t => t.id !== id);
          this.filterTramites();
        }
      },
      
      // Guardar un nuevo trámite
      saveTramite() {
        // Generar un ID único
        const newId = `TRM-${String(this.tramites.length + 1).padStart(3, '0')}`;
        
        // Crear el nuevo trámite
        const tramite = {
          id: newId,
          ...this.newTramite,
          fecha: new Date().toISOString().split('T')[0],
          estado: 'pendiente'
        };
        
        // Agregar a la lista de trámites
        this.tramites.unshift(tramite);
        
        // Actualizar la lista filtrada
        this.filterTramites();
        
        // Cerrar el modal y limpiar el formulario
        this.showNewTramiteForm = false;
        this.newTramite = {
          tipo: 'solicitud',
          asunto: '',
          solicitante: '',
          descripcion: ''
        };
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales para el modal */
  .modal {
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
  }
  
  .modal-content {
    background-color: var(--white-color, #fff);
    border-radius: 8px;
    box-shadow: var(--shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
    padding: 20px;
    width: 100%;
    max-width: 500px;
  }
  
  .modal-content h2 {
    margin-top: 0;
    margin-bottom: 20px;
    color: var(--primary-color, #4a6fff);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: var(--secondary-color, #333);
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .cancel-button {
    background-color: #f5f5f5;
    color: var(--secondary-color, #333);
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 10px 15px;
    margin-right: 10px;
    cursor: pointer;
  }
  
  .submit-button {
    background-color: var(--primary-color, #4a6fff);
    color: var(--white-color, #fff);
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: var(--accent-color, #3a5dff);
  }
  
  /* Estilo para mensajes vacíos */
  .text-center {
    text-align: center;
  }
  
  .py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  </style>