cd backend
npm install

2. Variables de Entorno
Configura tu conexión a la base de datos MySQL:

Copia el archivo de ejemplo: cp .env.example .env

Edita el .env con tus credenciales: DATABASE_URL="mysql://usuario:password@localhost:3306/nombre_db"

# Sincronizar el schema con MySQL y crear las tablas
npx prisma migrate dev --name init

# Generar el cliente de Prisma
npx prisma generate

## 📂 Estructura del Repositorio

```text
/
backend/
├── src/
│   ├── domain/              # Entidades y lógica de negocio
│   │   ├── entities/
│   │   │   ├── Marca.js
│   │   │   ├── Talento.js
│   │   │   ├── Agencia.js
│   │   │   ├── Transaccion.js
│   │   │   └── Cotizacion.js
│   │   └── repositories/    # Interfaces (contratos)
│   │       ├── IMarcaRepository.js
│   │       ├── ITalentoRepository.js
│   │       ├── IAgenciaRepository.js
│   │       └── ITransaccionRepository.js
│   │
│   ├── application/         # Casos de uso
│   │   ├── use-cases/
│   │   │   ├── marca/
│   │   │   │   ├── CreateMarca.js
│   │   │   │   ├── GetMarcas.js
│   │   │   │   ├── GetMarcaById.js
│   │   │   │   ├── UpdateMarca.js
│   │   │   │   └── DeleteMarca.js
│   │   │   ├── talento/
│   │   │   │   ├── CreateTalento.js
│   │   │   │   ├── GetTalentos.js
│   │   │   │   ├── GetTalentoById.js
│   │   │   │   ├── UpdateTalento.js
│   │   │   │   └── DeleteTalento.js
│   │   │   ├── agencia/
│   │   │   │   ├── CreateAgencia.js
│   │   │   │   ├── GetAgencias.js
│   │   │   │   ├── AddTalentoToAgencia.js
│   │   │   │   └── RemoveTalentoFromAgencia.js
│   │   │   └── transaccion/
│   │   │       ├── CreateTransaccion.js
│   │   │       ├── GetTransacciones.js
│   │   │       ├── AddCotizacion.js
│   │   │       └── UpdateEstadoTransaccion.js
│   │   └── services/        # Servicios de aplicación
│   │       └── EmailService.js
│   │
│   ├── infrastructure/      # Implementaciones concretas
│   │   ├── database/
│   │   │   ├── prisma/
│   │   │   │   ├── client.js
│   │   │   │   └── schema.prisma
│   │   │   └── repositories/
│   │   │       ├── PrismaMarcaRepository.js
│   │   │       ├── PrismaTalentoRepository.js
│   │   │       ├── PrismaAgenciaRepository.js
│   │   │       └── PrismaTransaccionRepository.js
│   │   ├── web/
│   │   │   ├── routes/
│   │   │   │   ├── marcas.routes.js
│   │   │   │   ├── talentos.routes.js
│   │   │   │   ├── agencias.routes.js
│   │   │   │   └── transacciones.routes.js
│   │   │   ├── controllers/
│   │   │   │   ├── MarcaController.js
│   │   │   │   ├── TalentoController.js
│   │   │   │   ├── AgenciaController.js
│   │   │   │   └── TransaccionController.js
│   │   │   ├── middlewares/
│   │   │   │   ├── errorHandler.js
│   │   │   │   ├── validator.js
│   │   │   │   └── auth.js
│   │   │   └── app.js
│   │   └── external/
│   │       └── NodemailerEmailService.js
│   │
│   └── shared/              # Utilidades compartidas
│       ├── errors/
│       │   ├── AppError.js
│       │   ├── NotFoundError.js
│       │   └── ValidationError.js
│       ├── validators/
│       │   ├── marcaValidator.js
│       │   ├── talentoValidator.js
│       │   └── agenciaValidator.js
│       └── utils/
│           ├── logger.js
│           └── response.js
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── server.js
🛠️ Tecnologías del Backend
Runtime: Node.js

Framework: Express.js

ORM: Prisma con soporte para MySQL

Arquitectura: Clean Architecture (Domain, Application, Infrastructure)

Seguridad: Helmet & CORS

Desarrollo: npm run dev

Producción: npm start
