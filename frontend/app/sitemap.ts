import { fetchArticles } from "@/lib/data";
import { MetadataRoute } from 'next'

const staticRoutes: MetadataRoute.Sitemap = [
    {
        url: 'https://www.nationalchronicle.com/',
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0,
    },
    {
        url: 'https://www.nationalchronicle.com/about',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    {
        url: 'https://www.nationalchronicle.com/privacy',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    {
        url: 'https://www.nationalchronicle.com/terms',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    {
        url: 'https://www.nationalchronicle.com/tip',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
    }
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const articles = await fetchArticles();
    const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `https://www.nationalchronicle.com/${article.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.8,
    }));

    return [
        ...staticRoutes, ...articleUrls
    ]
};
