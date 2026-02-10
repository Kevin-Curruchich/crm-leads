# CRM Leads - AI Agent Instructions

## Project Overview

CRM Leads is a React 19 lead management app with kanban pipeline, drag-and-drop, and localStorage persistence. It uses TypeScript, Vite, shadcn/ui, and Tailwind CSS 4.

**Key Tech**: React 19, TypeScript, Vite, React Router 7, shadcn/ui, dnd-kit, React Hook Form + Zod, Context API + useReducer, localStorage for persistence.

## Architecture Patterns

### State Management Philosophy

This app uses **Context API + useReducer** instead of libraries like Redux or Zustand. State lives in [src/leads/context/LeadsContext.tsx](../src/leads/context/LeadsContext.tsx) with actions dispatched to [src/leads/reducer/leadsReducer.ts](../src/leads/reducer/leadsReducer.ts).

**Critical**: All lead state mutations MUST go through reducer actions (`ADD_LEAD`, `UPDATE_LEAD`, `DELETE_LEAD`, `SET_LEADS`). Never mutate state directly.

```typescript
// ✅ Correct
const { updateLead } = use(LeadsContext);
updateLead(leadId, { status: "CONTACTED" });

// ❌ Never do this
const { leads } = use(LeadsContext);
leads[0].status = "CONTACTED";
```

### Data Flow: localStorage Sync

[LeadsContext.tsx](../src/leads/context/LeadsContext.tsx#L69-L71) auto-saves to localStorage via `useEffect`. On mount, it loads from localStorage. This is the ONLY place localStorage should be touched for leads data.

**When adding new entities** (activities, tags, etc.), follow the same pattern: useEffect in context for auto-save.

### Lead Status vs Column

`Lead` interface has BOTH `status` and `column` fields ([src/leads/domain/lead.interfact.ts](../src/leads/domain/lead.interfact.ts#L10-L11)):

- `status`: Business state of the lead
- `column`: Current kanban column (for drag-and-drop positioning)

When updating status, ALWAYS sync both: `{ status: newStatus, column: newStatus }`. See [leadsReducer.ts](../src/leads/reducer/leadsReducer.ts#L45) for example.

### Form Pattern: Dual-Mode Components

[AddNewLead.tsx](../src/leads/components/AddNewLead.tsx) is a CREATE/EDIT dual-mode dialog:

- Controlled by URL params: `?leadModalOpen=true&leadId=abc123`
- Check `leadId` param to determine mode: `const isEditMode = !!leadId;`
- Form defaults reset or pre-populate based on mode

**Pattern for new modals**: Follow this URL param approach rather than props to maintain deep-linkability.

### Type-Safe Forms with Zod

ALL forms use React Hook Form + Zod validation:

```typescript
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  status: z.enum(LeadStatus),
});

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    /* ... */
  },
});
```

Use `Controller` from react-hook-form for all inputs to wire validation. See [AddNewLead.tsx](../src/leads/components/AddNewLead.tsx#L104-L120) for reference.

### Domain-Driven Organization

Business logic lives in `src/leads/domain/`:

- `lead.interfact.ts` - Lead interface
- `lead-status.type.ts` - Status enum with const assertion
- `lead-status-constants.ts` - Kanban column config (name, color)
- `activity.interface.ts` - Activity model

**Components should import from domain**, not define their own types inline.

## Component Library: shadcn/ui

UI components in `src/components/ui/` are from shadcn/ui (Radix UI + Tailwind). To add new components:

```bash
pnpm dlx shadcn@latest add [component-name]
```

This auto-installs to correct paths per [components.json](../components.json#L10-L11). **Never manually create UI components**—always use shadcn CLI.

### Custom Kanban Component

[src/components/ui/shadcn-io/kanban/index.tsx](../src/components/ui/shadcn-io/kanban/index.tsx) is a custom dnd-kit wrapper. Usage:

```tsx
<KanbanProvider columns={columns} data={items} onDataChange={setItems}>
  {(column) => (
    <KanbanBoard id={column.id}>
      <KanbanHeader>{column.name}</KanbanHeader>
      <KanbanCards>
        {items
          .filter((item) => item.column === column.id)
          .map((item) => (
            <KanbanCard id={item.id} key={item.id}>
              {/* card content */}
            </KanbanCard>
          ))}
      </KanbanCards>
    </KanbanBoard>
  )}
</KanbanProvider>
```

`onDataChange` receives updated array when cards are dragged. See [KanbanPage.tsx](../src/leads/pages/KanbanPage.tsx#L34-L38) for full example.

## Routing & Navigation

React Router 7 config in [src/router/app.router.tsx](../src/router/app.router.tsx). Layout pattern:

```
/leads (LeadsLayout with nav tabs)
  ├── / (HomePage - table view)
  ├── /kanban (KanbanPage)
  ├── /activity (ActivityPage)
  └── /:leadId (LeadPage - detail view)
```

**Navigation tabs** are in [LeadsLayout.tsx](../src/leads/layouts/LeadsLayout.tsx) using `NavigationMenu` from shadcn/ui.

## Development Workflow

### Running the App

```bash
pnpm install  # First time setup
pnpm dev      # Start dev server (localhost:5173)
pnpm build    # Type check + production build
pnpm preview  # Preview production build locally
```

**No backend required** - all data in localStorage. To reset data, clear browser localStorage.

### Common Tasks

**Add a new lead field**:

1. Update `Lead` interface in [lead.interfact.ts](../src/leads/domain/lead.interfact.ts)
2. Add Zod validation in [AddNewLead.tsx](../src/leads/components/AddNewLead.tsx#L32-L38)
3. Add form field with `Controller` in same file
4. Update table columns in [HomePage.tsx](../src/leads/pages/home/HomePage.tsx)

**Add a new status**:

1. Add enum value in [lead-status.type.ts](../src/leads/domain/lead-status.type.ts#L2-L8)
2. Add column config in `lead-status-constants.ts`
3. Kanban will auto-render the new column

## Code Style & Conventions

- **Import aliases**: Use `@/` prefix ([tsconfig paths](../tsconfig.json) configured)
- **Date handling**: Use `dayjs` via [lib/date.utils.ts](../src/lib/date.utils.ts) helpers
- **Icons**: Always use `lucide-react`, named imports like `import { LucidePlus } from "lucide-react"`
- **Styling**: Tailwind utility classes, no CSS modules. Use `cn()` from [lib/utils.ts](../src/lib/utils.ts) for conditional classes
- **React 19**: Use `use()` hook for context, not `useContext`

```typescript
// ✅ React 19 pattern
const { leads } = use(LeadsContext);

// ❌ Old pattern - don't use
const { leads } = useContext(LeadsContext);
```

## Important Constraints

- **No authentication**: No login/users concept yet
- **No backend**: Pure localStorage, no API calls
- **Activity system is WIP**: Types exist in domain but persistence/UI incomplete
- **No tests yet**: Test setup pending

## Common Pitfalls

1. **Form validation not showing**: Ensure using `Controller` with `fieldState.error` rendering
2. **Drag-and-drop breaks**: Kanban requires `column` field on each item to match `columns[].id`
3. **Type errors on Lead**: Remember `Lead` extends `Record<string, unknown>` for kanban compatibility
4. **localStorage not updating**: State mutations must trigger reducer dispatch or Context won't detect changes

## Questions to Clarify Before Implementing

- **New features**: Check README.md "Out of Scope" section - auth, backend, integrations are explicitly excluded
- **Activity features**: Activity types defined but persistence/UI incomplete - ask user for requirements
- **Design system**: Stick to shadcn/ui components - don't create custom UI from scratch
