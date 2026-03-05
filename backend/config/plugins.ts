import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          accessKeyId: process.env.CF_EMAIL,
          secretAccessKey: process.env.CF_GLOBAL_API_KEY,
          region: 'auto',
          bucket: process.env.CF_BUCKET_NAME,
          endpoint: process.env.CF_R2_ENDPOINT,
        },
      },
      params: {
        Bucket: process.env.CF_BUCKET_NAME,
      },
    },
  },
});

export default config;