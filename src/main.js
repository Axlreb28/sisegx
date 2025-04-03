import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Importar las dependencias de FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserShield, faDatabase, faPalette } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Agregar los íconos a la biblioteca global
library.add(faUserShield, faDatabase, faPalette)

const app = createApp(App)

// Registrar FontAwesomeIcon como un componente global
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
