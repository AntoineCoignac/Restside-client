FROM node:20-alpine

WORKDIR /app

COPY package*.json .
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY public ./public
COPY components.json ./components.json
COPY eslint.config.mjs ./eslint.config.mjs
COPY next.config.ts ./next.config.ts
COPY postcss.config.js ./postcss.config.js
COPY tailwind.config.js ./tailwind.config.js
COPY tsconfig.json ./tsconfig.json

RUN npm install

EXPOSE 7519

CMD ["npm", "run", "dev"]
