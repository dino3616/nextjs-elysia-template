# 15分API作成フロー（超高速実装）

フロントエンドチームへの最速デリバリー。**15分で動くAPI提供**

## 超高速フロー（自動生成コマンド使用）

### 1. API生成（1分）
```bash
git checkout -b feature/{entity}-api

# 全ファイル自動生成
npm run generate-api {EntityName}
# 例: npm run generate-api User
```

### 2. ルート追加（2分）
```bash
# src/lib/elysia.ts に以下を追加:
import { {Entity}Controller } from '../backend/controllers/{entity}Controller'

.get('/{entity}', {Entity}Controller.getAll)
.get('/{entity}/:id', {Entity}Controller.getById)
.post('/{entity}', {Entity}Controller.create)
.put('/{entity}/:id', {Entity}Controller.update)
.delete('/{entity}/:id', {Entity}Controller.delete)
```

### 3. 動作確認（2分）
```bash
npm test
npm run dev

git add -A && git commit -m "feat: implement {entity} CRUD API"
git push -u origin feature/{entity}-api
```

## 生成コマンド

```bash
npm run generate-api User
npm run generate-api Product  
npm run generate-api Order
```

自動生成されるファイル:
- `src/backend/types/{entity}.ts`
- `src/backend/repositories/{entity}Repository.ts`  
- `src/backend/services/{entity}Service.ts`
- `src/backend/controllers/{entity}Controller.ts`
- `src/lib/{entity}-api-client.ts`

## 実装テンプレート

### 型定義（1分）
```typescript
export interface {Entity} {
  id: string
  // 必要なフィールドのみ
}
export interface Create{Entity}Request {
  // 全てオプショナル
}
```

### Repository（2分）
```typescript
class {Entity}Repository {
  private items = [/* サンプルデータ */]
  findAll() { return this.items }
  // 基本CRUD実装
}
```

### Service（1分）
```typescript  
class {Entity}Service {
  getAll() { return repository.findAll() }
  // Repository呼び出しのみ
}
```

### Controller（2分）
```typescript
export class {Entity}Controller {
  static getAll() { return service.getAll() }
  // Service呼び出しのみ
}
```

### ルート（1分）
```typescript
.get('/{entity}', Controller.getAll)
.post('/{entity}', Controller.create)
// 基本4つのエンドポイント
```

## 絶対ルール

- **バリデーション禁止** - 15分で終わらない
- **テスト最小限** - 動けばOK
- **エラーハンドリング最小限** - 500エラーでも許可
- **設計は後回し** - まず動かす

## 時間配分
- スキーマ: 5分
- 実装: 8分  
- 確認: 2分
- **合計: 15分**