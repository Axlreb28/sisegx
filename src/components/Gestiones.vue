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
</template>
  
<style scoped>

    .buscar_folio {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        background: #ffffff;
        width: 50%;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        margin: 0 auto;
        overflow: hidden;
        padding-top: 0;
    }

    .title {
        background-color: #ccc;
        padding: 10px;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
    }
    .title h1 {
        color: black;
        align-items: center;
    }
    
    .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        padding: 20px;
    }
    
    .input-group label {
        font-weight: bold;
        margin-bottom: 5px;
        color: black;
        padding: 10px;
    }
    
    .input-group input {
        padding: 1px;
        border: 1px solid #000000;
        border-radius: 4px;
        background-color: #ffffff;
        color: #000000;
    }
    
    .input-group input:focus {
        outline: none;
        border-color: #b11623;
    }

    .button-group {
        display: flex;
        justify-content: space-between;
        width: 70%;
        padding: 20px;
        box-sizing: border-box;
        
    }
</style>

<script setup>
const buscar = () => {
  console.log('Buscando...');
}

const mostrarTodos = () => {
  console.log('Mostrando todos...');
}

const exportar = () => {
  console.log('Exportando...');
}
</script>
