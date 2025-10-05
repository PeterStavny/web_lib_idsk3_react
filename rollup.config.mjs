import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default [
  {
    input: ['./src/index.ts'],
    output: {
      dir: 'dist',
      format: 'cjs',
      sourcemap: false,
      exports: 'auto',
      preserveModules: false
    },
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        exclude: [/\.test.((js|jsx|ts|tsx))$/],
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist'
      }),
      terser(),
      copy({
        targets: [
          { src: 'src/styles/idsk3_theme.css', dest: 'dist/styles' },
          { src: 'src/styles/fonts', dest: 'dist/styles' },
          { src: 'node_modules/@PeterStavny/idsk-core/dist/assets', dest: 'dist' },
          { src: 'node_modules/@PeterStavny/idsk-core/dist/tailwindConfig.js', dest: 'dist' }
        ]
      })
    ]
  }
];
