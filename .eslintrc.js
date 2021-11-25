module.exports = { // 启用的环境
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser', // 使用 vue-eslint-parser 解析器
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
    'plugin:vue/vue3-recommended', // 强制执行 vue3 社区默认值的规则
    'plugin:@typescript-eslint/recommended', // 校验 ts
    'prettier', // 利用 prettier 配置 覆盖 eslint 样式配置
  ],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 'vue/script-setup-uses-vars': 'error',  // 中使用的变量<template>被no-unused-vars规则警告
  },
};
