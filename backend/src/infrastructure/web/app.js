// src/infrastructure/web/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Rutas
const marcasRoutes = require('./routes/marcas.routes');
//const talentosRoutes = require('./routes/talentos.routes');
//const agenciasRoutes = require('./routes/agencias.routes');
//const transaccionesRoutes = require('./routes/transacciones.routes');

// Middlewares
const errorHandler = require('./middlewares/errorHandler');
const { notFoundHandler } = require('./middlewares/errorHandler');

const app = express();

// Middleware de seguridad
app.use(helmet());
app.use(cors());

// Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rutas
app.use('/api/v1/marcas', marcasRoutes);
//app.use('/api/v1/talentos', talentosRoutes);
//app.use('/api/v1/agencias', agenciasRoutes);
//app.use('/api/v1/transacciones', transaccionesRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use(notFoundHandler);
// Error handler (debe ser el último middleware)
app.use(errorHandler);

module.exports = app;