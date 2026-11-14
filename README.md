# 《计算机程序设计艺术》卷一中文阅读网站

在线阅读地址为 [qixiaoz.github.io/taocp-zh](https://qixiaoz.github.io/taocp-zh/)。

网站收录卷一《基本算法》的前置页、正文、习题答案、附录和索引。阅读界面采用 VitePress 默认主题，参考 [《软件设计的哲学》中文版网站](https://cactus-proj.github.io/A-Philosophy-of-Software-Design-zh/) 的目录和导航方式。

正文底本为高德纳著、李伯民、范明、蒋爱军译的人民邮电出版社第三版，以英文第三版对校。中文扫描底本的印刷第 340–363 页缺失，采用苏运霖旧译本与英文第三版补配。补配区间内部的原版分页不可考。来源、校订依据和复核范围见网站的校订说明。

## 本地运行

使用 Node.js 22 或更新的兼容版本。

```sh
npm ci
npm run docs:dev
```

构建并校验正式发布文件。

```sh
npm run docs:build
npm run docs:preview
```

`docs:build` 会从根目录的整卷 Markdown 生成分节正文、答案页、目录、校订说明和配套资源下载，随后构建网站并核对源页锚点、题答链接、公式及图片。

## 更新内容

正文维护在 `计算机程序设计艺术·卷1·基本算法.md`，校订依据维护在 `校订报告.md`。插图与复核记录位于 `assets/`。网站的分节文件由 `scripts/prepare-book.mjs` 生成。

网站配置位于 `docs/.vitepress/config.mts`，配套阅读样式位于 `docs/.vitepress/theme/style.css`。公式、长表和程序清单支持局部横向滚动，正文保留原书题号与原页索引。

阅读页提供纸色、白色和深色模式，支持调整正文字号及正文最大宽度。桌面端可收起章节目录，手机端通过“章节目录”按钮展开目录。设置保存在当前浏览器，切换章节或刷新后继续生效；“恢复默认”回到纸色、18 px 字号、760 px 最大宽度及展开目录。较窄的窗口会自动限制实际正文宽度。

阅读设置组件位于 `docs/.vitepress/theme/ReaderControls.vue`，偏好校验与首屏初始化位于 `reader-preferences.ts`。新增或调整设置后，应检查首次载入、刷新、跨节导航、存储不可用以及桌面和手机端的布局。

网页公式使用 KaTeX 在构建时排版，并附带可访问的 MathML。渲染插件处理母稿的两处嵌套美元分隔符、七处闭合分隔符前的空白及 HTML 表格内的公式，生成版共呈现 12,699 处数学表达式。这些是网页语法兼容处理，整卷下载内容按母稿的 SHA-256 校验。

推送到 `main` 后，GitHub Actions 自动生成并检查网站，再通过 GitHub Pages 发布。仓库 Pages 的发布源设置为 **GitHub Actions**，网站基路径为 `/taocp-zh/`。
