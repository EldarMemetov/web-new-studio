import groq from 'groq';

export const postsByCategoryQuery = groq`
  *[_type == "post" && category == $category]{
    _id,
    title,
    slug,
    body,
    mainImage,
    customId,
    author,       
    publishedAt
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && customId.current == $id][0]{
    _id,
    title,
    body,
    mainImage,
    customId,
    author,         
    publishedAt
  }
`;
