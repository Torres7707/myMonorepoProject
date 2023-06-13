# Commit Message介绍
标准格式包括三个部分：Header，Body，Footer
```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```
其中，Header 是必需的，Body 和 Footer 可以省略

### 一、Header
Header 部分只有一行，包括三个字段：type（必需）、scope（可选）、subject（必需）
-   type 也就是feat,fix，等类型
-   scope 用于说明影响的范围，比如数据层、控制层、视图层等等。
-   subject 主题，简短描述。一行

### 二 、Body
对 subject 的补充。可以多行。
### 三、Footer
主要是一些关联 issue 的操作。

# 为了规范提交，所以有了如下设置。
## 1. 安装commitizen

Commitizen 是一个撰写符合上面 Commit Message 标准的一款工具。这个工具要全局安装
> pnpm i commitizen -g

在package.json中添加一个scripts

>"cz": "git add . && git cz"

这时就可以全局使用 git cz 命令来代替 git commit 命令了

## 2. 安装cz-customizable设置提交模板

设置提交模版

>pnpm i cz-customizable -D

安装完之后在package.json中添加如下节点

> "config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    }
  },
  
  同时在根目录创建.cz-config.js
  
  ```
// 设置提交模板
module.exports = {
  types: [
    { value: '✨feat', name: '✨feat:          增加新功能' },
    { value: '🐛fix', name: '🐛fix:           修复bug' },
    { value: '💎ui', name: '💎style:         样式修改不影响逻辑' },
    { value: '📝docs', name: '📝docs:          修改文档' },
    { value: '🏰chore', name: '🏰chore:          对脚手架做了些更改' },
    {
      value: '🌠refactor',
      name: '🌠refactor: 代码重构（不包括 bug 修复、功能新增）',
    },
    { value: '🔂revert', name: '🔂revert:        版本回退' },
  ],
  scopes: [{ name: 'pages' }, { name: 'components' }, { name: 'utils' }, { name: 'hooks' }, { name: 'chore' }],
  messages: {
    type: '请选择提交的类型；',
    scope: '请选择修改的范围（可选）',
    subject: '请简要描述提交（必填）',
    body: '请输入详细描述（可选）',
    footer: '请选择要关闭的issue（可选）',
    confirmCommit: '确认要使用以上信息提交？（y/n）',
  },
  skip: ['body', 'footer'],
  subjectLimit: 72,
};

  
  ```
  
 配置到这里，我们就能git  cz或者 pnpm cz 规范提交信息了。但是git commit -m xxx 这种还没拦截到，需要进一步处理
 
 ## 3. 安装husky
 

>pnpm i husky -D


在package.json中添加一个scripts

>"prepare": "husky install"

然后初始化husky,将 git hooks 钩子交由,husky执行

>pnpm run prepare 

-初始化 husky, 会在根目录创建 .husky 文件夹

- 若husky版本<5.0.0：

在package.json中添加

>"husky": {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS"
   }
},

- 若husky版本>=5.0.0：

执行 npx husky install 安装git钩子

>npx husky add .husky/commit-msg 'npx commitlint --edit $1'

启用适配commitlint的commit-msg hook

他会在.husky文件下生成一个commit-msg的文件，内容如下

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install commitlint --edit ""

```


## 4. 安装commitlint

commitlint搭配husky的commit message 钩子后，每次提交 git 版本信息的时候，会根据配置的规则进行校验，若不符合规则会 commit 失败，并提示相应信息。

>pnpm i -D @commitlint/{cli,config-conventional}

在项目目录下创建配置文件.commitlintrc.js, 写入:

```
module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(.*?)(?:\((.*)\))?:?\s(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'type-case': [0],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['✨feat', '🐛fix', '💎ui', '📝docs', '🏰chore', '🌠refactor', '🔂revert']],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
};

```

至此，我们git commit -m xxx 就会检测提交信息，如符不符合模版，就会强制报错取消提交


# 使用指南
#### 通过上面的配置，我们提交代码有三种方式

- pnpm cz 这个命令会自动add,然后git cz （推荐）
- git cz提交，需要自己手动git add . （推荐）
- git commit -m 'type: xxx', 只要type符合规范，也是可以的

#### 当git cz 提交时：

1.会让你选择提交类型，也就是type类型（feat,fix,等）
  - feat:  增加新功能
  - fix:  修复bug
  - ui:  样式修改不影响逻辑
  - docs:  修改文档
  - refactor:  代码重构（不包括 bug 修复、功能新增）
  - revert:  版本回退<br /> 
2.会让你输入提交简述（必填）<br /> 
3.会让你输入项目详细描述（可选）<br /> 
4.会让你输入可关闭的issue（可选），如果时fix bug的情况，这里要关联上bug号<br /> 
5.会询问你是否确定<br /> 

#### 提交类型说明

当我们新增一个功能时
- 如果是新增的功能，比如个权限管理，这时我们提交类型为feat,提交简述是权限相关的xxx，详细描述这块，如果影响面很大，这里建议写清楚，关联issue 可以不填，一路回车搞定
  <br/>
- 如果是修改bug或者修改线上反馈，提交类型为fix,提交简述肯定是bug相关的描述，详细描述根据情况选填，关联issue这里，如果有bug号，一定要关联上
  <br/>
- 如果是样式改动，比如ui验收提的问题，提交类型选择ui，提交简述就写修改了哪里的样式，详细描述根据情况选填，关联issue不填
    <br/>
- 如果是修改了文档，比如readme等，提交类型选择docs,提交简述写改动点，详细描述选填，关联issue不填
    <br/>
- 如果是修改了脚手架的配置，这里类型选择chore,提交简述写改动了哪里，详细描述根据情况选填，关联issue不填
    <br/>
- 如果是重构了某个功能的代码，类型选择refactor,提交简述写改动了哪里，详细描述根据情况选填，关联issue不填
    <br/>
- 如果是版本回退，类型选择为revert，提交简述必填，详细描述选填，关联issue不填，慎用，目前我们此操作很少
 
 
 
 
