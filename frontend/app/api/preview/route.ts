export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const documentId = searchParams.get('documentId');

  if (!documentId) {
    return new Response(JSON.stringify({ error: 'Missing documentId' }), {
      status: 400,
    });
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

    const response = await fetch(
      `${apiUrl}/api/articles-preview/${documentId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} - ${JSON.stringify(data)}`,
      );
    }

    return new Response(JSON.stringify(data.data), { status: 200 });
  } catch (error: any) {
    console.error('Preview API error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
