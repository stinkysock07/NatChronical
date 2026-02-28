FROM node:24-alpine

# Adding more specific build dependencies for better-sqlite3
RUN apk add --no-cache \
    build-base \
    gcc \
    g++ \
    make \
    python3 \
    vips-dev \
    fftw-dev \
    musl-dev \
    libstdc++

WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "dev-docker"]