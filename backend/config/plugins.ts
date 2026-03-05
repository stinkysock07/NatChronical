import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: 'auto',
          bucket: process.env.CF_BUCKET_NAME,
          endpoint: process.env.CF_R2_ENDPOINT,
          signatureVersion: 's3v4',
          s3ForcePathStyle: true,
        },
        params: {
          Bucket: process.env.CF_BUCKET_NAME,
        },
      },
        actionOptions: {
            upload: {
                withFiles: true,
            },
        },
    },
  },
});

export default config;