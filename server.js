const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configurar rutas de la API
app.use('/api/admin', require('./src/routes/admin.routes.js'));
app.use('/api/auth', require('./src/routes/auth.routes.js'));
app.use('/api/client', require('./src/routes/client.routes.js'));
app.use('/api/hospedaje', require('./src/routes/hospedaje.routes.js'));
app.use('/api/hospitalization', require('./src/routes/hospitalization.routes.js'));
app.use('/api/patient', require('./src/routes/patient.routes.js'));

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
