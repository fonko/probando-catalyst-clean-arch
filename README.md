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
├── frontend/             # Aplicación cliente (React/Vue/etc.)
├── backend/              # API REST (Node.js + Express)
│   ├── prisma/           # Esquemas y migraciones de base de datos
│   ├── src/              # Código fuente (Clean Architecture)
│   └── app.js            # Punto de entrada del servidor
├── .env.example          # Plantilla de variables de entorno (Raíz)
└── .gitignore            # Archivos ignorados por Git
🛠️ Tecnologías del Backend
Runtime: Node.js

Framework: Express.js

ORM: Prisma con soporte para MySQL

Arquitectura: Clean Architecture (Domain, Application, Infrastructure)

Seguridad: Helmet & CORS

Desarrollo: npm run dev

Producción: npm start