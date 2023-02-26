---
lang: zh-CN
title: ECharts
description: web 09
---
## 入门篇

### 获取 [Apache ECharts](https://echarts.apache.org/handbook/zh/get-started/)

Apache ECharts 提供了多种安装方式，你可以根据项目的实际情况选择以下任意一种方式安装。

- 从 GitHub 获取
- 从 npm 获取
- 从 CDN 获取
- 在线定制

接下来我们将分别介绍这些安装方式，以及下载后的目录结构。

#### 安装方式
##### 从 npm 获取
`npm install echarts`
详见在项目中引入 Apache ECharts。

##### 从 CDN 获取
可以从以下免费 CDN 中获取和引用 ECharts。

- jsDelivr
- unpkg
- cdnjs

##### 从 GitHub 获取
apache/echarts 项目的 [release](https://github.com/apache/echarts/releases) 页面可以找到各个版本的链接。点击下载页面下方 Assets 中的 Source code，解压后 `dist` 目录下的 `echarts.js` 即为包含完整 ECharts 功能的文件。

##### 在线定制
如果只想引入部分模块以减少包体积，可以使用 ECharts 在线定制功能。

### 在项目中引入 Apache ECharts
假如你的开发环境使用了 `npm` 或者 `yarn` 等包管理工具，并且使用 `webpack` 等打包工具进行构建，本文将会介绍如何引入 Apache EChartsTM 并通过 tree-shaking 特性只打包需要的模块以减少包体积。

#### NPM 安装 ECharts
你可以使用如下命令通过 npm 安装 ECharts

`npm install echarts --save`
#### 引入 ECharts
~~~
import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});
~~~

#### 按需引入 ECharts 图表和组件
上面的代码会引入 ECharts 中所有的图表和组件，如果你不想引入所有组件，也可以使用 ECharts 提供的按需引入的接口来打包必须的组件。
~~~
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

// 接下来的使用就跟之前一样，初始化图表，设置配置项
var myChart = echarts.init(document.getElementById('main'));
myChart.setOption({
  // ...
});
~~~

>需要注意的是为了保证打包的体积是最小的，ECharts 按需引入的时候不再提供任何渲染器，所以需要选择引入 CanvasRenderer 或者 SVGRenderer 作为渲染器。这样的好处是假如你只需要使用 svg 渲染模式，打包的结果中就不会再包含无需使用的 CanvasRenderer 模块。

我们在示例编辑页的“完整代码”标签提供了非常方便的生成按需引入代码的功能。这个功能会根据当前的配置项动态生成最小的按需引入的代码。你可以直接在你的项目中使用。

#### 在 TypeScript 中按需引入
对于使用了 TypeScript 来开发 ECharts 的开发者，我们提供了类型接口来组合出最小的 EChartsOption 类型。这个更严格的类型可以有效帮助你检查出是否少加载了组件或者图表。
~~~
import * as echarts from 'echarts/core';
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts';
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

const option: ECOption = {
  // ...
};
~~~



## 概念篇
    
## 应用篇
### 1.柱状图
#### [1.1 基础柱状图](./09-11.md)
#### 1.2 堆叠柱状图
#### 1.3 动态排序柱状图
#### 1.4 动态排序柱状图
#### 1.5 阶梯瀑布图

### 2.折线图
#### [2.1 基础折线图](./09-21.md)
#### 2.2 堆叠折线图
#### 2.3 区域折线图
#### 2.4 平滑折线图
#### 2.5 阶梯线图

### 3.饼图
#### [3.1 基础饼图](./09-31.md)
#### 3.2 圆环图
#### 3.3 南丁格尔图（玫瑰图）

### 4.散点图
#### [4.1 基础散点图](./09-41.md)

### 跨平台方案
#### 1 [服务端渲染](./09-k1.md)
#### 2 [微信小程序](./09-k2.md)
#### 3 百度智能小程序