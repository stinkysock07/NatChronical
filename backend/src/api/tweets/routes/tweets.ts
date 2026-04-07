import type { Core } from '@strapi/strapi';

export default {
    routes: [
        {
            method: 'GET',
            path: '/',
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
        }
    ]
} as unknown as Core.Route;
