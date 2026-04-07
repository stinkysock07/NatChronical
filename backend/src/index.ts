import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.server.routes([
      {
        method: 'GET',
        path: '/api/tweets',
        handler: async (ctx: any) => {
          try {
            // Validate API token
            const authHeader = ctx.request.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
              ctx.status = 401;
              ctx.body = { error: 'Missing or invalid credentials' };
              return;
            }

            const token = authHeader.replace('Bearer ', '').trim();
            const validToken = process.env.TWEETS_API_KEY?.trim();

            console.log('Token received length:', token.length);
            console.log('Token expected length:', validToken?.length);
            if (!validToken || token !== validToken) {
              ctx.status = 401;
              ctx.body = { error: 'Missing or invalid credentials' };
              return;
            }

            const response = await strapi.service('api::tweets.tweets').getTweets();
            ctx.body = { data: response.data };
          } catch (error: any) {
            console.error('Tweets error:', error);
            ctx.status = 500;
            ctx.body = { error: error.message };
          }
        },
        config: { auth: false }
      }
    ]);
  },
};