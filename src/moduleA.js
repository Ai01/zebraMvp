// moduleA.js
// 模块构建：
// 1. 模块的依赖需要剔除部分无法全局的依赖
// 2. 模块的libraryTarget是amd

console.log('moduleA load');
exports.define = {
    name: 'ModuleA',
    desc: 'this is other way to define ',
    A: function() {
        class Hello extends React.Component {
            render() {
                return React.createElement('div', null, `Hello ${this.props.toWhat}`);
            }
        }

        return React.createElement(Hello, {toWhat: 'Module A'}, null);
    }
}

