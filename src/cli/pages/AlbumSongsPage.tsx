import { getAlbumSongsById } from '@lib/album/album'
import { Box, render, Text } from 'ink'
import { FC } from 'react'
import useSWR, { SWRConfig } from 'swr'

interface AlbumSongsPageProps {
  token?: string
  albumId: number
}

const AlbumSongsPage: FC<AlbumSongsPageProps> = ({ token, albumId }) => {
  const { error, data: songs } = useSWR([albumId, token], getAlbumSongsById)
  const loading = !error && !songs

  return (
    <>
      <Text>
        <Text inverse> albums songs </Text>{' '}
        {loading && <Text color="cyan">...</Text>}
      </Text>

      {!loading &&
        songs?.map((s, i) => (
          <Box key={s.id}>
            <Box width={3}>
              <Text>{`${i + 1}`.padStart(2)}</Text>
            </Box>

            <Box width={10}>
              <Text color="green">{s.id}</Text>
            </Box>

            <Box>
              <Text>{s.title}</Text>
            </Box>
          </Box>
        ))}

      {error && <Text color="red">{error as string}</Text>}
    </>
  )
}

export const renderAlbumSongsPage = async (props: AlbumSongsPageProps) => {
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
      <AlbumSongsPage {...props} />
    </SWRConfig>,
  )
}
