export interface Article {
  id: number;
  Title: string;
  Genre: string;
  Author: string;
  Date_pub: string;
  slug: string;
  Content: string;
  Featured: Boolean;
  picture?: string;
}

export interface Tip {
  id: string;
  name?: string;
  contact_email?: string;
  description: string;
  date: string;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`);

    if (!response.ok) throw new Error('Failed to fetch articles from backend');

    const { data } = await response.json();

    if (!data || !Array.isArray(data)) return [];

    return data.map((item: any) => {

      const attrs = item.attributes

      return {
        id: item.id,
        Title: attrs?.Title,
        Genre: attrs?.Genre,
        Author: attrs?.Author,
        Date_pub: attrs?.Date_pub,
        slug: attrs?.slug,
        Content: attrs?.Content,
        Featured: attrs?.Featured,
        picture: attrs?.picture?.data?.attributes?.url
          ? `${STRAPI_URL}${attrs?.picture.data.attributes.url}`
          : undefined,
      };
    });
  } catch (e) {
    console.error(e);
    return [];
  }
}
