// config/plugins.ts
export default ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-cloudflare-r2',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
        endpoint: env('CF_R2_ENDPOINT'),
        params: {
          Bucket: env('CF_BUCKET_NAME'),
        },
        // This specific package uses this key name:
        cloudflarePublicProxy: env('R2_DEV_DOMAIN', 'https://pub-da902343a39f42e2b8a99078b67aa4b4.r2.dev'),
      },
    },
  },
});