module.exports = {
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'style-resources-loader',
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'style-resources-loader',
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: false
            }
          }
        ]
      }
    ]
  }
};
