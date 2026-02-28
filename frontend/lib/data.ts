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

      return {
        id: item.id,
        Title: item?.Title,
        Genre: item?.Genre,
        Author: item?.Author,
        Date_pub: item?.Date_pub,
        slug: item?.slug,
        Content: item?.Content,
        Featured: item?.Featured,
        picture: item?.picture?.data?.attributes?.url
          ? `${STRAPI_URL}${item?.picture.data.attributes.url}`
          : undefined,
      };
    });
  } catch (e) {
    console.error(e);
    return [];
  }
}
