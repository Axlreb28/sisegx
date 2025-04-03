<template>
  <div class="tramites-list card-container">
    <table class="tramites-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Responsable</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tramite in tramites" :key="tramite.id">
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
            <button class="action-icon" @click="$emit('view', tramite.id)">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-icon" @click="$emit('edit', tramite.id)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-icon" @click="$emit('delete', tramite.id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tramites: Array
  },
  methods: {
    formatDate(date) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString('es-ES', options);
    },
    getStatusLabel(status) {
      const statusMap = {
        'pendiente': 'Pendiente',
        'en-proceso': 'En Proceso',
        'completado': 'Completado',
        'rechazado': 'Rechazado'
      };
      return statusMap[status] || status;
    }
  }
}
</script>

<style scoped>
/* Puedes dejarlo vacío si los estilos vienen de tramites.css */
</style>
