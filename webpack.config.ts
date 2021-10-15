import * as path from 'path'
import { argv } from 'process'
import { BannerPlugin, Configuration } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const srcPath = (subdir: string) => path.join(__dirname, 'src', subdir)

const mode =
  argv[argv.indexOf('--mode') + 1] === 'development'
    ? 'development'
    : 'production'

console.log(mode)

const analyze = process.env.ANALYZE !== undefined ?? false

const bundleName =
  mode === 'development' ? 'bars-dev' : analyze ? 'bars-analyze' : 'bars'

const config: Configuration = {
  target: 'node',
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${bundleName}.js`,
  },

  plugins: [
    new BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: !analyze,
    }),

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new BundleAnalyzerPlugin({
      analyzerMode: analyze ? 'server' : 'disabled',
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

  externals: ['utf-8-validate', 'bufferutil', 'react-devtools-core'],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@lib': srcPath('lib'),
      '@type': srcPath('types'),
    },
  },
}

export default config
