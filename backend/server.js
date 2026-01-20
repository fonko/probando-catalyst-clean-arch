// server.js
require('dotenv').config();
const app = require('./src/infrastructure/web/app');
const prisma = require('./src/infrastructure/database/prisma/client');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📝 Entorno: ${process.env.NODE_ENV || 'development'}`);
});

// Manejo de cierre graceful
process.on('SIGTERM', async () => {
    console.log('SIGTERM recibido. Cerrando servidor...');
    server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
    });
});

process.on('SIGINT', async () => {
    console.log('SIGINT recibido. Cerrando servidor...');
    server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
    });
});