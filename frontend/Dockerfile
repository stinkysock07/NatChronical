FROM node:24-bookworm-slim

# 1. Update the echo string to something totally new to BREAK CACHE
RUN echo "Forcing build with hardcoded keys: V2"

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install --build-from-source
COPY . .

# 2. Hardcode the keys directly into the environment for this build
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAACm9vGkE2dZHwoU7
ENV NEXT_PUBLIC_API_URL=https://ncn-backend.up.railway.app

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]