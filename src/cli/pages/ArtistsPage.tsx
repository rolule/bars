import { getArtistsByName as searchArtistsByName } from '@lib/artist'
import { Box, render, Text, useApp, useInput } from 'ink'
import Link from 'ink-link'
import { FC, useState } from 'react'
import useSWR, { SWRConfig } from 'swr'

interface ArtistsPageProps {
  name: string
  token?: string
  page: number
  interactive: boolean
}

const ArtistsPage: FC<ArtistsPageProps> = ({
  name,
  token,
  page,
  interactive,
}) => {
  const [interactivePage, setInteractivePage] = useState(page)

  const { error, data: artists } = useSWR(
    [name, token, interactivePage],
    searchArtistsByName,
  )
  const loading = !error && !artists

  const { exit } = useApp()
  useInput(
    (input, key) => {
      if (input === 'q') {
        exit()
      }

      if (key.rightArrow && !error) {
        setInteractivePage(p => p + 1)
      } else if (key.leftArrow && interactivePage > 1) {
        setInteractivePage(p => p - 1)
      }
    },
    { isActive: interactive },
  )

  return (
    <>
      <Text>
        <Text inverse> artists page {interactivePage} </Text>{' '}
        {loading && <Text color="cyan">...</Text>}
        {!loading && interactive && (
          <Text color="blue">
            q{interactivePage > 1 && ' ←'}
            {!error && ' →'}
          </Text>
        )}
      </Text>

      {!loading &&
        artists?.map(a => (
          <Box key={a.id}>
            <Box width={10}>
              <Text color="green">{a.id}</Text>
            </Box>

            <Box>
              <Link url={a.url} fallback={false}>
                <Text>{a.name}</Text>
              </Link>
            </Box>
          </Box>
        ))}

      {error && <Text color="red">{error as string}</Text>}
    </>
  )
}

export const renderArtistPage = async (props: ArtistsPageProps) => {
  return render(
    <SWRConfig
      value={{
        dedupingInterval: 0,
        focusThrottleInterval: 0,
        loadingTimeout: 0,
        errorRetryInterval: 0,
        errorRetryCount: 0,
        revalidateIfStale: false,
      }}
    >
      <ArtistsPage {...props} />
    </SWRConfig>,
  )
}
