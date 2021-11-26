# eslint + prettier

# eslint

## 安装

```
# 全局安装
npm i eslint -g 
# 项目安装
npm eslint -d
```

## 使用

### 初始化

```3
# 全局安装使用以下命令
npx eslint --init
# 项目安装使用 以下命令
./node_modules/.bin/eslint --init
```

依次根据自己项目进行选择

### 配置

#### 默认配置文件

根目录 `.eslintrc.js` 

- 配置信息可以查 https://eslint.bootcss.com/docs/user-guide/configuring

- rules 单独的配置项 具体可以查  https://eslint.bootcss.com/docs/rules/

```
module.exports = {
  env: { // 执行环境
    browser: true,
    es2021: true,
    node: true
  },
  extends: [ // 扩展
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: { // 解析器配置
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'], // 插件
  rules: {} // 规则 
};

```

>  现在 eslint 已经根据选择生产了一份默认的 eslint 校验，此时 对 vue3 并不支持例如 `<sceript setup>` 语法糖。

#### 配置 Vue 3

- 配置 Vue 3 从官方文档入手 ，官方提供插件 : `eslint-plugin-vue` 
- 文档: https://eslint.vuejs.org/

##### 安装

```
yarn add -D eslint-plugin-vue
```

##### 配置

```
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended' // 将配置设置为 强制执行主观社区默认值的规则 (其他风格可以看 官方文档)
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser', // 初始化时因安装了ts版，默认配置了ts
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'], 
  rules: {}
};

```

> 现在 vue 3 已经可以正常校验 vue3 了 ts 因为 配置了 `@typescript-eslint/parser`也可以解析。但如果想使用其他的`extends`则需要配置 vue 解析器。

#### 使用自定义解析器

- 使用 `plugin:vue/vue3-recommended` 外的 `extend`会 解析不到Vue文件，所以需要使用 Vue 提供的另一个插件`vue-eslint-parser` 来解析`.vue`文件。

##### 安装

```
yarn add vue-eslint-parser -D
```

##### 配置

```
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser', // 增加 vue 解析器
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/vue3-recommended', // vue 风格
    'plugin:@typescript-eslint/recommended' // 增加 ts 风格 
  ],
  plugins: ['vue', '@typescript-eslint'], // 插件包
  rules: {}
};
```

> 此时就配置好了eslint + vue + ts 了  可以使用 `./node_modules/.bin/eslint 'src/**/*.*'`来校验风格。当然还有其他指令

## 命令行

文档：https://eslint.bootcss.com/docs/user-guide/command-line-interface

```
eslint '**/*.*' // 校验文件
eslint  --fix  "src/**/*.*" // 修复文件格式 （部分，有些无法修复会提示）
```

# prettier

- 文档 https://prettier.io/docs/en/install.html

## 安装

```
yarn add --dev --exact prettier
```

## 配置

### 创建 配置文件

```
echo {}> .prettierrc.json
```

### 配置文件格式

- 详细配置可以看文档，地址： https://prettier.io/docs/en/options.html 。以下为案例：

```
{
	"tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "arrowParens": "avoid"
}
```

> 此时就配置好了 prettier 可以使用 `yarn prettier --write .` 命令 对文件统一风格。 用 `yarn prettier --check . `检查风格。

# 解决问题

## eslint 风格 与 prettier 风格冲突

可以使用 ` eslint-config-prettier` 来设置 关闭  prettier 相关的  eslint 配置

#### 安装

```
yarn add eslint-config-prettier -D
```

#### 集成

```
// .eslintrc.js 文件
{
	extends: [
    'prettier' // prettier 风格
  ],
}
```

## 在提交代码时，校验风格

- 可以使用 `husky`的钩子来实现校验风格再提交。

- 文档：https://github.com/typicode/husky

### 使用 husky

#### 安装

```
yarn husky install
# 设置项目在install后自动初始化husky
npm set-script prepare "husky install"
```

#### 设置

##### commit 前 使用 prettier 格式化风格

```
npx husky add .husky/pre-commit 'yarn prettier --write .'
```

