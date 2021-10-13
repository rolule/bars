import { GeniusSearchResultType } from '@type/Genius'
import fetch from 'node-fetch'

export const genius = (path: string, token?: string) => {
  if (token === undefined) {
    throw 'Not logged in'
  }

  return fetch(`https://genius.com/api/${path}`, {
    headers: {
      cookie: `_rapgenius_session=${token}`,
    },
  }).then(r => r.json())
}

export const geniusSearch = (
  type: GeniusSearchResultType,
  q: string,
  token?: string,
  page?: string,
) => {
  const pageString = `${page ? page : 1}`
  return genius(`search/${type}?page=${pageString}&q=${q}`, token)
}

export const geniusMultiSearch = (q: string, token?: string) => {
  return genius(`search/multi?q=${q}`, token)
}
