// moduleA.js
// 模块构建：
// 1. 模块的依赖需要剔除部分无法全局的依赖
// 2. 模块的libraryTarget是amd

define('moduleA', ['hello'], (hello) => {
    const Hello = hello();
    return React.createElement(Hello, {toWhat: 'Module A'}, null);
})

