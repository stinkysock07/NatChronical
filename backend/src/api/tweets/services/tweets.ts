export default ({ strapi }: { strapi: any }) => ({
  async getTweets() {
    const token = process.env.X_BEARERS_TOKEN;

    const response = await fetch(
      `https://api.twitter.com/2/users/2025749547511676928/tweets?tweet.fields=created_at&max_results=5`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch tweets: ${response.statusText}`);
    }
    return await response.json();
  },
});
