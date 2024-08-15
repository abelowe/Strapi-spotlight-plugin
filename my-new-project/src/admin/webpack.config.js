module.exports = (config, webpack) => {
  config.module.rules.push(
    {
      test: /\.scss$/,
      use: [
        'style-loader', // Injects CSS into the DOM
        'css-loader',   // Translates CSS into CommonJS
        'sass-loader',  // Compiles Sass to CSS
      ],
    }
  );

  // Important: return the modified config
  return config;
};
