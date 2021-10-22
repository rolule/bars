import { login } from '@lib/auth/login'
import { getConfigFilePath, saveToken } from '@lib/auth/token'
import { green, red } from 'chalk'
import { Command } from 'commander'
import dotenv from 'dotenv'
import { exit } from 'process'
import { renderAlbumSongsPage } from './cli/pages/AlbumSongsPage'
import { renderAlbumsPage } from './cli/pages/AlbumsPage'
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
  .description('search for artists by name')
  .argument('name', 'the name of the artist')
  .option('-i, --interactive', 'asks for user input before exiting', false)
  .option('-p, --page <page>', 'the page of the search results', '1')
  .action(async (name, { interactive, page }) => {
    const pageNr = parseInt(page, 10)
    if (isNaN(pageNr)) {
      console.log(red('the page has to be a number'))
      exit(-1)
    }

    renderArtistPage({ name, token, page: pageNr, interactive })
  })

bars
  .command('album')
  .alias('al')
  .description('search for albums by name')
  .argument('name')
  .option('-i, --interactive', 'asks for user input before exiting', false)
  .option('-p, --page <page>', 'the page of the search results', '1')
  .action(async (name, { interactive, page }) => {
    const pageNr = parseInt(page, 10)
    if (isNaN(pageNr)) {
      console.log(red('the page has to be a number'))
      exit(-1)
    }

    renderAlbumsPage({ name, token, page: pageNr, interactive })
  })

bars
  .command('songs')
  .alias('s')
  .description('get song names of an album')
  .option('-a, --album <album>', 'the id of the album')
  .action(async ({ album }) => {
    const albumId = parseInt(album, 10)

    if (isNaN(albumId)) {
      console.log(red('the album id has to be a number'))
      exit(-1)
    }

    renderAlbumSongsPage({ token, albumId })
  })

bars.parse(process.argv)
