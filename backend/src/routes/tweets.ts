export default [
    {
        method: 'GET',
        path: '/api/tweets',
        handler: async (ctx: { body: { data?: any; error?: any; }; status: number; }) => {
            try {
                const response = await strapi.service('api::tweets.tweets').getTweets();
                ctx.body = { data: response.data };
            } catch (error) {
                console.error('Tweets error:', error);
                ctx.status = 500;
                ctx.body = { error: error.message };
            }
        },
        config: { auth: false }
    }
];