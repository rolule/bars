import { Artist } from '../../types/artist'
import { GeniusResponse } from '../../types/GeniusResponse'
import { genius } from '../api'

export const getArtistById = async (id: number) => {
  return (await genius(`artists/${id}`)).response.artist as Artist
}
