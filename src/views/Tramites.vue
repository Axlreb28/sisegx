<template>

  <div class="buscar_folio">
    <div class="title">
        <h1>Buscar Folio</h1>
    </div>
    <div class="input-group">
        <label for="folio">Folio</label>
        <input type="text" id="folio">
    
        <label for="estado">Estado de la solicitud</label>
        <input type="text" id="estado">
    
        <label for="audiencia">Estado de la audiencia</label>
        <input type="text" id="audiencia">
    
        <label for="fecha_desde">Fecha desde</label>
        <input type="date" id="fecha_desde">
        <label for="fecha_hasta">Fecha hasta</label>
        <input type="date" id="fecha_hasta">
    </div>
    
    <div class="button-group">
        <button type="submit" @click.prevent="buscar">Buscar</button>
        <button type="button" @click="mostrarTodos">Mostrar todos</button>
        <button type="button" @click="exportar">Exportar</button>
    </div>
  </div>

  <div class="tramites-container">
    <SearchBar v-model="searchQuery" />

    <FilterSection
    v-model:status="selectedStatus"
    v-model:range="selectedDateRange"
    v-model:start="startDate"
    v-model:end="endDate"
  />

    <TramitesTable
      :tramites="filteredTramitesPaginated"
      @view="viewTramite"
      @edit="editTramite"
      @delete="deleteTramite"
    />

    <Pagination
      :current="currentPage"
      :total="totalPages"
      @prev="currentPage--"
      @next="currentPage++"
    />
  </div>
</template>

<script>
import SearchBar from '@/components/tramites/SearchBar.vue';
import FilterSection from '@/components/tramites/FilterSection.vue';
import TramitesTable from '@/components/tramites/TramitesTable.vue';
import Pagination from '@/components/tramites/Pagination.vue';

export default {
  name: 'Tramites',
  components: {
    SearchBar,
    FilterSection,
    TramitesTable,
    Pagination
  },
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
      const query = this.searchQuery.toLowerCase();

      if (query) {
        filtered = filtered.filter(t =>
          t.id.toLowerCase().includes(query) ||
          t.titulo.toLowerCase().includes(query) ||
          t.responsable.toLowerCase().includes(query)
        );
      }

      if (this.selectedStatus) {
        filtered = filtered.filter(t => t.estado === this.selectedStatus);
      }

      if (this.selectedDateRange) {
        const today = new Date();
        let startDateFilter;

        switch (this.selectedDateRange) {
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
    filteredTramitesPaginated() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredTramites.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredTramites.length / this.itemsPerPage);
    }
  },
  methods: {
    viewTramite(id) {
      alert(`Ver trámite ${id}`);
    },
    editTramite(id) {
      alert(`Editar trámite ${id}`);
    },
    deleteTramite(id) {
      if (confirm(`¿Eliminar el trámite ${id}?`)) {
        alert(`Trámite ${id} eliminado`);
      }
    }
  }
};
</script>

<style>
@import '@/assets/css/tramites.css';
</style>
