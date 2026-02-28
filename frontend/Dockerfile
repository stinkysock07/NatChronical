FROM node:24-bookworm-slim

# Debian uses apt-get instead of apk
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN npm install --build-from-source

COPY . .

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "dev-docker"]