const webpack = require('webpack');

module.exports = (config) => {
  // Add SCSS loader configuration
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader', // Injects CSS into the DOM
      'css-loader',   // Translates CSS into CommonJS
      'sass-loader',  // Compiles Sass to CSS
    ],
  });

  // Add environment variables using DefinePlugin
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(process.env.API_URL),
        // Add other environment variables as needed
      },
    })
  );

  // Important: return the modified config
  return config;
};
