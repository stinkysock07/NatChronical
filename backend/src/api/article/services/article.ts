/**
 * article service
 */

import { factories } from '@strapi/strapi';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

export default factories.createCoreService(
  'api::article.article',
  ({ strapi }) => ({
    async createWithImage(data, body, image) {
      try {
        console.log('Creating article with data:', data);

        let result = await strapi
          .service('api::article.article')
          .create({ data });

        console.log('Article created with ID:', result.id);

        if (!image) {
          return result;
        }

        console.log('Processing image:', image);

        const processedImage = await sharp(image.path)
          .resize(800, 600, { fit: 'cover' })
          .webp({ quality: 80 })
          .toBuffer();

        console.log('Image processed successfully');
        const processedFile = {
          ...image,
          buffer: processedImage,
          mime: 'image/webp',
          name: image.name.split('.')[0] + '.webp',
        };

        console.log('Uploading image to Strapi');

        await strapi.plugins.upload.services.upload.upload({
          files: processedFile,
          data: {
            ref: 'api::article.article',
            refId: result.id,
            field: 'picture',
          },
        });

        console.log('Upload complete, fetching article with image');

        return await strapi
          .service('api::article.article')
          .findOne(result.id, { populate: ['picture'] });
      } catch (error) {
        console.error('Error in createWithImage:', error);
        throw error;
      }
    },
  }),
);
