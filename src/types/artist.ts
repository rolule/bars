export interface Artist {
  id: number
  name: string

  alternate_names?: string[]
  api_path: string
  // description?: { dom: { tag: 'root', children: [Array] } },
  facebook_name?: string
  followers_count?: number
  header_image_url?: string
  image_url?: string
  instagram_name?: string
  is_meme_verified?: boolean
  is_verified?: boolean
  translation_artist?: boolean
  twitter_name?: string
  url?: string
  current_user_metadata?: {
    permissions?: string[]
    excluded_permissions?: string[]
    interactions?: { following?: boolean }
  }
  iq?: number
  description_annotation?: {
    _type?: string
    annotator_id?: number
    annotator_login?: string
    api_path?: string
    classification?: string
    fragment?: string
    id?: number
    is_description?: boolean
    path?: string
    range?: { content?: string }
    song_id?: number
    url?: string
    verified_annotator_ids?: number[]
    annotatable?: {
      api_path?: string
      context?: unknown
      id?: number
      image_url?: string
      link_title?: string
      title?: string
      type?: string
      url?: string
    }
    annotations: unknown[]
  }
  user?: {
    api_path?: string
    avatar?: {
      tiny?: unknown
      thumb?: unknown
      small?: unknown
      medium?: unknown
    }
    header_image_url?: string
    human_readable_role_for_display?: string
    id?: number
    iq?: number
    login?: string
    name?: string
    role_for_display?: string
    url?: string
    current_user_metadata?: {
      permissions?: unknown[]
      excluded_permissions?: unknown[]
      interactions?: unknown[]
    }
  }
}
