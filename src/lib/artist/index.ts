import { GeniusSearchArtistResponse } from '../../types/Genius'
import { geniusSearch } from '../api'

export const getArtistsByName = async (
  name: string,
  token?: string,
  page?: number,
) => {
  const response = (
    (await geniusSearch(
      'artist',
      name,
      token,
      page,
    )) as GeniusSearchArtistResponse
  ).response

  const results = response.sections[0].hits.map(h => h.result)

  if(results.length === 0){
    throw "Zero results returned"
  }

  return results
}
