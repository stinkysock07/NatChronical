FROM node:24-alpine

# Adding more specific build dependencies for better-sqlite3
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev \
    pixman-dev

WORKDIR /opt/app

COPY package.json package-lock.json ./

# Clear npm cache and use npm ci instead of npm install
RUN npm cache clean --force && npm install

COPY . .

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "dev-docker"]