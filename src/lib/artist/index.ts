import { genius } from '@lib/api'
import { Artist } from '@type/Artist'

export const getArtistById = async (id: number) => {
  return (await genius(`artists/${id}`)).response.artist as Artist
}
