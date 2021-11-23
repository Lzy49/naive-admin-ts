# 应用

- naive-ui
- axios
- vicons
# 开发

- sass 
- ts
# 风格

- eslint
- parser
## Git

### 工具

##### 风格工具

- commitizen  // Git 规则 工具
- cz-conventional-changelog // Git 规则之 angluar 规则

##### 强行校验

- commitlint // 校验规则工具（只安装以下两个即可)
  -  @commitlint/cli
  -  @commitlint/config-conventional
- husky // git 钩子

##### 景上添花

- git-cz // Git 美化工具

### 安装

#### 使用  现在流行的 angular 代码管理风格

##### 安装包

``` 
 yarn add commitizen cz-conventional-changelog -D
```

##### 配置 package.json

```json
{
  "script":{
    "commit":"cz" // 利用 cz 进行提交 此时使用 git commit 仍可提交，且不参与 风格工具
  },
  "config":{
    "commitizen":{ // 表示风格使用 angular风格 （cz-conventional-changelog）
      "path":"cz-conventional-changelog"
    }
  }
}
```

#### 配置 Git 钩子 

##### 安装

```
yarn add husky @commitlint/{config-conventional,cli} -D
```

##### 运行 husky 

```
# 初始化 husky
yarn husky install
# 设置项目在install后自动初始化husky
npm set-script prepare "husky install"
# 添加一个 校验 commitlint 的 hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

##### 创建 `commitlint.config.js` 

```
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

#### 锦上添花 加入表情

##### 安装

```
yarn add git-cz -D
```

##### 修改 package.json

```
{
  "config":{
    "commitizen":{ // 表示风格使用 angular风格 （cz-conventional-changelog）
      "path":"git-cz" // cz-conventional-changelog => git-cz
    }
  }
}
```

#### 最后 当前包版本

⚠️ 务必注意包版本问题，如果安装其他版本包，请务必以安装版本的 官方文档为准。不要盲目使用该贴内容，每个版本都可能大不相同

```
 "@commitlint/cli": "^15.0.0",
 "@commitlint/config-conventional": "^15.0.0",
 
 "commitizen": "^4.2.4",
 "cz-conventional-changelog": "^3.3.0",
 
 "git-cz": "^4.8.0",
 "husky": "^7.0.4"
```

