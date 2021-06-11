var core_render = (...modules) => {
  const e = React.createElement;

  // 投放数据的获取
  // 数据根据模块id来分发

  class App extends React.Component {
    render() {
      return e('div', null, ...modules);
    }
  }

  ReactDOM.render(e(App, null, null), document.getElementById('root'));
};

require([
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
  "moduleA.js",
  "moduleB.js",
], function (...modules) {
  const A = modules[2].define.A();
  const B = modules[3].define.B();

  core_render(A, B)
});
