import { fetchArticles } from "@/lib/data";
import { MetadataRoute } from 'next'

const staticRoutes: MetadataRoute.Sitemap = [
    {
        url: 'https://www.natchronicle.com/',
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0,
    },
    {
        url: 'https://www.natchronicle.com/about',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    {
        url: 'https://www.natchronicle.com/privacy',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    {
        url: 'https://www.natchronicle.com/terms',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    {
        url: 'https://www.natchronicle.com/tip',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
    }
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const articles = await fetchArticles();
    const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `https://www.natchronicle.com/${article.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.8,
    }));

    return [
        ...staticRoutes, ...articleUrls
    ]
};