##### commit 前 使用 prettier 校验风格

```
npx husky add .husky/pre-commit 'yarn prettier --check .'
```

##### commit 前 使用 eslint 校验风格

```
npx husky add .husky/pre-commit './node_modules/.bin/eslint "**/*.*"'
```

##### 自定义 pre-commit

自定义使用eslint 和 prettier 校验 `src/**/*.{vue,js,jsx,ts,tsx}`

```
- pre-commit 文件

#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
path="src/**/*.{vue,js,jsx,ts,tsx}"
./node_modules/.bin/eslint $path 
yarn prettier -c $path
```

> 虽然使用以上配置可以在 commit 时 完全校验  eslint + prettier 了，但是 prettier 的提示相当简单，完全没有参考意义。此时可以使用 eslint 来校验 prettier 风格。

### 使用 eslint 校验 prettier 风格

- 安装`eslint-plugin-prettier`插件
- 文档 ：https://github.com/prettier/eslint-plugin-prettier

```
yarn add eslint-plugin-prettier -D
```

#### 配置

##### 没有使用  eslint-config-prettier 使用以下配置

```
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

##### 如果安装有 eslint-config-prettier 则可以使用 以下配置即可

```
extends: [
   'plugin:prettier/recommended', // 将 prettier 修改 为 plugin:prettier/recommended 。
],
```

配置后不需要使用 prettier 来校验文件只需要使用 eslint 即可。

### 使用 lint-staged 提高性能

> 完成以上配置后，当提交 commit 时就会进行 eslint 校验。但是会校验 路径中所有的文件。如果项目很大，会非常浪费性能，我们只需要对 要提交的代码进行校验。完成这个功能需要使用  lint-staged 插件

#### 安装

```
yarn add -D  lint-staged
```

#### 配置

##### 方式1

根目录创建 .lintstagedrc

```
{
  "*.{vue,js,ts,tsx,jsx}": "eslint"
}
```

##### 方式 2

package.json 增加

```json
"lint-staged": {
  "*.{vue,js,ts,tsx,jsx}": "eslint"
},
```

> 此时运行 npx lint-staged 就会执行校验，并只校验 git add 的文件

#### 配置好修改一下 husky

- 这里用 set 没有使用 add

```
npx husky set .husky/pre-commit 'npx lint-staged'
```

> 此时运行 commit 时就会对 add 文件进行校验。

#### lintstagedrc 使用 -c 指令 可以执行其他的 配置文件

```
npx lint-staged -c '.lint-staged-fix'
```

# 完整配置

#### .eslintrc.js

```
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

```

#### .lint-staged-fix

```
{
  "*.{vue,js,ts,tsx,jsx}": "eslint --fix"
}
```

#### .prettierrc.json

```
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "arrowParens": "avoid"
}
```

#### package.json

```
{
  "name": "naive-admin-ts",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "serve": "vite preview",
    "commit": "cz",
    "prepare": "npx husky install",
    "fix": "npx lint-staged -c '.lint-staged-fix'",
    "fix:eslint": "eslint --fix 'src/**/*.*'"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "dependencies": {
    "vue": "^3.2.16"
  },
  "lint-staged": {
    "*.{vue,js,ts,tsx,jsx}": "eslint"
  },
  "devDependencies": {
    "@commitlint/cli": "^15.0.0",
    "@commitlint/config-conventional": "^15.0.0",
    "@typescript-eslint/eslint-plugin": "^5.4.0",
    "@typescript-eslint/parser": "^5.4.0",
    "@vitejs/plugin-vue": "^1.9.3",
    "commitizen": "^4.2.4",
    "cz-conventional-changelog": "^3.3.0",
    "eslint": "^8.3.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^8.1.1",
    "husky": "^7.0.4",
    "lint-staged": "^12.1.2",
    "prettier": "^2.5.0",
    "typescript": "^4.4.3",
    "vite": "^2.6.4",
    "vue-eslint-parser": "^8.0.1",
    "vue-tsc": "^0.3.0"
  }
}
```

