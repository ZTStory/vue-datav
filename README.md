# vue-datav 大屏可视化框架模板

原文阅读：[https://juejin.cn/post/7153457400974934053/](https://juejin.cn/post/7153457400974934053/)
## 起源
原本公司项目都是完成一些后台管理的内容还有移动端的内容，最近商务那边对接了两个关于可视化大屏的项目，虽说公司前端在此类项目上面没有什么经验积累，但毕竟没吃过猪肉还是见过猪跑的，在着手开发之前，需要先准备一些解决通用问题的开发框架，方便后续相关大屏项目的快速迭代。

## 思考
>关于可视化大屏项目的开荒，我总结了以下几个问题
1. 可视化图表库应该如何选择？
2. 大屏开发框架应该如何搭建？
3. 大屏基础组件应该如何设计与实现？
4. 大屏渲染内容图表的定位问题及缩放问题如何解决？
5. 大屏项目开发代码结构该如何组织？

## 调研与落地
#### 1、可视化图标库应该如何选择？
鉴于可视化技术已经相对成熟了，市面上的开源可视化图表库也是繁华缭乱的，那我们应该怎么选择呢？

关于这个问题，我个人也是查阅了很多资料，看了一些图表库的官方文档及示例，结合一些内容作者的分享成果作以下分析：

**1）ECharts.js**

> 官网：https://echarts.apache.org

ECharts.js 最早是由[百度技术团队](https://echarts.baidu.com)维护的，
后来移交给了 Apache 开源基金会孵化

也是我最终选择的图表库，选择它的原因也是因为文档界面相对友好，支持 `SVG` 、`Canvas` 双擎渲染，图表示例也比较全，而且文档是支持中英文的，使用的人也比较多，所以相关资料也很丰富

这里要说一点坑就是，文档、示例虽好，但是很多特殊效果真的需要仔细阅读示例 `demo` 和配置项文档才能了解清楚，因为，`ECharts` 的配置选项实在是太庞大啦，对于第一次接触的我来说，还是有点吃力，不过还好，套路摸清楚之后就可以很快复制

**2）Chart.js**

>英文原版：https://www.chartjs.org
>
>中文版：https://chartjs.bootcss.com

同样作为一款文档支持中英文的图表库，我也是把它纳入了对比范围

文档整体结构和界面都是非常友好的，也拥有相当数量的基础内置图表，对于常规开发来说，这个库也是比较不错的选择，`Api` 学习难度低于 `ECharts`

但是如果有复杂图表比如仪表盘或者地图相关渲染的时候，这个库就不支持了，不过也不影响这个库的好用，大家可以根据自己的业务需求来选择，混合选择多款图表库也是可行的

**3) Antv**

>官网：https://antv.vision/zh
>
>国内镜像：https://antv.gitee.io/zh/

Antv 是我一开始比较看好的一个可视化图表库，它的产品系列划分很多，根据不同的图表类型也分了很多不同的产品线
* `G2`（可视化图形）、`G2Plot`（通用图表库）
* `S2`（多维可视分析表格）
* `G6`（关系数据图分析工具）
* `X6`（图编辑引擎）
* `L7`（地理空间数据可视化）
* `F2`（专注移动端的可视化解决方案）

文档的质量毕竟大厂的产品，还是非常能打的，目前是免费使用的，但是后期是否会收费就不清楚了，目前看这些项目在 `GitHub` 都是开源的 `MIT`，如果有符合需求的也可以考虑。

但是也看到有人说引入后本地可以运行，但是部署在服务器发生了未知 bug，导致图像无法渲染，所以也就没有使用，毕竟没有深入了解过，或许这种问题已经修复了。

**4) D3.js**
> 官网：https://d3js.org/

