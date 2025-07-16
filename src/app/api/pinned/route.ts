import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Missing username' }, { status: 400 });
  }

  const graphqlQuery = {
    query: `
      query($login: String!) {
        user(login: $login) {
          pinnedItems(first: 6, types: [REPOSITORY]) {
            nodes {
              ... on Repository {
                id
                name
                description
                url
                homepageUrl
                stargazerCount
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
    `,
    variables: {
      login: username,
    },
  };

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphqlQuery),
  });

  const json = await res.json();
  const repos = json?.data?.user?.pinnedItems?.nodes ?? [];

  return NextResponse.json(repos);
}
