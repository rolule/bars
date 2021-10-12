import * as path from 'path'
import { BannerPlugin, Configuration } from 'webpack'

const srcPath = (subdir: string) => path.join(__dirname, 'src', subdir)

const config: Configuration = {
  target: 'node',
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bars.js',
  },

  plugins: [
    new BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@lib': srcPath('lib'),
      '@type': srcPath('types'),
    },
  },
}

export default config
