export default {
  routes: [
    {
      method: 'POST',
      path: '/newsletter-subscribers/verify',
      handler: 'newsletter-subscriber.verify',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};