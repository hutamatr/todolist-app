function makeModuleNameMapper(srcPath, jsconfigPath) {
  // Get paths from tsconfig
  const { paths } = require(jsconfigPath).compilerOptions;

  const aliases = {};

  // Iterate over paths and convert them into moduleNameMapper format
  Object.keys(paths).forEach((item) => {
    const key = item.replace('/*', '/(.*)');
    const path = paths[item][0].replace('/*', '/$1');
    aliases[key] = srcPath + '/' + path;
  });
  return aliases;
}

const JS_CONFIG_PATH = './jsconfig.json';
const SRC_PATH = '<rootDir>/';

const config = {
  roots: [SRC_PATH],
  testEnvironment: 'jsdom',
  verbose: true,
  // transformIgnorePatterns: ['node_modules/(?!axios)/'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    // '\\.css$': 'some-css-transformer',
  },
  moduleDirectories: [
    'node_modules',
    // add the directory with the test-utils.js file, for example:
    'src', // a utility folder
    __dirname, // the root directory
  ],
  moduleNameMapper: makeModuleNameMapper(SRC_PATH, JS_CONFIG_PATH),
  extensionsToTreatAsEsm: ['.jsx'],
};

module.exports = config;
