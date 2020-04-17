# 狂飙小助手小程序

狂飙小助手小程序提供手机游戏《狂野飙车9：竞速传奇》的活动、车辆、生涯等资料查询，以辅助玩家更好的竞速体验。

## 特性

+ 响应式布局

  小程序支持从iPhone5到iPad不同宽度的响应式布局。为支持这个功能，小程序基本使用px作为单位。

+ 云开发

  小程序使用微信小程序提供的云函数、云数据库、云存储。

## 发布到QQ小程序
1. Git切换到QQ分支
2. 关闭微信开发者工具，打开QQ小程序开发者工具，会在`project.config.json`中自动添加或更新`qqappid`等字段。
3. 如果使用云开发，在app.js中填上云环境env参数。

## 布局规范

### App

+ app.wxss不应设置任何margin和padding。页面的边距交由Page处理。

+ app.wxss可设置布局为flex，主轴方向为column。

### Page 页面
Page的样式会影响到每一个Context。

### Context 页面内容组件
Context组件负责页面内容的具体样式。负责定义自定义组件的宽度、边距。
有两种办法：
1. 定义一个wrapper，标签内包含自定义组件，Context控制wrapper的样式。
```html
<!-- context.wxml -->
<view class="my-card">
  <my-card />
</view>
```
```css
.my-card{
  /* some styles */
}
```

优点：编码方便

缺点：额外增加了一个元素

2. 组件暴露出根元素的class，交由Context处理。 
```js
/* 组件 custom-component.js */
Component({
  externalClasses: ['my-class']
})
```
```html
<!-- 组件 custom-component.wxml -->
<view class="my-class">这段文本的颜色由组件外的 class 决定</view>
```
```html
<custom-component my-class="its-class" />
```
```css
/* context.css */
.its-class{
  /* some styles */
}
```

优点：符合语义

缺点：编码较为繁琐

### Component展示组件
组件不设宽度限制。组件在页面中的宽度由页面控制。

### 列表
如果列表本身算一个block，应加上一个wrapper单独控制block样式。
```xml
  <view class="info-list">
    <view class="info-item" wx:for="{{infos}}">{{item}}</view>
  </view>
```

### 响应式
不同窗口宽度下，页面总体宽度和边距由Page负责。
如果所有的页面拥有一致的响应式宽度，可交由App负责。
在不同宽度下，Context和组件的布局、边距，由Context负责。
Component负责在不同宽度下的字体大小等样式。

## 颜色规范
### 浅色模式
参考规范：[UI中国APP提案](https://www.ui.cn/detail/452432.html)

全局背景色：#f5f5f5

属性|浅色模式|深色模式
-|-|-
主题色|#ff0054|#d92661
背景色|#f5f5f5|#121212
卡片背景色|#fff|#1e1e1e
一级信息、标题、主内容|#303030|#e0e0e0
正文|#606060|#a0a0a0
辅助文字|#9090|#707070
次要文字、提示信息|#c0c0c0|#404040
分割线|#f0f0f0|#171717


## 框架规范
### 目录结构
```
miniprogram
  --components
    --common-a
    --common-b
  --images
  --lib
    --promise-polyfill
      index.js
  --pages
    --page-a
      --components
        --conetxt-a
          --components
            --foo
              --components
                --bar
                  bar.wxml
              foo.wxml
        --context-b
    --page-b
    --page-c
  --util
    soo.js
    far.js
  app.js
  app.json
  app.wxss
```

### 请求数据状态管理

Page负责每个Context数据的请求状态管理。结合Promise的语法，对应请求状态为`pending`,`resolve`,`reject`。

pending状态下，Context负责渲染Loading。

reject状态下，使用通用组件\<request-reject>，并暴露出一个`onRetry`方法，以重试加载数据。

resolve状态下，数据交由Context展示。复杂的数据可单独编写成Component。
```xml
<!-- my-page.wxml -->
<context-foo wx:if="{{dataFooStatus==='resolve'}}" />
<request-reject wx:elif="{{dataFooStatus==='reject'}}" />
<request-pending wx:elif="{{dataFooStatus==='pending'}}" />
<view wx:else />
```

单个Context时，Loading可调用系统的wx.showLoading()来展示加载状态。
### 深色模式
若要由用户控制深色模式...
小程序的深色模式适配主要有三部分：
+ 适配页面
+ 适配Navigation
+ 适配Tabbar

