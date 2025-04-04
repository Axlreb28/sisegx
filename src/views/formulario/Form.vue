<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-bold mb-4">Nuevo Trámite</h2>
    <h3>Datos de la persona solicitante</h3>
    <form @submit.prevent="saveTramite">
      <div class="mb-4">
        <label class="block text-gray-700">Nombre(s)</label>
        <input v-model="newTramite.asunto" type="text" class="w-full px-3 py-2 border rounded-lg" />
        <label class="block text-gray-700">Apellido paterno:</label>
        <input v-model="newTramite.asunto" type="text" class="w-full px-3 py-2 border rounded-lg" />
        <label class="block text-gray-700">Apellido materno:</label>
        <input v-model="newTramite.asunto" type="text" class="w-full px-3 py-2 border rounded-lg" />
        <label class="block text-gray-700">Fecha de nacimiento:</label>
        <input v-model="newTramite.asunto" type="date" class="w-full px-3 py-2 border rounded-lg" />
        <label class="block text-gray-700">Sexo:</label>
        <select v-model="newTramite.tipo" class="w-full px-3 py-2 border rounded-lg">
          <option value=""></option>
          <option value="mujer">Mujer</option>
          <option value="hombre">Hombre</option>
        </select>
      </div>
      <h3>Domicilio</h3>
      <div class="mb-4">
        <label class="block text-gray-700">Fecha de nacimiento:</label>
        <input v-model="newTramite.asunto" type="date" class="w-full px-3 py-2 border rounded-lg" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Asunto</label>
        <input v-model="newTramite.asunto" type="text" class="w-full px-3 py-2 border rounded-lg" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Solicitante</label>
        <input v-model="newTramite.solicitante" type="text" class="w-full px-3 py-2 border rounded-lg" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Descripción</label>
        <textarea v-model="newTramite.descripcion" class="w-full px-3 py-2 border rounded-lg"></textarea>
      </div>

      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg">Guardar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const newTramite = ref({
  tipo: "solicitud",
  asunto: "",
  solicitante: "",
  descripcion: "",
});

const tramites = ref([]);

const saveTramite = () => {
  console.log("Guardando trámite:", newTramite.value);

  if (!newTramite.value.asunto || !newTramite.value.solicitante || !newTramite.value.descripcion) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const newId = `TRM-${String(tramites.value.length + 1).padStart(3, "0")}`;
  const tramite = {
    id: newId,
    ...newTramite.value,
    fecha: new Date().toISOString().split("T")[0],
    estado: "pendiente",
  };

  tramites.value.unshift(tramite);
  console.log("Trámite guardado:", tramite);

  // Resetear el formulario
  newTramite.value = {
    tipo: "solicitud",
    asunto: "",
    solicitante: "",
    descripcion: "",
  };
};
</script>

<style>
body {
  background-color: #f3f4f6;
}
</style>

