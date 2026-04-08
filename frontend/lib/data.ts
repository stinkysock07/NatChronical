export interface Article {
  id: number;
  Title: string;
  Genre: string;
  Author: string;
  Date_pub: string;
  slug: string;
  Content: any[];
  Featured: Boolean;
  picture?: string;
  Type: string;
}

export interface Tip {
  id: string;
  name?: string;
  contact_email?: string;
  subject: string;
  tip_description: string;
  createdAt: string;
}

export interface Tweet {
  id: string;
  tweet_id: string;
  text: string;
  created_at: string;
  url?: string | null;
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://ncn-backend.up.railway.app';

export async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`, {
      cache: 'no-store', // Prevents the browser from caching an empty result
    });

    if (!response.ok) throw new Error('Failed to fetch articles from backend');

    const { data } = await response.json();

    if (!data || !Array.isArray(data)) return [];

    return data.map((item: any) => {
      return {
        id: item.id,
        Title: item.Title || 'Untitled',
        Genre: item.Genre || 'Untitled',
        Author: item.Author,
        Date_pub: item.Date_pub,
        slug: item.slug,
        Content: item.Content,
        Featured: item.Featured,
        picture: item.picture?.url
          ? item.picture.url.startsWith('http')
            ? item.picture.url
            : `${STRAPI_URL}${item.picture.url}`
          : undefined,
        Type: item.Type,
      };
    });
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function postTip(tipData: Omit<Tip, 'id' | 'date'>) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/tips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          // Map frontend names -> Strapi names
          Name: tipData.name,
          Email:
            tipData.contact_email === 'Anonymous'
              ? undefined
              : tipData.contact_email,
          subject: tipData.subject,
          Tip_Description: tipData.tip_description,
          date: new Date().toISOString(),
        },
      }),
    });
    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Strapi error body:', errorBody);
      throw new Error('Failed to post tip to backend');
    }

    const { data } = await response.json();

    return {
      id: data.id,
      ...data.attributes,
    };
  } catch (e) {
    console.error('Network error:', e);
    throw e;
  }
}

export const fetchTweets = async () => {
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_API_URL || 'https://ncn-backend.up.railway.app';
  const apiToken = process.env.NEXT_PUBLIC_TWEETS_API_KEY;

  try {
    const response = await fetch(`${STRAPI_URL}/api/tweets`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Tweets fetch failed:', response.status, error);
      return [];
    }

    const json = await response.json();
    const { data } = json;

    if (!data || !Array.isArray(data)) {
      return [];
    }

    if (!data || !Array.isArray(data)) return [];

    return data.map((item: any) => {
      const urlMatch = item.text.match(/https?:\/\/\S+/g, '');
      return {
        tweet_id: item.id,
        text: item.text.replace(/https?:\/\/\S+/g, '').trim(),
        url: urlMatch ? urlMatch[0] : null,
        created_at: item.created_at,
      };
    });
  } catch (e) {
    console.error('Network error:', e);
    return [];
  }
};
