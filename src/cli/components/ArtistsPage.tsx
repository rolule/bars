import { getArtistsByName as searchArtistsByName } from '@lib/artist'
import { Box, render, Text, useApp, useInput, useStdin } from 'ink'
import { FC, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

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
  const [isActive, setIsActive] = useState(interactive)

  const {
    isLoading,
    error,
    data: artists,
  } = useQuery(
    ['artists', interactivePage],
    () => {
      return searchArtistsByName(name, token, interactivePage)
    },
    {
      retry: false,
      staleTime: 30000,
      keepPreviousData: true,
    },
  )

  useInput(
    (input, key) => {
      if (input === 'q') {
        setIsActive(false)
      }

      if (key.rightArrow && !error) {
        setInteractivePage(p => p + 1)
      } else if (key.leftArrow && interactivePage > 1) {
        setInteractivePage(p => p - 1)
      }

      return -1
    },
    { isActive },
  )

  return (
    <>
      <Text>
        <Text inverse> artists page {interactivePage} </Text>{' '}
        {isLoading && <Text color="cyan">...</Text>}
      </Text>

      {!isLoading &&
        artists?.map(a => (
          <Box key={a.id}>
            <Box width={10}>
              <Text color="green">{a.id}</Text>
            </Box>

            <Box>
              <Text>{a.name}</Text>
            </Box>
          </Box>
        ))}

      {error && <Text color="red">{error as string}</Text>}
    </>
  )
}

const queryClient = new QueryClient()

export const renderArtistPage = (props: ArtistsPageProps) => {
  render(
    <QueryClientProvider client={queryClient}>
      <ArtistsPage {...props} />
    </QueryClientProvider>,
  )
}
