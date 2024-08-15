'use strict';


module.exports = (config, webpack) => {

  config.module.rules.push(
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader', 
        'css-loader',   
        'sass-loader',  
      ],
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',   
      ],
    }
  );

  // Important: return the modified config
  return config;
};