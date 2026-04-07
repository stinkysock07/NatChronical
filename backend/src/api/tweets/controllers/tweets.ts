export default {
  async list(ctx) {
    const response = await strapi.service('api::tweets.tweets').getTweets();
    ctx.body = { data: response.data };
  }
};