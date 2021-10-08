import { Command } from 'commander'

const bars = new Command()

bars.version(process.env.npm_package_version ?? 'unknown')

bars
  .command('artist <name>')
  .alias('a')
  .description('query information about an artist')
  .action(name => {
    console.log(name)
  })

bars.parse(process.argv)
