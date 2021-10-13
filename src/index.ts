import { getArtistsByName } from '@lib/artist/index'
import { login } from '@lib/auth/login'
import { getConfigFilePath, saveToken } from '@lib/auth/token'
import { green, red } from 'chalk'
import { Command } from 'commander'
import dotenv from 'dotenv'

// load environment variables from .env file
dotenv.config({ path: getConfigFilePath() })

const token = process.env.LOGIN_TOKEN

// create new command and set version
const bars = new Command()
bars.version(process.env.npm_package_version ?? 'unknown')

bars
  .command('artist <name> [page]')
  .alias('a')
  .description('query information about an artist')
  .action(async (name, page) => {
    try {
      const artists = await getArtistsByName(name, token, page)

      console.log(`artists (page ${page ? page : 1})`)
      artists.forEach(a =>
        console.log(` ${green(`${a.id}`.padEnd(8))}\t${a.name}`),
      )
    } catch (e) {
      console.log(red(e))
    }
  })

bars
  .command('login <email> <password>')
  .alias('l')
  .description('Log in using email and password')
  .action(async (email: string, password: string) => {
    try {
      const token = await login(email, password)

      saveToken(token)
      console.log(green('success'))
    } catch (e) {
      console.error(e)
    }
  })

bars.parse(process.argv)
