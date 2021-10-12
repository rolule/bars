import { getArtistById } from '@lib/artist'
import { green } from 'chalk'
import { Command } from 'commander'
import dotenv from 'dotenv'
import { login } from './lib/auth/login'

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

bars
  .command('login <email> <password>')
  .alias('l')
  .description('Log in using email and password')
  .action(async (email: string, password: string) => {
    console.log('logging in')

    try {
      const r = await login(email, password)
      console.log(r)
    } catch (e) {
      console.error(e)
    }
  })

bars.parse(process.argv)
