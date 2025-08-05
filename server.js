const express = require('express');
const cors = require('cors');
const app = express();

// Configuración básica
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ status: 'API Aqualogic funcionando', version: '1.0.0' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});