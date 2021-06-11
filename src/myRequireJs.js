// 这是简易的require.js

/**
 * @descrition 实现js的加载
 * @param arr  js的路径数组
 * @param callback 当所有的js都加载完后的回调函数
 * @date 2018-09-13
 * @Author Yike
 */
// 导出方法的简陋实现
window.exports = {};

function require(arr,callback){
    if(!(arr instanceof Array)){
        console.error("arr is not a Array");
        return false;
    }

    // REQ_TOTAL  标记已加载成功个数
    // EXP_ARR    记录各个模块的顺序
    // REQLEN     定义共需要加载多少个js
    var REQ_TOTAL = 0,
        EXP_ARR = [],
        REQLEN = arr.length;

    console.log(arr);

    arr.forEach(function(req_item,index,arr){
        // 创建script的标签并放到页面中
        var $script = createScript(req_item,index);
        document.body.appendChild($script);

        (function($script){
            //检测script的onload事件
            $script.onload = function(){
                console.log('onload:', $script.src);
                REQ_TOTAL++;
                var script_index = $script.getAttribute('index');
                // 把导出对象放到数组中
                EXP_ARR[script_index] = exports;
                // 重置对象
                window.exports = {};

                //所有js加载成功后，执行callback函数。
                if (REQ_TOTAL == REQLEN) {
                    callback && callback.apply(exports, EXP_ARR);
                }
            }
        })($script);
    })
}

//创建一个script标签
function createScript(src, index){
    var $s = document.createElement('script');
    $s.setAttribute('src',src);
    $s.setAttribute('index',index);
    return $s;
}

