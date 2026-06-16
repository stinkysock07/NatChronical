import type { Schema, Struct } from '@strapi/strapi';

export interface ArticleBodyImage extends Struct.ComponentSchema {
  collectionName: 'components_article_body_images';
  info: {
    displayName: 'Body Image';
    icon: 'picture';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'article.body-image': ArticleBodyImage;
    }
  }
}
