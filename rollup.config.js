import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  format: 'umd',
  plugins: [
    resolve({
        // pass custom options to the resolve plugin
        customResolveOptions: {
          moduleDirectory: 'node_modules'
        }
    }),
  ],
  // indicate which modules should be treated as external
  external: ['d3'],
  sourceMap: true,
  dest: 'build/timezone-scale.js'
};
