# Requxt
> WIP. still under development

Requxt means *request extends*, a front-end universal request tool that adapts to multiple request schemes,  designed to provide a consistent and universal request efficiency scheme

Requxt 意为请求扩展，一个适配多种请求方案的前端**通用**请求工具，旨在提供一致通用的请求效率方案



### 预期目标

| 特性        |  requxt   | umi-request    | fetch          | axios          |
| ---------- | ------------ |-------------- | -------------- | -------------- |
| 实现       | 使用适配器支持  | 浏览器原生支持 | 浏览器原生支持 | XMLHttpRequest |
| 大小       | -（Rollup DCE）             | 9k             | 4k (polyfill)  | 14k            |
| query 简化 | ✅ 设计内      | ✅              | ❌              | ✅              |
| post 简化  |               | ✅              | ❌              | ❌              |
| 超时       | ✅ 设计内      | ✅              | ❌              | ✅              |
| 缓存       | ✅ 外部中间件实现  | ✅              | ❌              | ❌              |
| 错误检查    | ✅ 设计内     | ✅              | ❌              | ❌              |
| 错误处理    | ✅ 设计内      | ✅              | ❌              | ✅              |
| 拦截器      | ✅ 设计内     | ✅              | ❌              | ✅              |
| 前缀        | ✅ 设计内     | ✅              | ❌              | ❌              |
| 后缀        |              | ✅              | ❌              | ❌              |
| 处理 gbk    |              | ✅              | ❌              | ❌              |
| 中间件      | ✅            | ✅              | ❌              | ❌              |
| 取消请求    | ✅ 设计内     |✅              | ❌              | ✅              |

### Todo

- [ ] 参考 umi-request 功能
    - [x] 默认创建单实例，导出默认请求方法和实例的部分方法
    - [x] `extend` 方法创建多实例，**多实例如何独立使用 `use` `adapter`**
    - [ ] *拦截器* 设计，是否需要？
    - [ ] 内置中间件设计，部分功能和适配器耦合，应在适配器中实现
        - [ ] 参数处理
        - [ ] 错误处理
        - [ ] 取消请求

- [x] 参考 koa 使用，实现洋葱圈中间件

- [ ] 结合 axios-api-module
    - [ ] 加入 `metadata` 定义，暴露 `set(name: string, mapping: object)` 方法
    - [ ] 加入命名空间支持
    - [x] 请求：可选传入定义的 `metadata` 对象，或者直接导出 mapping 之后的对象
    - [ ] 定义 `metadata` 时快捷方式，get({ url: /test })
    - [ ] 结合 `useRequest` 等 react hooks 快捷使用
    - [ ] 结合 Typescript ，请求参数提示（和 metadata 结合）

- [ ] 加入适配器 Adapter，适配 axios、fetch、Node、小程序、native 等
    - [x] 适配器中可包含（核心）中间件
    - [ ] 适配器中可包含*拦截器*
    - [ ] 适配器可用户配置行为

- [ ] 考虑**插件**生态和**适配器**的关系
    
    选择：
    - [ ] 以插件包形式发布，包内包含适配器，内部隐式调用适配器等。形如 react-router, react-router-dom 方式，需要维护主从包
    - [ ] 内置适配器，使用需显式调用，第三方功能（适配器、中间件）同样显式调用，直接抛弃插件机制。形如 redux, redux-thunk