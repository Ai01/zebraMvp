// moduleB.js

console.log('moduleB load');
exports.define = {
    name: 'ModuleB',
    desc: 'this is other way to define ',
    B: function() {
        class Hello extends React.Component {
            render() {
                return React.createElement('div', null, `Hello ${this.props.toWhat}`);
            }
        }

        return React.createElement(Hello, {toWhat: 'Module B'}, null);
    }
}

