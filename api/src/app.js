require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta de prueba mínima
app.get('/api/mediciones', (req, res) => {
  res.json([{id: 1, sector: "Pozo 1", valor: 12.5}]);
});

// Manejo básico de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});