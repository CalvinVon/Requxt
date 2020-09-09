# Requxt
> WIP. still under development

Requxt means *request extends*, a front-end universal request tool that adapts to multiple request schemes,  designed to provide a consistent and universal request efficiency scheme

Requxt 意为请求扩展，一个适配多种请求方案的前端**通用**请求工具，旨在提供一致通用的请求效率方案



### 预期目标

| 特性        |  requxt   | umi-request    | fetch          | axios          |
| ---------- | ------------ |-------------- | -------------- | -------------- |
| 实现       | 使用适配器支持  | 浏览器原生支持 | 浏览器原生支持 | XMLHttpRequest |
| 大小       | -             | 9k             | 4k (polyfill)  | 14k            |
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
