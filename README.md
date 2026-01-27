# CRM Leads - Pipeline de Gestión de Prospectos

Una aplicación React moderna para gestionar leads de ventas con pipeline visual por etapas, CRUD completo y persistencia local.

## 🎯 Objetivo del Proyecto

Construir una app en React tipo negocio para **gestionar leads** en un **pipeline por etapas**, con CRUD completo y persistencia en **localStorage**, desplegada en **Vercel**.

### Contexto y usuario

- **Problema:** Registrar y dar seguimiento a prospectos sin depender de Excel o CRMs complejos.
- **Usuario objetivo:** Persona de ventas/negocio que necesita trackear leads de manera simple y visual.
- **Escenario de uso:** Registrar leads, moverlos entre etapas del pipeline, agendar seguimientos y visualizar actividades.

## ✨ Características Principales (MVP)

1. **CRUD Completo de Leads**
   - Crear, editar y eliminar leads con confirmación
   - Formulario validado con React Hook Form + Zod
   - Datos estructurados: nombre, apellido, email, teléfono, empresa y estado

2. **Pipeline Visual por Etapas**
   - Kanban board con drag & drop (dnd-kit)
   - 5 estados: NEW → CONTACTED → QUALIFIED → PROPOSAL → CLOSED
   - Actualización automática de estado al mover cards

3. **Sistema de Actividades**
   - Log de interacciones por lead (llamadas, emails, reuniones, notas)
   - Timeline visual con filtros por tipo y lead
   - Historial completo de cambios

4. **Búsqueda y Filtros**
   - Búsqueda por nombre, email o empresa
   - Filtros por estado del lead
   - Vista de tabla y vista kanban

5. **Persistencia Local**
   - Auto-guardado en localStorage
   - Sincronización automática en tiempo real
   - Los datos persisten al recargar la página

### 🚫 Fuera del Alcance (por ahora)

- Login/autenticación de usuarios
- Backend real / API REST
- Notificaciones push o emails automáticos
- Integraciones con herramientas externas (Slack, Google Calendar, etc.)

## 🛠️ Stack Técnico

### Core

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool y dev server

### UI Components

- **shadcn/ui** - Component library (Radix UI + Tailwind)
- **Tailwind CSS 4** - Utility-first CSS
- **Lucide React** - Icon system
- **dnd-kit** - Drag and drop functionality

### State Management & Forms

- **React Context API** - Global state management
- **useReducer** - Predictable state updates
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Routing

- **React Router 7** - Client-side routing

## 📁 Arquitectura del Proyecto

```
src/
├── components/
│   └── ui/               # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       └── ...
├── leads/
│   ├── components/       # Lead-specific components
│   │   ├── AddNewLead.tsx
│   │   ├── AddActivity.tsx
│   │   └── SearchLeads.tsx
│   ├── context/          # State management
│   │   └── LeadsContext.tsx
│   ├── domain/           # Business logic & types
│   │   ├── lead.interface.ts
│   │   ├── lead-status.type.ts
│   │   ├── lead-status-constants.ts
│   │   ├── leads-state.interface.ts
│   │   └── activity.interface.ts
│   ├── layouts/
│   │   └── LeadsLayout.tsx
│   ├── pages/            # Page components
│   │   ├── HomePage.tsx
│   │   ├── KanbanPage.tsx
│   │   ├── ActivityPage.tsx
│   │   └── LeadPage.tsx
│   └── reducer/          # State reducer
│       └── leadsReducer.ts
├── lib/
│   └── utils.ts          # Utility functions
└── router/
    └── app.router.tsx    # Route configuration
```

### Principios de Arquitectura

1. **Separación de Responsabilidades**
   - `domain/`: Tipos, interfaces y constantes de negocio
   - `context/`: Estado global y lógica de persistencia
   - `reducer/`: Lógica de actualización de estado
   - `components/`: Componentes reutilizables sin lógica de negocio
   - `pages/`: Componentes de página que orquestan la UI

2. **Gestión de Estado**
   - Context API + useReducer para estado global
   - Estado local con useState para UI temporal
   - Persistencia automática en localStorage mediante useEffect

3. **Validación y Tipos**
   - TypeScript para type safety en compile time
   - Zod schemas para validación en runtime
   - Interfaces explícitas para todos los modelos de datos

## 🚀 Getting Started

### Prerequisitos

- Node.js 18+
- pnpm (recomendado) o npm

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd crm-leads

# Instalar dependencias
pnpm install

# Iniciar dev server
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

