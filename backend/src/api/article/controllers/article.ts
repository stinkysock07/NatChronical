/**
 * article controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::article.article',
  ({ strapi }) => ({
    async find(ctx) {
      return super.find(ctx);
    },

    async findOne(ctx) {
      const { id } = ctx.params;
      const { query } = ctx;
      const { data, meta } = await strapi
        .service('api::article.article')
        .findOne(id, query);
      return { data, meta };
    },

    async create(ctx) {
      try {
        const images =
          ctx.request.files?.picture ??
          ctx.request.files?.pictures ??
          ctx.request.files?.image;

        const processedData = await strapi
          .service('api::article.article')
          .createWithImages(ctx.request.body.data || ctx.request.body, images);
        return { data: processedData };
      } catch (error) {
        console.error('Error creating article:', error);
        ctx.throw(500, 'An error occurred while creating the article');
      }
    },

    async update(ctx) {
      try {
        const images =
          ctx.request.files?.picture ??
          ctx.request.files?.pictures ??
          ctx.request.files?.image;

        const data = await strapi
          .service('api::article.article')
          .updateWithImages(
            ctx.params.id,
            ctx.request.body.data || ctx.request.body,
            images,
          );

        return { data };
      } catch (error) {
        console.error('Error updating article:', error);
        ctx.throw(500, 'An error occurred while updating the article');
      }
    },
  }),
);
