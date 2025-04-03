<template>
    <div class="reportes-container">
        <div class="card">
            <div class="card-header">
                <h3>Buscar</h3>
            </div>
            <div class="card-body">
                <div class="reports-grid">
                    <div class="report-card">
                        <div class="report-icon">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <div class="report-info">
                            <h4>Buscar por folio</h4>
                            <p>Estadísticas del mes en curso</p>
                        </div>
                    </div>
                
                    <div class="report-card">
                        <div class="report-icon">
                            <i class="fas fa-chart-pie"></i>
                        </div>
                        <div class="report-info">
                            <h4>Reporte Anual</h4>
                            <p>Resumen del año fiscal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
    export default {
        name: 'Reportes'
    }
</script>
  
<style scoped>
    .reportes-container {
        padding: 20px;
    }
  
    .card {
        background-color: var(--white-color);
        border-radius: 8px;
        box-shadow: var(--shadow);
        overflow: hidden;
    }
  
    .card-header {
        padding: 20px;
        background-color: var(--white-color);
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
  
    .card-header h3 {
        margin: 0;
        color: var(--secondary-color);
        font-size: 18px;
    }
  
    .card-body {
        padding: 20px;
    }
  
    .welcome-message {
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-color);
        margin-bottom: 10px;
    }
  
    .reports-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }
  
    .report-card {
        background-color: rgba(177, 22, 35, 0.05);
        border-radius: 8px;
        padding: 15px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: var(--transition);
    }
  
    .report-card:hover {
        background-color: rgba(177, 22, 35, 0.1);
    }
  
    .report-icon {
        width: 50px;
        height: 50px;
        background-color: var(--white-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        color: var(--primary-color);
        font-size: 20px;
    }
  
    .report-info h4 {
        margin: 0 0 5px 0;
        color: var(--secondary-color);
        font-size: 16px;
    }
  
    .report-info p {
        margin: 0;
        color: var(--light-color);
        font-size: 14px;
    }
</style>