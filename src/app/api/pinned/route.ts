import { NextResponse } from 'next/server';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

export async function GET() {
  const query = `
    query {
      viewer {
        login
        pinnedItems(first: 6, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              id
              name
              description
              stargazerCount
              url
              homepageUrl
              languages(first: 3) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GITHUB_GRAPHQL_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();

  return NextResponse.json(data.data.viewer.pinnedItems.nodes);
}