```bash
pnpm dev      # Inicia el servidor de desarrollo
pnpm build    # Compila para producción
pnpm preview  # Preview de la build de producción
pnpm lint     # Ejecuta ESLint
```

## 🎨 Guía de Uso

### Gestión de Leads

1. **Agregar Lead**: Click en "Add New Lead" → Completar formulario → Save Lead
2. **Editar Lead**: Click en el ícono de edición (lápiz) en la tabla o kanban
3. **Eliminar Lead**: Click en el ícono de eliminar (🗑️) → Confirmar acción
4. **Mover entre etapas**: En vista Kanban, arrastrar y soltar el card a otra columna

### Registro de Actividades

1. **Desde tabla**: Click en ícono de documento (📝) en la fila del lead
2. **Desde página de actividad**: Click en "Log Activity" → Seleccionar lead
3. **Tipos disponibles**: Nota, Llamada, Email, Reunión, Cambio de Estado

### Navegación

- **Home**: Vista de tabla con estadísticas y filtros
- **Kanban**: Pipeline visual con drag & drop
- **Activity**: Timeline de todas las interacciones
- **Lead** (próximamente): Vista detallada individual

## 📦 Modelo de Datos

### Lead

```typescript
interface Lead {
  id: string; // UUID
  name: string; // Nombre
  lastName: string; // Apellido
  email: string; // Email
  phone: string; // Teléfono
  company: string; // Empresa
  status: LeadStatus; // Estado actual
  column: LeadStatus; // Columna en kanban
  dateAdded: string; // ISO date string
}
```

### Activity

```typescript
interface Activity {
  id: string; // UUID
  leadId: string; // Referencia al lead
  leadName: string; // Nombre del lead (denormalized)
  type: ActivityType; // NOTE | CALL | EMAIL | MEETING | STATUS_CHANGE
  title: string; // Título corto
  description: string; // Descripción detallada
  dateCreated: string; // ISO date string
  createdBy: string; // Usuario (mock: "You")
}
```

### Estados del Pipeline

```typescript
enum LeadStatus {
  NEW = "NEW", // Nuevo prospecto
  CONTACTED = "CONTACTED", // Primer contacto realizado
  QUALIFIED = "QUALIFIED", // Lead calificado
  PROPOSAL = "PROPOSAL", // Propuesta enviada
  CLOSED = "CLOSED", // Cerrado (ganado/perdido)
}
```

## ✅ Criterios de Éxito

- [x] Se puede crear un lead, editarlo, moverlo de etapa y **al recargar el navegador no se pierde nada**
- [x] El código separa UI, dominio y persistencia (sin lógica de negocio pegada al componente)
- [x] Confirmación antes de acciones destructivas (eliminar)
- [x] Validación completa de formularios
- [ ] Deploy en Vercel funcionando con URL pública
- [ ] La app permite filtrar "leads con seguimiento en los próximos 7 días" (pendiente)
- [ ] Pruebas unitarias de dominio/reducer + componentes clave (pendiente)

## 🔮 Próximos Pasos

- [ ] Implementar funcionalidad completa de actividades (crear, listar, persistir)
- [ ] Agregar página de detalle individual de lead
- [ ] Implementar filtros avanzados (por fecha de seguimiento)
- [ ] Tests unitarios y de integración
- [ ] Deploy en Vercel con CI/CD
- [ ] Mejoras de UX: toast notifications, loading states
- [ ] Dark mode

## 📝 Notas Técnicas

### Persistencia

La persistencia se implementa mediante `localStorage` con sincronización automática. El `LeadsContext` escucha cambios en el estado y actualiza el storage:

```typescript
useEffect(() => {
  localStorage.setItem("leads", JSON.stringify(state.leads));
}, [state.leads]);
```

### Gestión de Estado

Se utiliza el patrón reducer para operaciones complejas:

```typescript
type LeadsAction =
  | { type: "ADD_LEAD"; payload: Omit<Lead, "id" | "dateAdded"> }
  | { type: "DELETE_LEAD"; payload: string }
  | { type: "UPDATE_LEAD"; payload: { id: string; leadData: Partial<Lead> } }
  | { type: "SET_LEADS"; payload: Lead[] };
```

### Componentes Reutilizables

El componente `AddNewLead` funciona en modo dual:

- **Modo creación**: Con su propio trigger button
- **Modo edición**: Controlado externamente con props `lead`, `open`, `onOpenChange`

Este patrón se replica en `AddActivity` para máxima flexibilidad.

## 📄 Licencia

Este es un proyecto de demostración educativa.

---

**Hecho con React 19 + TypeScript + shadcn/ui**
