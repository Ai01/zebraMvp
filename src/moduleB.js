// moduleB.js

define('moduleB', ['hello'], (hello) => {
    const Hello = hello();
    return React.createElement(Hello, {toWhat: 'Module B'}, null);
})

