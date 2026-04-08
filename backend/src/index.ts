import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.server.routes([
      {
        method: 'GET',
        path: '/api/articles-preview/:documentId',
        handler: async (ctx: any) => {
          try {
            const { documentId } = ctx.params;

           const article = await strapi.documents('api::article.article').findOne({ 
            documentId,
            populate: '*'
          });
            
            if (!article) {
              ctx.status = 404;
              ctx.body = { error: 'Article not found' };
              return;
            }
            
            ctx.body = { data: article };
          } catch (error: any) {
            console.error('Preview error:', error);
            ctx.status = 500;
            ctx.body = { error: error.message };
          }
        },
        config: { auth: false }
      },
      {
        method: 'GET',
        path: '/api/tweets',
        handler: async (ctx: any) => {
          try {
            const authHeader = ctx.request.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
              ctx.status = 401;
              ctx.body = { error: 'Missing or invalid credentials' };
              return;
            }

            const token = authHeader.replace('Bearer ', '').trim();
            const validToken = process.env.TWEETS_API_KEY?.trim();

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