import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::newsletter-subscriber.newsletter-subscriber',
  ({ strapi }) => ({
    async verify(ctx) {
      try {
        const { token, email } = ctx.request.body;

        if (!token || !email) {
          return ctx.badRequest('Missing token or email');
        }

        // Find and update in a single operation (backend-only, no exposure)
        const subscriber = await strapi.db.query(
          'api::newsletter-subscriber.newsletter-subscriber'
        ).findOne({
          where: {
            email: email,
            verificationToken: token,
          },
        });

        if (!subscriber) {
          return ctx.notFound('Invalid verification link');
        }

        // Update the subscriber
        await strapi.db.query(
          'api::newsletter-subscriber.newsletter-subscriber'
        ).update({
          where: { id: subscriber.id },
          data: {
            subscription_status: true,
            verificationToken: null,
          },
        });

        return { success: true, message: 'Email verified' };
      } catch (error) {
        ctx.internalServerError('Verification failed');
      }
    },
  })
);