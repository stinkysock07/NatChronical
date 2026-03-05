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


ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ARG NEXT_PUBLIC_API_URL


ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL


RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]