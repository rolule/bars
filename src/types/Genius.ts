export interface GeniusResponse {
  meta: {
    status: number
  }

  response: Record<string, unknown>
}

export interface GeniusMultiSearchResponse {
  meta: {
    status: number
  }

  response: {
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

// Artist
export interface GeniusSearchArtistResponse {
  meta: {
    status: number
  }

  response: {
    next_page?: number
    sections: GeniusSearchArtistSection[]
  }
}

type GeniusSearchArtistSection = {
  type: 'artist'
  hits: GeniusSearchArtistSectionHit[]
}

type GeniusSearchArtistSectionHit = {
  highlights: unknown[]
  index: 'artist'
  type: 'artist'
  result: Artist
}

// Album
export interface GeniusSearchAlbumResponse {
  meta: {
    status: number
  }

  response: {
    next_page?: number
    sections: GeniusSearchAlbumSection[]
  }
}

type GeniusSearchAlbumSection = {
  type: 'album'
  hits: GeniusSearchAlbumSectionHit[]
}

type GeniusSearchAlbumSectionHit = {
  highlights: unknown[]
  index: 'album'
  type: 'album'
  result: GeniusSearchAlbumSectionHitResult
}

export type GeniusSearchAlbumSectionHitResult = {
  id: number
  api_path: string
  name: string
  url: string
  _type: 'album'

  cover_art_thumbnail_url: string
  cover_art_url: string
  full_title: string
  name_with_artist: string
  release_date_components: {
    year: number
    month: number
    day: number
  }
  artist: Artist
}

export interface GeniusAlbumResponse {
  meta: {
    status: number
  }

  response: {
    album: Album
  }
}

type Album = {
  _type: 'album'
  api_path: string
  comment_count: number
  cover_art_thumbnail_url: string
  cover_art_url: string
  custom_header_image_url: string
  description_preview: string
  full_title: string
  header_image_url: string
  id: number
  lock_state: string
  name: string
  name_with_artist: string
  pyongs_count: number
  release_date: string
  release_date_components: {
    year: number
    month: number
    day: number
  }
  tracking_paths: {
    aggregate: string
    concurrent: string
  }
  url: string
  current_user_metadata: {
    permissions: string[]
    excluded_permissions: string[]
    iq_on_object: unknown
    interactions: {
      pyong: boolean
    }
  }
  song_pageviews: number
  artist: Artist
  cover_arts: CoverArt[]
  description_annotation: {
    _type: 'referent'
    annotator_id: number
    annotator_login: string
    api_path: string
    classification: string
    fragment: string
    id: number
    ios_app_url: string
    is_description: boolean
    is_image: boolean
    path: string
    range: {
      content: string
    }
    song_id: unknown
    url: string
    verified_annotator_ids: unknown[]
    current_user_metadata: {
      permissions: string[]
      excluded_permissions: string[]
      relationships: {
        pinned_role: unknown
      }
    }
    tracking_paths: {
      aggregate: string
      concurrent: string
    }
    twitter_share_message: string
    annotatable: {
      _type: 'album'
      api_path: string
      context: string
      id: number
      image_url: string
      link_title: string
      title: string
      type: string
      url: string
    }
    annotations: AlbumAnnotation[]
    performance_groups: PerformanceGroup[]
    song_performances: PerformanceGroup[]
  }
}

type CoverArt = {
  _type: 'cover_art'
  annotated: boolean
  api_path: string
  id: number
  image_url: string
  thumbnail_image_url: string
  url: string
  current_user_metadata: {
    permissions: string[]
    excluded_permissions: string[]
  }
}

type AlbumAnnotation = {
  _type: 'annotation'
  api_path: string
  being_created: boolean
  body: unknown
  comment_count: number
  community: boolean
  created_at: number
  custom_preview: unknown
  deleted: boolean
  embed_content: string
  has_voters: boolean
  id: number
  needs_exegesis: boolean
  pinned: boolean
  proposed_edit_count: number
  pyongs_count: number
  referent_id: number
  share_url: string
  source: unknown
  state: string
  twitter_share_message: string
  url: string
  verified: boolean
  votes_total: number
  current_user_metadata: {
    permissions: string[]
    excluded_permissions: string[]
    interactions: {
      cosign: boolean
      pyong: boolean
      vote: unknown
    }
    iq_by_action: {
      accept: {
        primary: {
          multiplier: number
          base: number
          applicable: boolean
        }
      }
      reject: {
        primary: {
          multiplier: number
          base: number
          applicable: boolean
        }
      }
      delete: {
        primary: {
          multiplier: number
          base: number
          applicable: boolean
        }
      }
    }
  }
  accepted_by: User
  authors: UserAttribution[]
  cosigned_by: unknown[]
  created_by: User
  rejection_comment: unknown
  top_comment: unknown
  verified_by: unknown
}

type User = {
  _type: 'user'
  about_me_summary: string
  api_path: string
  avatar: {
    tiny: {
      url: string
      bounding_box: {
        width: number
        height: number
      }
    }
    thumb: {
      url: string
      bounding_box: {
        width: number
        height: number
      }
    }
    small: {
      url: string
      bounding_box: {
        width: number
        height: number
      }
    }
    medium: {
      url: string
      bounding_box: {
        width: number
        height: number
      }
    }
  }
  header_image_url: string
  human_readable_role_for_display: string
  id: number
  iq: number
  is_meme_verified: boolean
  is_verified: boolean
  login: string
  name: string
  role_for_display: string
  url: string
  current_user_metadata: {
    permissions: string[]
    excluded_permissions: []
    interactions: {
      following: boolean
    }
  }
}

type UserAttribution = {
  _type: 'user_attribution'
  attribution: number
  pinned_role: unknown
  user: User
}

type PerformanceGroup = {
  label: string
  artists: Artist[]
}

type Artist = {
  _type: 'artist'
  api_path: string
  header_image_url: string
  id: number
  image_url: string
  index_character: string
  is_meme_verified: boolean
  is_verified: boolean
  name: string
  slug: string
  url: string
}

// Album Page
export interface AlbumPage {
  meta: { status: number }

  response: {
    page_data: {
      chartbeat: {
        authors: string
        sections: string
        title: string
      }
      controller_and_action: string
      dmp_data_layer: {
        page: {
          type: 'album'
          title: string
          album_ids: string
          artist: string
          artist_ids: string
          genre: string
          genre_ids: string
          album_in_top_10: boolean
        }
      }
      header_bid_placements: []
      initial_ad_units: string[]
      page_type: 'album'
      path: string
      title: string
      tracking_data: [
        {
          key: string
          value: number
        },
      ]
      dfp_kv: [
        {
          name: string
          values: string[]
        },
        {
          name: string
          values: string[]
        },
        {
          name: string
          values: string[]
        },
        {
          name: string
          values: string[]
        },
        {
          name: string
          values: string[]
        },
        {
          name: string
          values: string[]
        },
        {
          name: string
          values: string[]
        },
        {
          name: string
          values: string[]
        },
        {
          name: string
          values: string[]
        },
      ]
      pending_question_count: number
      show_featured_question: boolean
      album: Album
      album_appearances: AlbumAppearance[]
      featured_question: unknown
      other_albums_by_artist: Album[]
      pinned_questions: Question[]
      related_articles: unknown[]
    }
  }
}

type AlbumAppearance = {
  _type: 'album_appearance'
  id: number
  track_number: number | null
  song: Song
}

type Song = {
  _type: 'song'
  annotation_count: number
  api_path: string
  description_preview: string
  full_title: string
  has_verified_artists: boolean
  header_image_thumbnail_url: string
  header_image_url: string
  id: number
  instrumental: boolean
  lyrics_owner_id: number
  lyrics_state: string
  lyrics_updated_at: number
  path: string
  pyongs_count: number
  release_date_components: {
    year: number
    month: number
    day: number
  }
  song_art_image_thumbnail_url: string
  song_art_image_url: string
  stats: {
    unreviewed_annotations: number
    hot: boolean
    pageviews: number
  }
  title: string
  title_with_featured: string
  updated_by_human_at: number
  url: string
  current_user_metadata: {
    permissions: string[]
    excluded_permissions: string[]
    iq_by_action: {
      edit_metadata: {
        primary: {
          multiplier: number
          base: number
          applicable: boolean
        }
      }
    }
  }
  featured_artists: []
  primary_artist: Artist
  producer_artists: Artist[]
  writer_artists: Artist[]
}

type Question = {
  _type: 'question'
  body: string
  contributors_count: number
  created_at: number
  default_key: unknown
  has_voters: boolean
  id: number
  pin_order: number
  state: string
  url: string
  votes_total: number
  current_user_metadata: {
    permissions: string[]
    excluded_permissions: string[]
    iq_by_action: {
      answer: {
        primary: {
          multiplier: number
          base: number
          applicable: boolean
        }
        pin: {
          multiplier: number
          base: number
          applicable: boolean
        }
      }
      archive: {
        primary: {
          multiplier: number
          base: number
          applicable: boolean
        }
      }
    }
    interactions: {
      vote: unknown
    }
  }
  answer: Answer
  author: User
}

type Answer = {
  _type: 'answer'
  body: {
    html: string
    markdown: string
  }
  created_at: number
  editorial_state: string
  has_voters: boolean
  id: number
  votes_total: number
  current_user_metadata: {
    permissions: string
    excluded_permissions: string
    interactions: {
      vote: unknown
    }
  }
  answer_source: unknown
  authors: UserAttribution[]
}
