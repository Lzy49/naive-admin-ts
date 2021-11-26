module.exports = {
  env: {
    // 启用的环境
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser', // 增加 vue 解析器
  parserOptions: {
    // eslint espree (查时候看 eslint 文档)
    parser: '@typescript-eslint/parser', // 解析器
    ecmaVersion: 2020, // es 版本
    jsxPragma: 'React', // jsx 风格
    ecmaFeatures: {
      jsx: true, // 使用 jsx
    },
  },
  extends: [
    'plugin:vue/vue3-recommended', // vue 风格
    'plugin:@typescript-eslint/recommended', // ts 风格
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', '@typescript-eslint'], // 插件包
  rules: {},
};
