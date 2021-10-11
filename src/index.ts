import { getArtistById } from './lib/artist/index'
import { Command } from 'commander'

const bars = new Command()

bars.version(process.env.npm_package_version ?? 'unknown')

bars
  .command('artist <name>')
  .alias('a')
  .description('query information about an artist')
  .action(async name => {
    console.log('Getting', name)

    const artist = await getArtistById(16775)
    console.log(artist.id)
  })

bars.parse(process.argv)
