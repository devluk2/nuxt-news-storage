# Nuxt news storage

### App for listing latest news from newsdata.io API and storing user actions into the immudb Vault

## Documentation

- Nuxt docs - https://nuxt.com/docs/getting-started/introduction
- Newsdata.io API docs - https://newsdata.io/documentation
- immudb Vault API docs - https://vault.immudb.io/docs/api/v1

## Setup

### 1. Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### 2. ".env"
This step is optional, but recommended in order to retrieve and store data in immudb Vault. Without .env, the application will still work with dummy data (for demonstration purposes). 
```
Rename .env.example to .env and fill in the Newsdata and Immudb URL/API keys.
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
