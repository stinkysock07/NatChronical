import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  url: '/admin',
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', false),
    promoteEE: env.bool('FLAG_PROMOTE_EE', false),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('FRONTEND_URL'), 'http://localhost:3000'],
      handler: async (...args: any[]) => {
        const { documentId } = args[1];
        return `${env('FRONTEND_URL')}/preview?documentId=${documentId}`;
      },
    },
  }
});

export default config;
