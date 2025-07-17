import { client } from '@/lib/sanityClient';
import { postsByCategoryQuery } from '@/lib/queries';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'web';

  const posts = await client.fetch(postsByCategoryQuery, { category });

  return new Response(JSON.stringify(posts), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
