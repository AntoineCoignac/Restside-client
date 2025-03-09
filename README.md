This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

/restaurant-orders-webhook
docker run -d -p 5353:5353 --add-host=host.docker.internal:host-gateway --name restaurant-orders-webhook restaurant-orders-webhook

/restside_notification
docker run -p 5173:5173 restside_notification:latest

/restside-client
yarn dev