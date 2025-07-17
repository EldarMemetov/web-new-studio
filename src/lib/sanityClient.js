// src/lib/sanityClient.js

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '79cqv88x',
  dataset: 'production',
  apiVersion: '2023-05-19',
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export function urlFor(source) {
  return builder.image(source);
}
