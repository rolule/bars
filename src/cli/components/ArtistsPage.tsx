import { getArtistsByName as searchArtistsByName } from '@lib/artist'
import { GeniusSearchArtistSectionHitResult } from '@type/Genius'
import { Box, render, Text, useApp, useInput } from 'ink'
import { FC, useEffect, useState } from 'react'

interface ArtistsPageProps {
  name: string
  token?: string
  page: number
  interactive: string
}

const ArtistsPage: FC<ArtistsPageProps> = ({
  name,
  token,
  page,
  interactive,
}) => {
  const [artists, setArtists] = useState<GeniusSearchArtistSectionHitResult[]>(
    [],
  )
  const [interactivePage, setInteractivePage] = useState(page)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const { exit } = useApp()

  const exitNonInteractive = () => !interactive && exit()

  useInput((input, key) => {
    if (input === 'q') {
      exit()
    }

    if (key.rightArrow && !error) {
      setInteractivePage(p => p + 1)
    } else if (key.leftArrow && interactivePage > 1) {
      setInteractivePage(p => p - 1)
    }
  })

  useEffect(() => {
    setLoading(true)
    searchArtistsByName(name, token, interactivePage)
      .then(artistResponse => {
        setArtists(artistResponse)
        setError(undefined)
      })
      .catch(e => {
        setError(e)
        setArtists([])
      })
      .finally(() => {
        setLoading(false)
        exitNonInteractive()
      })
  }, [interactivePage])

  return (
    <>
      <Text>
        <Text inverse> artists page {interactivePage} </Text>{' '}
        {loading && <Text color="cyan">...</Text>}
      </Text>

      {!loading &&
        artists.map(a => (
          <Box key={a.id}>
            <Box width={10}>
              <Text color="green">{a.id}</Text>
            </Box>

            <Box>
              <Text>{a.name}</Text>
            </Box>
          </Box>
        ))}

      {error && <Text color="red">{error}</Text>}
    </>
  )
}

export const renderArtistPage = (props: ArtistsPageProps) =>
  render(<ArtistsPage {...props} />)
