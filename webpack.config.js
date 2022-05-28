const webpack = require('webpack')
const path = require('path')
const outputDir = './'
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const RemovePlugin = require('remove-files-webpack-plugin')
const svgToMiniDataURI = require('mini-svg-data-uri')

module.exports = () => {
  return [
    {
      entry: {
        'checkout6-custom': [
          './src/checkout6-custom.scss',
          './src/checkout6-custom.js',
        ],
      },
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, outputDir),
      },
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: { format: { comments: /@preserve/i } },
            extractComments: false,
          }),
          new CssMinimizerPlugin(),
          new webpack.BannerPlugin({
            banner: `@preserve Integrity Hash: [fullhash]`,
          }),
        ],
      },
      plugins: [
        new RemovePlugin({
          before: {
            test: [
              {
                folder: './',
                method: () => true,
              },
            ],
            exclude: [
              './node_modules/*',
              './src/*',
              'babel.config.json',
              'package-lock.json',
              'package.json',
              'webpack.config.js',
            ],
          },
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
      ],
      module: {
        rules: [
          {
            test: /\.js$|jsx/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: [
                    '@babel/plugin-proposal-optional-chaining',
                    '@babel/plugin-proposal-nullish-coalescing-operator',
                  ],
                },
              },
            ],
          },
          {
            test: /\.(scss|css)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '',
                },
              },
              { loader: 'css-loader', options: { url: true } },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    presets: ['postcss-preset-env'],
                    plugins: ['autoprefixer', 'cssnano'],
                  },
                },
              },
              'sass-loader',
            ],
          },
          {
            test: /\.svg/,
            type: 'asset/inline',
            parser: {
              dataUrlCondition: {
                maxSize: 30 * 1024,
              },
            },
            generator: {
              dataUrl: (content) => {
                content = content.toString()
                return svgToMiniDataURI(content)
              },
            },
          },
        ],
      },
      resolve: {
        preferRelative: true,
        extensions: ['.js', '.jsx'],
        alias: {
          '~styles': path.resolve(__dirname, 'src', 'styles'),
          '~scripts': path.resolve(__dirname, 'src', 'scripts'),
          '~icons': path.resolve(__dirname, 'src', 'icons'),
        },
      },
      performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      },
    },
  ]
}
