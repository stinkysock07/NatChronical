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
