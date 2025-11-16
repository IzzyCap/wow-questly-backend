# WoW Missions API

Backend API REST modular preparado para migrar a microservicios/lambdas.

## Estructura del Proyecto

```
wow-questly/
├── packages/              # Código compartido
│   ├── database/         # Prisma Client + schema
│   └── types/           # TypeScript types compartidos
├── services/
│   └── api/             # API REST (monolito)
│       ├── src/
│       │   ├── handlers/    # Lógica de negocio (→ lambdas)
│       │   ├── routes/      # Rutas de Fastify
│       │   ├── lib/         # Utilidades
│       │   └── index.ts     # Entry point
└── docker-compose.yml   # Docker services
```

## Setup

### 1. Instalar dependencias

```powershell
npm install
```

### 2. Iniciar servicios Docker

```powershell
npm run docker:up
```

Esto inicia PostgreSQL y Redis.

### 3. Configurar base de datos

```powershell
# Generar Prisma Client
npm run db:generate

# Aplicar migraciones
npm run db:migrate

# (Opcional) Abrir Prisma Studio
npm run db:studio
```

### 4. Ejecutar API

```powershell
npm run dev
```

La API estará disponible en http://localhost:4000

## Endpoints

- `GET /health` - Health check
- `GET /api/missions/:slug` - Obtener misión por slug
- `GET /api/missions/search?q=texto` - Buscar misiones

## Scripts disponibles

```powershell
npm run dev              # Ejecutar API en modo desarrollo
npm run docker:up        # Iniciar Docker services
npm run docker:down      # Detener Docker services
npm run db:generate      # Generar Prisma Client
npm run db:migrate       # Aplicar migraciones
npm run db:studio        # Abrir Prisma Studio
```

## Migración a Lambdas

Los **handlers** en `services/api/src/handlers/` están diseñados para ser
fácilmente convertidos a funciones Lambda:

- `getMission.ts` → Lambda GET /missions/{slug}
- `searchMissions.ts` → Lambda GET /missions/search

Cada handler es independiente y puede desplegarse como una función separada.
