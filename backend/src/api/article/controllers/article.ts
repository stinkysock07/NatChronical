/**
 * article controller
 */

import { factories } from '@strapi/strapi';
import sharp from 'sharp';

export default factories.createCoreController(
  'api::article.article',
  ({ strapi }) => ({
    async find(ctx) {
  return super.find(ctx);
},

    async findOne(ctx) {
      const { document } = ctx.params;
      const { query } = ctx;
      const { data, meta } = await strapi
        .service('api::article.article')
        .findOne(document, query);
      return { data, meta };
    },

    async create(ctx) {
      try {
        const processedData = await strapi
          .service('api::article.article')
          .createWithImage(
            ctx.request.body.data || ctx.request.body,
            ctx.request.body,
            ctx.request.files?.image,
          );
        return { data: processedData };
      } catch (error) {
        console.error('Error creating article:', error);
        ctx.throw(500, 'An error occurred while creating the article');
      }
    },

    async update(ctx) {
      const data = await strapi
        .service('api::article.article')
        .createWithImage(
            ctx.request.body.data || ctx.request.body,
            ctx.request.body,
            ctx.request.files?.image,
            ).update(ctx.params.document, ctx.request.body);
      return { data };
    },
  }),
);
