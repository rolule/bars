import { mkdirSync, writeFileSync } from 'fs'
import { resolve, join } from 'path'
import { execPath } from 'process'
import { red } from 'chalk'

type Exception = { code: string }

export const getConfigFolderPath = () =>
  resolve(
    process.env.NODE_ENV === 'production'
      ? process.env.HOME ?? __dirname
      : __dirname,
    '.bars',
  )

export const getConfigFilePath = () => join(getConfigFolderPath(), 'config')

export const saveToken = async (token: string) => {
  const folderPath = getConfigFolderPath()

  try {
    mkdirSync(folderPath)
  } catch (e) {
    const code = (e as Exception).code

    if (code !== 'EEXIST') {
      console.log(red('there was an error creating the bars directory'))
      return
    }
  }

  try {
    // create config file
    const configPath = getConfigFilePath()
    writeFileSync(configPath, `LOGIN_TOKEN=${token}`, {
      flag: 'w',
    })
  } catch (e) {
    console.log(red('there was an error creating the bars config file'))
  }
}
