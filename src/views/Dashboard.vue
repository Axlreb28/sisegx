<!-- src/views/Dashboard.vue -->
<template>
    <div class="dashboard">
      <h1>Dashboard</h1>
      <button @click="logout">Cerrar Sesión</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Limpiar localStorage
        localStorage.removeItem('user')
        
        // Redirigir al login
        this.$router.push('/')
      }
    }
  }
  </script>