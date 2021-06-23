// 当define执行的时候，如何处理callback的执行顺序

(function (context) {
    // 模块缓存池
    var moduleCache = {};

    function getUrlById(id) {
        return `${id}.js`;
    }

    function createModule(id, deps, value) {
        if (!moduleCache[id]) {
            moduleCache[id] = {
                id,
                deps: deps || [], // 这个模块的依赖
                parents: [], // 需要这个模块的模块
                value,
                depsLoaded: [],
            };
        } else {
            moduleCache[id].deps = deps;
            moduleCache[id].value = value;
        }
    }

    function addModuleParent(id, parent) {
        if (moduleCache[id]) {
            moduleCache[id].parents.push(parent);
        } else {
            createModule(id);
            moduleCache[id].parents.push(parent);
        }
    }

    // 判断父节点是否可以放入moduleCache。因为在父节点引入的时候已经增加了依赖关系
    function notifyParent(id, res = false) {
        let _res = res;

        const selfModule = moduleCache[id];
        const isSelfModuleLoadedDeps =
            selfModule.depsLoaded.length >= selfModule.deps.length;
        if (id === "root" && isSelfModuleLoadedDeps) {
            console.log('root', moduleCache);
            moduleCache["root"].value();
            _res = true;
        }

        const parents = selfModule?.parents;
        if (
            isSelfModuleLoadedDeps &&
            Array.isArray(parents) &&
            parents.length > 0
        ) {
            parents.forEach((p) => {
                const pModule = moduleCache[p];
                pModule.depsLoaded.push(id);
                if (pModule.depsLoaded.length >= pModule.deps.length) {
                    notifyParent(p, _res);
                }
            });
        }

        return _res;
    }

    // 加载script
    function loadScript(id, cbForS, cbForE) {
        var node = document.createElement("script");

        node.setAttribute("src", getUrlById(id));
        node.onload = cbForS;
        node.onerror = cbForE;

        document.body.appendChild(node);
    }

    var addDep = (dep) => {
        return new Promise((resolve, reject) => {
            if (moduleCache[dep] && moduleCache[dep].value) {
                resolve();
            } else {
                loadScript(
                    dep,
                    () => {
                        resolve();
                    },
                    (e) => {
                        console.error(e);
                        reject(e);
                    }
                );
            }
        });
    };

    var addDeps = (deps, cbForS, cbForE, parentId) => {
        Promise.all(deps.map((i) => addDep(i, parentId)))
            .then(() => {
                cbForS();
            })
            .catch((e) => {
                cbForE(e);
            });
    };

    function define(id, deps, cb) {
        if (deps && deps.length) {
            // 改变依赖模块的parent
            deps.forEach((dep) => {
                addModuleParent(dep, id);
            });

            addDeps(
                deps,
                () => {},
                () => {},
                id
            );
        }

        // 添加本身模块
        createModule(id, deps, function () {
            var depsArr = deps.map((i) => moduleCache[i].value);
            return cb(...depsArr);
        });

        // 通知父节点，子节点已经加载完成。返回是否全部模块加载完成
        notifyParent(id);
    }

    function require(deps, cb) {
        // 更近deps加载script，在script都加载完成的时候执行callback。
        if (deps && deps.length) {
            // 改变依赖模块的parent
            deps.forEach((dep) => {
                addModuleParent(dep, "root");
            });

            addDeps(
                deps,
                () => {},
                () => {},
                "root"
            );
        }

        // 添加本身模块
        createModule("root", deps, function () {
            var depsArr = deps.map((i) => moduleCache[i].value);
            return cb(...depsArr);
        });
    }

    context.define = define;
    context.require = require;
})(window);
