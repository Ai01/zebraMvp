// moduleA.js

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

