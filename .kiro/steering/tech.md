# Technology Stack

## Architecture Overview

フロントエンドとバックエンドAPIが同一リポジトリに統合されたモノリス構成。Next.jsのApp Routerを使用してElysia.jsベースのAPIを統合し、単一のデプロイメントで完全なWebアプリケーションを提供。

## Frontend Stack

### Core Framework

- **Next.js 15.4.5**: React フレームワーク（App Router使用）
- **React 19.1.1**: UIライブラリ
- **TypeScript 5.9.2**: 型安全性とDX向上

### Styling

- **TailwindCSS 4.1.11**: ユーティリティファーストCSSフレームワーク
- **Vite Plugin**: `@tailwindcss/vite` による高速コンパイル

### Build & Development

- **Next.js Build System**: 最適化されたプロダクションビルド
- **Hot Reload**: 開発時の高速リロード機能

## Backend Stack

### API Framework

- **Elysia.js 1.3.8**: 高性能TypeScript APIフレームワーク
- **@elysiajs/cors 1.3.3**: CORS対応
- **@elysiajs/swagger 1.3.1**: 自動API文書生成

### Database

- **Drizzle ORM 0.44.4**: 型安全なSQL ORM
- **Vercel Postgres 0.10.0**: PostgreSQLデータベースプロバイダー
- **Drizzle Kit 0.31.4**: スキーマ管理・マイグレーションツール

## Development Environment

### Package Manager

- **Bun 1.2.19**: 高速パッケージマネージャー・ランタイム

### Code Quality

- **Biome 2.1.3**: リンティング・フォーマッティングツール
  - ESLint/Prettierの代替
  - 高速な実行速度
  - TypeScript対応

### TypeScript Configuration

- **@tsconfig/next 2.0.3**: Next.js最適化設定
- **Path Mapping**: `@/*` で `./src/*` へのエイリアス
- **Target**: ES2017

## Common Commands

### Development

```bash
bun dev          # 開発サーバー起動 (Next.js + API)
bun build        # プロダクションビルド
bun start        # プロダクションサーバー起動
```

### Code Quality

```bash
bun lint         # Biomeによるコードチェック
bun lint:fix     # 自動修正付きリンティング
bun format       # コードフォーマット
```

### Database

```bash
bun db:generate  # Drizzleスキーマ生成
bun db:migrate   # データベースマイグレーション
bun db:studio    # Drizzle Studio起動
bun db:push      # スキーマをデータベースにプッシュ
```

## Environment Variables

### Required Variables

- `POSTGRES_URL`: PostgreSQLデータベース接続URL

### Optional Variables

- Development環境固有の設定
- API設定オプション

## Port Configuration

### Development Ports

- **3000**: Next.js開発サーバー（フロントエンド + API）
- **Database**: Vercel Postgresクラウド接続

### API Endpoints

- **Base Path**: `/api/*`
- **Health Check**: `/api/health`
- **API Documentation**: `/api/swagger`

## Performance Considerations

### Build Optimization

- Next.js自動最適化
- Tree Shaking
- Code Splitting

### Runtime Performance  

- Elysia.js高速APIレスポンス
- Bunランタイムの高速実行
- PostgreSQL効率的クエリ

## Deployment Strategy

### Vercel Platform Optimization

- Next.js ネイティブサポート
- Edge Function対応
- 自動PostgreSQL統合
- ゼロコンフィグデプロイメント
