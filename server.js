import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuraciones para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configurar rutas de la API
import adminRoutes from './src/routes/admin.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import clientRoutes from './src/routes/client.routes.js';
import hospedajeRoutes from './src/routes/hospedaje.routes.js';
import hospitalizationRoutes from './src/routes/hospitalization.routes.js';
import patientRoutes from './src/routes/patient.routes.js';

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);  // Esta ruta es crítica para el signin
app.use('/api/client', clientRoutes);
app.use('/api/hospedaje', hospedajeRoutes);
app.use('/api/hospitalization', hospitalizationRoutes);
app.use('/api/patient', patientRoutes);

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'dist')));

// Redirigir todas las demás rutas a index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
