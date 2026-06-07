/**
 * article service
 */

import { factories } from '@strapi/strapi';
import sharp from 'sharp';
import path from 'path';

export default factories.createCoreService(
  'api::article.article',
  ({ strapi }) => ({
    async attachImages(articleId, images) {
      const uploadedImages = Array.isArray(images) ? images : [images];

      const articleService = strapi.service('api::article.article');

      await Promise.all(
        uploadedImages
          .filter(Boolean)
          .map(async (image) => {
            const processedImage = await sharp(image.path)
              .resize(800, 600, { fit: 'cover' })
              .webp({ quality: 80 })
              .toBuffer();

            const processedFile = {
              ...image,
              buffer: processedImage,
              mime: 'image/webp',
              name: `${path.parse(image.name).name || 'image'}.webp`,
            };

            await strapi.plugins.upload.services.upload.upload({
              files: processedFile,
              data: {
                ref: 'api::article.article',
                refId: articleId,
                field: 'picture',
              },
            });
          }),
      );
    },

    async createWithImages(data, images) {
      try {
        console.log('Creating article with data:', data);

        const result = await strapi
          .service('api::article.article')
          .create({ data });

        console.log('Article created with ID:', result.id);

        const uploadedImages = Array.isArray(images)
          ? images
          : images
            ? [images]
            : [];

        if (!uploadedImages.length) {
          return result;
        }

        console.log('Uploading images to Strapi');

        await strapi
          .service('api::article.article')
          .attachImages(result.id, uploadedImages);

        console.log('Upload complete, fetching article with images');

        return await strapi
          .service('api::article.article')
          .findOne(result.id, { populate: ['picture'] });
      } catch (error) {
        console.error('Error in createWithImages:', error);
        throw error;
      }
    },

    async updateWithImages(id, data, images) {
      try {
        const result = await strapi
          .service('api::article.article')
          .update(id, { data });

        const uploadedImages = Array.isArray(images)
          ? images
          : images
            ? [images]
            : [];

        if (uploadedImages.length > 0) {
          await strapi
            .service('api::article.article')
            .attachImages(result.id, uploadedImages);
        }

        return await strapi
          .service('api::article.article')
          .findOne(result.id, { populate: ['picture'] });
      } catch (error) {
        console.error('Error in updateWithImages:', error);
        throw error;
      }
    },
  }),
);
