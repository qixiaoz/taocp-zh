# 《计算机程序设计艺术》中文阅读网站

在线阅读地址为 [qixiaoz.github.io/taocp-zh](https://qixiaoz.github.io/taocp-zh/)。

网站收录卷一《基本算法》和卷二《半数值算法》的卷前说明、正文、习题答案、附录和索引。阅读界面采用 VitePress 默认主题，参考 [《软件设计的哲学》中文版网站](https://cactus-proj.github.io/A-Philosophy-of-Software-Design-zh/) 的目录和导航方式。

卷一正文底本为高德纳著、李伯民、范明、蒋爱军译的人民邮电出版社第三版，以英文第三版对校。中文扫描底本的印刷第 340–363 页缺失，采用苏运霖旧译本与英文第三版补配。补配区间内部的原版分页不可考。来源、校订依据和复核范围见各卷独立校订报告。

卷二以巫斌、范明译、人民邮电出版社2016年第三版为中文底本，对照英文第三版数字版。中文618个物理页分别登记，610个阅读内容页直接对照原图；省略包装及制档信息，保留空白页疑点、原页锚点和MIX参考折页。校订由模型查看原图完成，具体覆盖、实质订正、保留疑点及构建验收分别登记，不表示人类逐页签核或所有原书结论均已证明。

| 分册 | 在线阅读 | 母稿 | 校订报告 |
|---|---|---|---|
| 卷一·基本算法 | [卷一目录](https://qixiaoz.github.io/taocp-zh/volume1/) | [整卷 Markdown](计算机程序设计艺术·卷1·基本算法.md) | [卷一报告](校订报告.md) |
| 卷二·半数值算法 | [卷二目录](https://qixiaoz.github.io/taocp-zh/volume2/) | [整卷 Markdown](计算机程序设计艺术·卷2·半数值算法.md) | [卷二报告](校订报告·卷2.md) |

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

`docs:build` 会从根目录的整卷 Markdown 生成分节正文、答案页、目录、校订说明和配套资源下载，随后构建网站并核对源页锚点、题答链接、公式及图片。双卷公式编译使用8 GiB的Node堆上限，避免默认约4 GiB堆耗尽；并不预先占满8 GiB。现有公开仓库的 `ubuntu-latest` 发布任务使用GitHub标准托管环境，规格见[GitHub官方文档](https://docs.github.com/en/actions/reference/runners/github-hosted-runners#standard-github-hosted-runners-for-public-repositories)。

## 更新内容

正文和校订依据分别维护在上表的各卷母稿、报告中。卷一资源位于 `assets/figures/`、`assets/review/`，卷二资源独立位于 `assets/volume2/`。扫描底本、OCR、原页裁图和工作校样不进入公开仓库或下载包。

`scripts/book-volumes.mjs` 配置各卷输入、章节范围、路由、资产和下载文件；`scripts/prepare-book.mjs` 汇总生成分节和导航。生成目录不手改，构建不反写母稿。新增卷须独立配置并完成自身来源与内容校订，再显式打开发布开关。

网站导航、首页和全卷目录仅提供阅读入口。校订报告、复核记录和归档 ZIP 继续生成并校验，阅读界面不提供校订说明或下载入口，校订报告也不进入全文搜索。

网站配置位于 `docs/.vitepress/config.mts`，配套阅读样式位于 `docs/.vitepress/theme/style.css`。公式、长表和程序清单支持局部横向滚动，正文保留原书题号与原页索引。

阅读页提供纸色、白色和深色模式，支持调整正文字号及正文最大宽度。桌面端可收起章节目录，手机端通过“章节目录”按钮展开目录。设置保存在当前浏览器，切换章节或刷新后继续生效；“恢复默认”回到纸色、18 px 字号、760 px 最大宽度及展开目录。较窄的窗口会自动限制实际正文宽度。

阅读设置组件位于 `docs/.vitepress/theme/ReaderControls.vue`，偏好校验与首屏初始化位于 `reader-preferences.ts`。新增或调整设置后，应检查首次载入、刷新、跨节导航、存储不可用以及桌面和手机端的布局。

网页公式使用 KaTeX 在构建时排版，并附带可访问的 MathML。卷一渲染插件处理两处嵌套美元分隔符、七处闭合分隔符前的空白及 HTML 表格内的公式，仍呈现12,699处数学表达式。各卷的实际数量、源区间和资源去向分别记录在生成清单中；整卷下载内容按各自母稿的 SHA-256 校验。

推送到 `main` 后，GitHub Actions 自动生成并检查网站，再通过 GitHub Pages 发布。仓库 Pages 的发布源设置为 **GitHub Actions**，网站基路径为 `/taocp-zh/`。
