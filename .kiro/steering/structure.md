# Project Structure

## Root Directory Organization

```
/
├── .kiro/                    # Spec-driven development files
│   └── steering/            # Project steering documents
├── src/                     # Main source code
│   ├── app/                # Next.js App Router
│   └── db/                 # Database layer
├── drizzle/                # Database migrations (generated)
├── node_modules/           # Dependencies
├── .next/                  # Next.js build output
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration
├── drizzle.config.ts      # Drizzle ORM configuration
├── biome.json             # Code quality configuration
└── CLAUDE.md              # AI assistant instructions
```

## Source Code Structure (`src/`)

### App Directory (`src/app/`)

Next.js 15 App Routerベースの構成

```
src/app/
├── layout.tsx             # Root layout component
├── page.tsx              # Homepage component
├── globals.css           # Global styles (TailwindCSS)
└── api/                  # API Routes
    └── [...elysia]/       # Catch-all route for Elysia.js
        └── route.ts       # API handler integration
```

### Database Layer (`src/db/`)

Drizzle ORMベースのデータベース抽象化

```
src/db/
├── index.ts              # Database connection configuration
└── schema.ts             # Database schema definitions
```

## Code Organization Patterns

### API Integration Pattern

- **Catch-all Route**: `[...elysia]/route.ts` でElysia.jsアプリを統合
- **Method Export**: GET, POSTメソッドを個別にエクスポート
- **Prefix Configuration**: `/api` プレフィックスでAPI名前空間を分離

### Database Pattern

- **Schema Definition**: `schema.ts` で型安全なテーブル定義
- **Type Inference**: Drizzleの型推論を活用した型生成
- **Connection Management**: 環境変数ベースの接続管理

### Component Organization

- **Layout Hierarchy**: Root layoutで共通レイアウト定義
- **Page Components**: 各ルートに対応するページコンポーネント
- **Global Styles**: TailwindCSSによる一元化されたスタイル管理

## File Naming Conventions

### TypeScript Files

- **Components**: PascalCase (`Layout.tsx`, `HomePage.tsx`)
- **API Routes**: kebab-case (`route.ts`)
- **Utilities**: camelCase (`database.ts`, `apiUtils.ts`)
- **Configuration**: kebab-case (`drizzle.config.ts`)

### Directory Naming

- **App Router**: Next.js conventions（`app/`, `api/`）
- **Custom Directories**: camelCase (`db/`, `components/` if added)
- **Generated Directories**: lowercase（`drizzle/`, `.next/`）

## Import Organization

### Path Mapping

```typescript
// tsconfig.json configuration
"paths": {
  "@/*": ["./src/*"]
}
```

### Import Patterns

```typescript
// External dependencies first
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

// Internal imports with @ alias
import { db } from '@/db';
import { users } from '@/db/schema';
```

### Import Hierarchy

1. **Framework imports**: React, Next.js core
2. **Third-party libraries**: Elysia, Drizzle, etc.
3. **Internal modules**: Database, utilities
4. **Types**: Type-only imports last

## Key Architectural Principles

### Separation of Concerns

- **Frontend**: React components and Next.js pages
- **API Layer**: Elysia.js handlers and middleware
- **Data Layer**: Drizzle ORM schema and queries
- **Configuration**: Separate config files for each tool

### Type Safety

- **End-to-End Types**: Database schema → API → Frontend
- **Type Inference**: Drizzle automatic type generation
- **Strict TypeScript**: ES2017 target with strict checks

### Development Experience

- **Hot Reload**: All layers support development reloading
- **Path Aliases**: Simplified import paths with `@/` prefix
- **Tool Integration**: Unified toolchain with Biome

### Scalability Patterns

- **Modular Database**: Schema expansion in `src/db/schema.ts`
- **API Extensions**: Additional endpoints in Elysia app
- **Component Structure**: Ready for component library addition
- **Environment Configuration**: Extensible environment variable system

## Extension Points

### Adding New Features

1. **Database Changes**: Update `src/db/schema.ts`
2. **API Endpoints**: Extend Elysia app in `route.ts`
3. **Frontend Pages**: Add to `src/app/` directory
4. **Shared Logic**: Create utilities in `src/lib/` (when needed)

### Recommended Additions

- `src/lib/`: Shared utilities and helpers
- `src/components/`: Reusable UI components
- `src/types/`: Global type definitions
- `src/hooks/`: Custom React hooks
