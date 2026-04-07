import type { Core } from '@strapi/strapi';

export default {
    routes: [
        {
            method: 'GET',
            path: '/',
            handler: 'tweets.find',
        },
        {
            method: 'GET',
            path: '/:id',
            handler: 'tweets.findOne',
        },
    ],
} as unknown as Core.Route;
