# Requxt
> WIP. still under development

Requxt means *request extends*, a front-end universal request tool that adapts to multiple request schemes,  designed to provide a consistent and universal request efficiency scheme

Requxt 意为请求扩展，一个适配多种请求方案的前端通用请求工具，旨在提供一致通用的请求效率方案。

> 统一且灵活，切换项目请求 API 无感知



### 预期目标

| 特性        |  requxt   | umi-request    | fetch          | axios          |
| ---------- | ------------ |-------------- | -------------- | -------------- |
| 实现       | 使用适配器支持  | 浏览器原生支持 | 浏览器原生支持 | XMLHttpRequest |
| 大小       | 视适配器支持，核心小于 9k    | 9k             | 4k (polyfill)  | 14k            |
| **统一API***          | ✅      | ❌             | ❌              | ❌             |
| **多种灵活请求方式***   | ✅      | ❌             | ❌              | ❌             |
| **适配多种请求方案***   | ✅      | ❌             | ❌              | ❌             |
| **批量请求处理***       | ✅      | ❌             | ❌              | ❌             |
| query 简化 |              | ✅              | ❌              | ✅              |
| post 简化  |               | ✅              | ❌              | ❌              |
| 超时       | ✅             | ✅              | ❌              | ✅              |
| 缓存       |               | ✅              | ❌              | ❌              |
| 错误检查    |               | ✅              | ❌              | ❌              |
| 错误处理    |               | ✅              | ❌              | ✅              |
| 拦截器      | ✅            | ✅              | ❌              | ✅              |
| 前缀        |              | ✅              | ❌              | ❌              |
| 后缀        |              | ✅              | ❌              | ❌              |
| 处理 gbk    |              | ✅              | ❌              | ❌              |
| 中间件      | ✅            | ✅              | ❌              | ❌              |
| 取消请求    | ✅            |✅              | ❌              | ✅              |
