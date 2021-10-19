import { login } from '@lib/auth/login'
import { getConfigFilePath, saveToken } from '@lib/auth/token'
import { green, red } from 'chalk'
import { Command } from 'commander'
import dotenv from 'dotenv'
import { exit } from 'process'
import { renderArtistPage } from './cli/pages/ArtistsPage'

// load environment variables from .env file
dotenv.config({ path: getConfigFilePath() })

const token = process.env.LOGIN_TOKEN

// create new command and set version
const bars = new Command()
bars.version(process.env.npm_package_version ?? 'unknown')

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
      console.error(red(e))
      exit(-1)
    }
  })

bars
  .command('artist')
  .alias('a')
  .description('query artists by name')
  .argument('name', 'the name of the artist')
  .option('-i, --interactive', 'asks for user input bevore exiting', false)
  .option('-p, --page <page>', 'the page of the search results', '1')
  .action(async (name, { interactive, page }) => {
    const pageNr = parseInt(page, 10)
    if (isNaN(pageNr)) {
      console.log(red('the page has to be a number'))
      exit(-1)
    }

    renderArtistPage({ name, token, page: pageNr, interactive })
  })

bars.parse(process.argv)
