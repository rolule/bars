import { getArtistById } from '@lib/artist'
import { Command } from 'commander'
import dotenv from 'dotenv'
import { green } from 'chalk'

// load environment variables from .env file
dotenv.config()

const bars = new Command()

bars.version(process.env.npm_package_version ?? 'unknown')

bars
  .command('artist <name>')
  .alias('a')
  .description('query information about an artist')
  .action(async name => {
    console.log('Getting', name)

    const artist = await getArtistById(16775)
    console.log(green(artist.id))
  })

bars.parse(process.argv)
