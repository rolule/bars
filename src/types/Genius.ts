export interface GeniusResponse {
  metadata: {
    status: number
  }

  response: Record<string, unknown>
}

export interface GeniusMultiSearchResponse {
  metadata: {
    status: number
  }

  response: {
    sections: GeniusSearchArtistSection[]
  }
}

export interface GeniusSearchArtistResponse {
  metadata: {
    status: number
  }

  response: {
    next_page?: number
    sections: GeniusSearchArtistSection[]
  }
}

export type GeniusSearchResultType =
  | 'top_hit'
  | 'song'
  | 'lyric'
  | 'artist'
  | 'album'
  | 'video'
  | 'article'
  | 'user'

type GeniusSearchArtistSection = {
  type: 'artist'
  hits: GeniusSearchArtistSectionHit[]
}

type GeniusSearchArtistSectionHit = {
  highlights: unknown[]
  index: 'artist'
  type: 'artist'
  result: GeniusSearchArtistSectionHitResult
}

export type GeniusSearchArtistSectionHitResult = {
  api_path: string
  header_image_url: string
  id: number
  image_url: string
  index_character: string
  iq: number
  is_meme_verified: boolean
  is_verified: boolean
  name: string
  slug: string
  url: string
  _type: 'artist'
}
