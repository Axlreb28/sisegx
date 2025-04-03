<template>
    <div class="buscar_folio">
        <div class="title">
            <h1>Buscar Folio</h1>
        </div>
        <div class="input-group">
            <label for="folio">Folio</label>
            <input type="text" id="folio">
        </div>
        <div class="input-group">
            <label for="estado">Estado de la solicitud</label>
            <input type="text" id="estado">
        </div>
        <div class="input-group">
            <label for="audiencia">Estado de la audiencia</label>
            <input type="text" id="audiencia">
        </div>
        <div class="input-group">
            <label for="fecha_desde">Fecha desde</label>
            <input type="date" id="fecha_desde">
        </div>
        <div class="input-group">
            <label for="fecha_hasta">Fecha hasta</label>
            <input type="date" id="fecha_hasta">
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
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        margin: 0 auto;
    }

    .title {
        background: #cccccc;
        width: 110%;
        padding: 10px;
        height: 75px;
    }
    .title h1 {
        color: black;
    }
    
    .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }
    
    .input-group label {
        font-weight: bold;
        margin-bottom: 5px;
        color: black
    }
    
    .input-group input {
        padding: 1px;
        border: 1px solid #000000;
        border-radius: 4px;
        background-color: #ffffff;
        color: #ffffff;
    }
    
    .input-group input:focus {
        outline: none;
        border-color: #b11623;
    }
</style>