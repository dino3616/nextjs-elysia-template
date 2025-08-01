# Next.js + Elysia.js Template

A modern API template combining Next.js App Router with Elysia.js for high-performance backend APIs.

## Features

- 🚀 **Next.js 15** with App Router
- ⚡ **Elysia.js** - Fast and lightweight web framework
- 🛡️ **Eden Treaty** - Type-safe API client with end-to-end type safety
- 📊 **Swagger Documentation** - Auto-generated API docs
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📝 **TypeScript** - Full type safety
- 🔥 **Hot Reload** - Fast development experience
- 🧪 **API Testing UI** - Built-in API testing interface

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-elysia-template
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Routes

The template includes several example API endpoints:

- `GET /api/hello` - Simple greeting endpoint
- `GET /api/health` - Health check with uptime
- `POST /api/echo` - Echo endpoint for testing POST requests
- `GET /api/swagger` - Interactive API documentation

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── [...elysia]/
│   │       └── route.ts          # Main API route handler
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Home page with API testing UI
├── lib/
│   ├── api.ts                    # Eden Treaty client setup
│   └── elysia.ts                 # Elysia.js app configuration
└── ...
```

## How it Works

This template uses Next.js App Router's catch-all routes (`[...elysia]`) to handle all API requests through Elysia.js. The setup allows you to:

1. Define all your API routes in `src/lib/elysia.ts`
2. Leverage Elysia.js's performance and features
3. Generate automatic API documentation with Swagger
4. Use Eden Treaty for type-safe API calls from the frontend
5. Maintain Next.js's development experience with full type safety

## Adding New API Routes

To add new API routes, edit `src/lib/elysia.ts`:

```typescript
const app = new Elysia({ prefix: '/api' })
  .use(swagger())
  // Add your routes here
  .get('/users', () => ({ users: [] }))
  .post('/users', ({ body }) => ({ created: body }), {
    body: t.Object({
      name: t.String(),
      email: t.String()
    })
  })

export type App = typeof app
export const createElysiaApp = () => app
```

Then use them in your frontend with full type safety:

```typescript
import { api } from '@/lib/api'

// GET request
const { data, error } = await api.api.users.get()

// POST request with type-safe body
const { data, error } = await api.api.users.post({
  name: 'John Doe',
  email: 'john@example.com'
})
```

## API Documentation

Visit [http://localhost:3000/api/swagger](http://localhost:3000/api/swagger) to view the interactive API documentation powered by Swagger.

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with zero configuration

### Other Platforms

This template works on any platform that supports Node.js:

- Netlify
- Railway
- Render
- AWS
- Google Cloud Platform

## Learn More

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### Elysia.js
- [Elysia.js Documentation](https://elysiajs.com)
- [Elysia.js GitHub](https://github.com/elysiajs/elysia)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.