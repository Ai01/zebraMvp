// moduleB.js

define('moduleB', [], () => {
    class Hello extends React.Component {
        render() {
            return React.createElement('div', null, `Hello ${this.props.toWhat}`);
        }
    }
    return React.createElement(Hello, {toWhat: 'Module B'}, null);
})

