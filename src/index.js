const core_render = (...modules) => {
  const e = React.createElement;

  // 投放数据的获取
  // 数据根据模块id来分发
  // TODO: 如果在A里使用了C，如何实现。本质还是都生产了统一配置，然后下载下来。需要参考cmd规范的实现。在A中的import c会变成require(c).

  class App extends React.Component {
    render() {
      const children = modules.map(i => i());
      return e('div', null, ...children);
    }
  }
  ReactDOM.render(e(App, null, null), document.getElementById('root'));
};

require([
  "moduleA",
  "moduleB",
], function (...modules) {
  core_render(...modules)
});
