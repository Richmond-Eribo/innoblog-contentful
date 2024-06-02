// const POST_GRAPHQL_FIELDS = `
// slug
// title
// coverImage {
//   url
// }
// date
// author {
//   name
//   picture {
//     url
//   }
// }
// excerpt
// content {
//   json
//   links {
//     assets {
//       block {
//         sys {
//           id
//         }
//         url
//         description
//       }
//     }
//   }
// }
// `

const POST_GRAPHQL_FIELDS = `
sys {
  id
  publishedAt
}
title
thumbnail {
  fileName
  url
}
author {
  name
}
slug
categories
excerpt
body {
  json
 
}
`;

async function fetchGraphQL(query) {
  console.log(process.env.CONTENTFUL_ACCESS_TOKEN, "hhi");
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  )
    .then(response => response.json())
    .catch(error => {
      // notFound()
      throw error;
    });
}

function extractPost(fetchResponse) {
  return fetchResponse?.data?.newsCollection?.items?.[0];
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.newsCollection?.items;
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      newsCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractPost(entry);
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      newsCollection(where: { slug_exists: true }) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return extractPostEntries(entries);
}

export async function getAllPostsForHome() {
  const entries = await fetchGraphQL(
    `query {
      newsCollection {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  );

  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      newsCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
      newsCollection(where: { slug_not_in: "${slug}" }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}
