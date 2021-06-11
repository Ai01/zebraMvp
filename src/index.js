require([
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
  "moduleA.js",
  "moduleB.js",
], function (...modules) {
  const A = modules[2].define.A();
  const B = modules[3].define.B();
  const e = React.createElement;

  class App extends React.Component {
    render() {
      return e('div', null, A, B);
    }
  }

  ReactDOM.render(e(App, null, null), document.getElementById('root'));
});
