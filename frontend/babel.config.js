// babel.config.js - FOR EXPO 57 + NATIVEWIND 4.2.6 + REANIMATED 4
module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel'
    ],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};