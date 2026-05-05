export default {
  async find(ctx) {
    const response = await strapi.service('api::tweets.tweets').getTweets();
    ctx.body = { data: response.data };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const response = await strapi.service('api::tweets.tweets').getTweets();
    const tweet = response.data.find((t: any) => t.id === id);
    ctx.body = { data: tweet || null };
  },
};
