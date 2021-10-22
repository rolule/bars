import {
  AlbumPage,
  GeniusAlbumResponse,
  GeniusSearchAlbumResponse,
} from '../../types/Genius'
import { genius, geniusSearch } from '../api'

export const searchAlbumsByName = async (
  name: string,
  token?: string,
  page?: number,
) => {
  const response = (
    (await geniusSearch(
      'album',
      name,
      token,
      page,
    )) as GeniusSearchAlbumResponse
  ).response

  const results = response.sections[0].hits.map(h => h.result)

  if (results.length === 0) {
    throw 'Zero results returned'
  }

  return results
}

export const getAlbumById = async (id: number, token: string) => {
  const {
    meta: { status },
    response: { album },
  } = (await genius(`albums/${id}`, token)) as GeniusAlbumResponse

  if (status !== 200) {
    throw 'Status not 200'
  }

  return album
}

export const getAlbumSongsById = async (id: number, token: string) => {
  const album = await getAlbumById(id, token)

  const pagePath = `page_data/album?page_path=${album.tracking_paths.concurrent.replace(
    /\//g,
    '%2F',
  )}`

  const {
    meta: { status },
    response: {
      page_data: { album_appearances: appearances },
    },
  } = (await genius(pagePath, token)) as AlbumPage

  if (status !== 200) {
    throw 'Status not 200'
  }

  const songs = appearances
    .filter(a => a.track_number !== null)
    .map(a => a.song)

  return songs
}
