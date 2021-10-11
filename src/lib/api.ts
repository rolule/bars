import fetch, { RequestInit } from 'node-fetch'
import { GeniusResponse } from '../types/GeniusResponse'

export const genius = (path: string, init?: RequestInit) =>
  fetch(`https://api.genius.com/${path}`, {
    headers: {
      authorization: `Bearer ${process.env.CLIENT_ACCESS_TOKEN}`,
      ...init?.headers,
    },
    body: init?.body,
  }).then(r => r.json() as unknown as GeniusResponse)