纯英文文档，相信这一条或许会劝退很多人，`GitHub` 有国内开发者翻译的 Api [中文手册](https://github.com/d3/d3/wiki/API--%E4%B8%AD%E6%96%87%E6%89%8B%E5%86%8C)，没有内置图表

但是其定义的绘图开发框架可以让你用 `Api` 的方式来进行 `SVG` 绘图，这一点比使用原生 `SVG` 要好很多，如果大家有需求要进行自定义绘制的，可以考虑使用 `D3.js`。

一句话：很底层，但是足够灵活，可满足绝大部分图表内容的绘制

#### 2、大屏开发框架应该如何搭建？

**1）为什么要搭建框架？**

如果我们直接上手画图的话，的确很快，每种图标的配置都来一份，每个框框标题都用 Div 一把梭，完全没有心智负担

但是来第二套、第三套、第四套图的时候，是不是要吐血了。

拷代码再改？如果两期离得近还行，如果放个把月半年再来，是不是忘得差不多了。。

如果 UI 视觉稿的风格基本一致的情况下，是不是有一套可视化开发框架会爽很多？

**2）如何搭建框架呢？**

这个问题，没有标准答案，我个人的理解，按需求和设计稿以及你所选择的图表库共同决定的。

理论上，好的框架设计应该是支持底层图表库替换而应用层无需修改业务代码的，所以 `Api` 的设计就尤为重要了。

那我们理一理，开发一款大屏项目，需要经历那些设计？

**大屏幕、大标题、每个图表的边框、每个图表的文字说明、绘图引擎、屏幕缩放的时候画面跟着等比缩放**等等

那我们就应该考虑对上述问题有一个统一的解决方案，这样后续在进行大屏项目开发时就能够事半功倍了。

#### 3、大屏基础组件应该如何设计与实现？

我对我们现有的可视化大屏项目做了这样几个拆分

>- Screen - 大屏
>- Screen Title - 大屏标题
>- Card - 数据内容卡片
>- Card Title - 数据卡片标题
>- Swiper - 大屏内容滚动
>- Dance Number - 跳动的数字
>- ECharts - 图表

通过这样拆解，将 UI 视觉稿的内容细分为这几大模块并分别管理和实现，虽然不多，但足以应对目前的需求内容了，灵活度也足够，可以随视觉稿调整随时替换。

除过 `ECharts` 的部分都非常的简单易懂，做常规 UI 组件分离即可，但是 `ECharts` 组件，到底该怎么设计呢？

用过 `ECharts` 的小伙伴肯定知道，每一个图表都需要单独实例化一个对象用来作为图表管理和绘制，而大屏项目往往会有很多个这样的图表，所以用组件的方式来自动生成和管理这样的 `echarts` 对象，我们只需要通过传入 `options` 即可完成图表的绘制。

其次，我们还可以通过组件来统一管理当屏幕变化时造成的图表 `resize` 的情况，封装了组件之后，都可以在组件内部进行统一的事件监听

乍一看，好像组件内部也没什么东西，事实上，就是这些东西就够了。

因为 `ECharts` 的核心内容，还是在于其庞大的 `Options` 对象。

**如何对 ECharts 的 Options 进行抽象？**

常见的图表有**柱状图、折线图、面积图、饼图、环形图**

我们要做的就是按**图的类型、坐标轴、颜色**这几个维度来进行考虑

我依据设计稿的风格，对 `xAxis、yAxis、color` 这三个较为通用的配置进行了统一管理，设置一套默认的配置，用于支持常规的柱状图及折线图

再根据 `Options` 的使用习惯，按照图表基本配置和数据源配置做工厂方法动态生成

大概是这个样子：

```ts
/**
 * 快捷创建柱状图配置，需自行根据需求设置 category
 * @param colors 普通颜色或渐变色
 * @param categorys 坐标轴的类别数据源 可选
 * @param direction 垂直或水平 默认 垂直
 * @returns
 */
function createBarOpts(colors: BBColors[], categorys?: string[], direction = BarDirectionEnum.Vertical): any

/**
 * 快捷创建 BarSeriesItem 对象
 * @param values 数据源 可选
 * @param direction 垂直或水平 默认 垂直
 * @returns
 */
function createBarSeriesItem(values?: any[], direction = BarDirectionEnum.Vertical): any
```

同样的，相同的思想我们可以用统一的 `Api` 风格扩展为 `createLineOpts、createLineSeriesItem、createPieOpts、createPieSeriesItem` 等等

封装好之后的实际开发场景代码就会变成这样：

```ts
const opts = coumputed(() => {
    const categorys: string[] = [];
    const values: string[] = [];
    // 处理接口数据
    props.itemList?.forEach(item => {
        categorys.push(item.dateFormat);
        values.push(item.count);
    })
    // 生成基本 bar 配置
    const barOpts = createBarOpts([createGradientColors(["#E6AE28", "#FF8A00"])], categorys);
    // 生成基本 barSeriesItem 配置
    barOpts.series = [createBarSeriesItem(values)];
    // 双柱状图可以这么写
    // barOpts.series = [createBarSeriesItem(values), createBarSeriesItem(values2)];

    return barOpts;
})
```

一下子节省了好多代码有木有，业务上逻辑就会清晰不少，当然，barOpts 实际上也是一个常规的对象，如果有定制的修改配置的情况，也是完全支持够用的

#### 4. 大屏渲染内容图表的定位问题及缩放问题如何解决？

查了很多资料，大致有这么几种解决方案：

- rem
- vw
- scale 等比缩放

相对于 `rem` 方案来说，个人更倾向于 `vw` 方案，毕竟 `rem` 横竖屏切换的时候会有问题（需要监听屏幕变化重新设置 `rootFontSize`），需要刷新过才可以，`vw` 就没有这个担忧。`transform` 的 `scale` 缩放也是很好用的，但是缩放毕竟存在字体可能模糊的情况（某些极端屏幕尺寸下才存在）

这里我就简单介绍一下 `vw` 的适配方案：

**1. 安装 postcss-px-to-viewport 插件**
```
pnpm add postcss-px-to-viewport -D
```
**2. 配置 postcss-px-to-viewport config**
```ts
import pxtovw from "postcss-px-to-viewport";
// postcss-px-to-viewport config
const pxtovw_config = pxtovw({
    unitToConvert: "px", // 要转化的单位
    viewportWidth: 1920, // UI设计稿的宽度
    unitPrecision: 6, // 转换后的精度，即小数点位数
    propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
    viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
    fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
    selectorBlackList: ["ignore-"], // 指定不转换为视窗单位的类名，
    minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
    mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
    replace: true, // 是否转换后直接更换属性值
});
```
**3. 代码中可以随意使用 px 会自动转换为 vw**

但 `vw` 也存在弊端，比如如果有一些样式是通过 ts 设置的，就需要自己实现一个 `px2vw` 的方法进行转化。
```
export function px2vw(px: number, root: number = 1920, fixed = 6) {
    const res = (px / root) * 100;
    return `${res.toFixed(fixed)}vw`;
}
```
**4、全局监听 window.resize 事件**

这里需要注意的时候，建立一个**消息中心**，通过事件发布的方式通知每个图表进行自身的 `resize`，建议 `window.resize` 做 `throttle` 处理，提高性能。

#### 5. 大屏项目开发代码结构该如何组织？

前面框架已经搭建的七七八八了，现在到了最重要的开发环节，那么项目代码如何组织会更加利于后期的阅读和维护呢？

这里我谈一下我自己的思考：

- 希望可以通过代码结构迅速了解到每个图表模块的相对位置
- 快速调整大屏图表布局结构及尺寸

由于我们是 `vw` 的响应式设计，所以在进行布局的时候就严格按照设计稿的尺寸进行每个图表块的宽高进行设置。

布局策略我用了较为简单的 `Flex` 布局，上面我们也提到了 `Card` 组件，`Card` 组件我设计了宽高属性，这样通过 `Flex + Weight、Height` 的设置就可以很清楚的表达整个大屏子模块的相对位置及尺寸

图表的绘制由单独的业务组件进行维护，这样整个 `Index` 文件就只存在 `Card` 布局结果及业务组件，没有其他多余的部分，也方便我们后续的迭代开发。

## 总结

第一次做可视化大屏项目，中间也是遇到过不少问题，把第一个项目及框架搭建的过程整理记录下来，希望对自己也对能看到这篇文章的小伙伴有一点帮助。
